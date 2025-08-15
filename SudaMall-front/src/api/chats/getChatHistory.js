import api from "../Api";

// get chat history for specific user
export const getChatHistory = async ({ receiverId  }) => {
  const response = await api.get(`/chat/history?customer_id=${receiverId }`);
  // console.log("history", response)
  return response.data;
};