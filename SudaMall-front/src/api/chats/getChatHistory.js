import api from "../Api";

// get chat history for specific user
export const getChatHistory = async ({ contactId }) => {
  const response = await api.get(`/chat/history/?customer_id=${contactId}`);
  console.log("history", response)
  return response.data;
};