import { ChatContact } from '../../../components/chats';
import ChatContactSKL from '../../../components/loadings/ChatContactSKL';
import { useGetContacts } from '../../../hooks/chats/useGetContacts';

const Chats = () => {
  const { data: contacts, isLoading, isError } = useGetContacts();
  console.log(contacts)

  return (
    <>
      <h1 className='container text-2xl text-center font-bold my-8'>
        المحادثات
      </h1>
      <div className='mb-32'>
        { isLoading ?
         <ChatContactSKL />
        :
        contacts?.chats.length === 0 ?
        <p className='text-center text-gray-600 mt-20'>لا توجد محادثات حتى الان</p>
        : contacts?.chats.map((contact, i) => 
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
