import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChannelId } from "@/hooks/use-channel-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

interface HeaderProps {
    memberName?: string;
    memberImage?: string;
    onClick?: () => void;
}

export const Header = ({
    memberImage="Member",
    memberName,
    onClick
}:HeaderProps) => {
    const router = useRouter();
    const channelId = useChannelId();
    const workspaceId = useWorkspaceId();
    const [ ConfirmDialog, confirm ] = useConfirm(
        "Delete this channel",
        "You are about to delete this channel. This action is irreversible."
    )

    const avatarFallback = memberName?.charAt(0).toUpperCase();

    return (
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
            <Button
                variant="ghost"
                className="text-lg font-semibold px-2 overflow-hidden w-auto"
                size="sm"
                onClick={onClick}
            >
                <Avatar className="size-6 mr-2">
                    <AvatarImage src={memberImage} />
                    <AvatarFallback>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <span className="truncate">{memberName}</span>
                <FaChevronDown className="size-2.5 ml-2" />
            </Button>
        </div>
    )
}