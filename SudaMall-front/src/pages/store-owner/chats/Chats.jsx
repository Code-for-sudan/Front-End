import { ChatContact } from '../../../components/chats';
import { ChatContactsData } from '../../../data/ChatContacts' // will be deleted after connecting the endpoint

const Chats = () => {
  const contacts = ChatContactsData.chats;  // will be replaced by data comes from the endpoint

  return (
    <>
      <h1 className='container text-2xl text-center font-bold my-8'>
        المحادثات
      </h1>
      <div className='mb-32'>
        {contacts.map((contact, i) => 
          <ChatContact 
            key={i}
            contact={contact}
          />
        )}
      </div>
    </>
  )
}

export default Chats
