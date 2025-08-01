import { Link } from 'react-router-dom'
import { formatTime } from '../../../utils/utilities';

const NewOrderCard = ({srcImg, order}) => {
  return (
    <div className='flex items-start gap-2 bg-slate-100 p-4 rounded-xl'>
        <img src={srcImg} alt="icon-success" className='mt-0.9'/>
        <div className='w-full space-y-3'>
            <div className="flex items-center justify-between text-sm">
                <p className='text-base font-semibold'>طلب جديد</p>
                <div className="flex items-center gap-3">
                    <p className='text-primary text-xs'>{formatTime(order.created_at)}</p><div className='w-3 h-3 bg-dark-green rounded-full'></div>
                </div>
            </div>
            <p className='text-xs'>تم استلام طلب جديد من العميل {order.client_name}، رقم الطلب #{order.order_number}.</p>
            <Link
                to={''}
                className='text-primary text-xs underline'
            >
                عرض تفاصيل الطلب
            </Link>
        </div>
    </div>
  )
}

export default NewOrderCard;
