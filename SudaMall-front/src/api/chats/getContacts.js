import api from "../Api";

// get contacts from all chats
export const getContacts = async () => {
  const response = await api.get(`/chats/contacts`);
  return response.data;
};