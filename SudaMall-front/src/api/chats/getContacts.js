import api from "../Api";

// get contacts from all chats
export const getContacts = async () => {
  const response = await api.get(`/chat/contacts`);
  return response.data;
};