import { AnalyticsData } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-2 items-center justify-center gap-4 mt-8'>
     {AnalyticsData.map((item, index) => (
        <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`${item.bgClass} relative text-white flex flex-col gap-2 items-start p-4 rounded-xl cursor-pointer active:scale-95`}
        >
            <p className="text-xs font-semibold">{item.label}</p>
            <p className="text-2xl font-semibold z-50">{item.value >= 1000 ? `${item.value / 1000}k`: item.value}</p>
            <img
            src={item.icon}
            alt="icon"
            className="absolute bottom-2 left-2 w-10 h-10"
            />
        </button>
        ))}
    </div>
  )
}

export default Analytics;
