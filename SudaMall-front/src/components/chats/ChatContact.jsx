import { useNavigate } from "react-router-dom";
import { formatChatTimestamp } from "../../utils/utilities.js";
import { profile_pic } from "../../assets";

const ChatContact = ({ contact }) => {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  return (
    <div 
      onClick={() => navigate(`/store-owner/${userId}/chats/${contact.contact_id}`)}
      className='flex justify-between border-b border-gray-300 px-4 py-2 cursor-pointer'>
      <div className='flex items-center gap-3'>
        <div className="relative w-16">
          <img src={contact.contact_img || profile_pic} alt="profile_pic" className='size-16 rounded-full object-cover' />
          {contact.online && <div className='absolute bottom-0 left-2 size-3 bg-dark-green rounded-full border-2 border-white' />}
        </div>
        <div className='flex flex-col gap-2'>
            <h4 className='text-base font-semibold'>{contact.contact_name}</h4>
            <p className="text-xs text-gray-500 truncate max-w-[150px]">{contact.last_message}</p>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between py-1 text-xs'>
        <p className='text-primary'>{formatChatTimestamp(contact.timestamp)}</p>
        {contact.unread_count !== 0 && <p className='px-2 py-1 bg-dark-green rounded-full'>{contact.unread_count}</p>}
      </div>
    </div>
  )
}

export default ChatContact;
