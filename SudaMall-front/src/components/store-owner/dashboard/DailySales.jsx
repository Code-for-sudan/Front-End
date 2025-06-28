import DailyChart from './DailyChart';

const DailySales = ({ DailySalesData }) => {
      const Stats = DailySalesData.over_all_changes;

  return (
    <div className='flex flex-col gap-8'>
      <DailyChart DailySalesData={DailySalesData} />

    {/* analysis */}
      <div className='flex items-center justify-center gap-2 font-semibold'>
        <p className='text-gray-600'>نسبة التغيير عن امس </p>
        <span className={`${Stats.change_ratio.status === 'increased'? 'text-dark-green': 'text-red-500'}`}>
            {Stats.change_ratio.value}{Stats.change_ratio.status === 'increased' ? '+' : '-'}
        </span>
      </div>
      <div className='flex items-center gap-8'>
        <div className='flex flex-col gap-3 font-semibold'>
            <p>إجمالي المبيعات</p>
            <p>عدد الطلبات</p>
            <p>متوسط قيمة الطلب</p>
        </div>
        <div className='flex flex-col gap-3 text-gray-400'>
            <p>{Stats.total_sales}</p>
            <p>{Stats.total_orders}</p>
            <p>{Stats.avg_orders_cost}</p>
        </div>
      </div>
    </div>
  )
}

export default DailySales;
