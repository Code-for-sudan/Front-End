import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../../api/chats/getChatHistory";

export const useGetChatHistory = ({ contactId }) => {
  return useQuery({
    queryKey: ["history", contactId],
    queryFn: () => getChatHistory({ contactId }),
    enabled: !!contactId, // prevents running when contactId is null/undefined
  });
};
