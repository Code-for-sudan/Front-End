import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../../api/chats/getChatHistory";

export const useGetChatHistory = ({ receiverId  }) => {
  return useQuery({
    queryKey: ["history", receiverId ],
    queryFn: () => getChatHistory({ receiverId  }),
    enabled: !!receiverId , // prevents running when receiverId  is null/undefined
  });
};
