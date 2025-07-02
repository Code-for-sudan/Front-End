import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ChatHistory } from "../../../data/ChatHistory.js"; // will deleted when connected to the endpoint
const ChatArea = () => {
    const owner = ChatHistory.chat_between.owner;
    const user = ChatHistory.chat_between.customer;
    const messages = ChatHistory.messages;

    const navigate = useNavigate();

    return (
        <div>
            {/* Head of the chat area */}
            <div className='flex items-center gap-4 px-6 py-4 border-b border-gray-300'>
                <MdOutlineArrowCircleRight
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 cursor-pointer"
                />
                <div className='flex items-center gap-2'>
                    <img src={user.image_url} alt="profile_pic" className='size-10 rounded-full' />
                    <h4 className='text-base font-semibold'>{user.name}</h4>
                </div>
            </div>

        {/* messages area */}
            <div className='w-full flex flex-col gap-4 p-6'>
                { messages.map((msg, i) => 
                    msg.sender_id === owner.id ? 
                        <div key={i} className='flex flex-row-reverse gap-1'>
                            <img src={owner.image_url} alt="profile-pic" className='size-6 rounded-full' />
                            <div className='p-2 text-xs bg-light-gold rounded-xl max-w-[220px]'>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    :
                        <div key={i} className='flex gap-1'>
                            <img src={user.image_url} alt="profile-pic" className='size-6 rounded-full' />
                            <div className='p-2 text-xs bg-light-gray rounded-xl max-w-[220px]'>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    
                    )}
            </div>
        </div>
    )
}

export default ChatArea;