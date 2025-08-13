// hooks/useGetContacts.js
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../api/chats/getContacts";

export const useGetContacts = () => {
  return useQuery({
    queryKey: ["contacts"],      // unique key for caching
    queryFn: getContacts,        // function to fetch data
    staleTime: 5 * 60 * 1000,    // cache for 5 minutes
  });
};
