import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { auth } from "./auth";

export const createOrGet = mutation({
    args: {
        memberId: v.id("members"),
        workspaceId: v.id("workspaces"),
    },
    handler: async(ctx, args) => {
        const userid = await auth.getUserId(ctx);

        if(!userid){
            throw new Error("Unauthorized");
        }

        const curretMember = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q)=> 
                q.eq("workspaceId",args.workspaceId).eq("userId", userid)
            )
            .unique();

        const otherMember = await ctx.db.get(args.memberId);

        if(!curretMember || !otherMember){
            throw new Error("Member not found")
        }

        const existingConversation = await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
            .filter((q) => 
                q.or(
                    q.and(
                        q.eq(q.field("memberOneId"), curretMember._id),
                        q.eq(q.field("memberTwoId"), otherMember._id),
                    ),
                    q.and(
                        q.eq(q.field("memberOneId"), otherMember._id),
                        q.eq(q.field("memberTwoId"), curretMember._id),
                    ),
                )
            )
            .unique();

        if(existingConversation){
            return existingConversation._id;
        }

        const conversationId = await ctx.db.insert("conversations",{
            workspaceId: args.workspaceId,
            memberOneId: curretMember._id,
            memberTwoId: otherMember._id
        })

        return conversationId;
    }
})