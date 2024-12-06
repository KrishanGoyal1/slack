import { useParentMessageId } from "@/features/messages/store/use-parent-message-id"

export const usePanel = () => {
    const [parentMessageId, setParentMessageid] = useParentMessageId();

    const onOpenMessage = (messageid : string) => {
        setParentMessageid(messageid);
    }

    const onClose = () => {
        setParentMessageid(null);
    }

    return {
        parentMessageId,
        onOpenMessage,
        onClose
    }
}