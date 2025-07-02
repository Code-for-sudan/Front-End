import { useNavigate } from "react-router-dom";
import { formatChatTimestamp } from "../../utils/utilities.js";

const ChatContact = ({ contact }) => {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(`/store-owner/:userId/chats/${contact.contact_id}`)}
      className='flex justify-between border-b border-gray-300 px-6 py-4 cursor-pointer'>
      <div className='flex items-center gap-3'>
        <img src={contact.contact_img} alt="profile_pic" className='size-16 rounded-full' />
        <div className='flex flex-col gap-2'>
            <h4 className='text-base font-semibold'>{contact.contact_name}</h4>
            <p className="text-xs text-gray-500 truncate max-w-[180px]">{contact.last_message}</p>
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
