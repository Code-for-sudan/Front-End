import { NewOrderCard, SingleWeeklyChart } from '../../../../components/reusable'

const WeeklyOrders = ({WeeklyOrdersData, srcImg}) => {
  return (
    <div>
    {/* Chart */}
        <SingleWeeklyChart
            title="الطلبات الجديدة"
            data={WeeklyOrdersData.data}
            unit=" طلب"
        />
        <div className="flex flex-col gap-3 my-10">
            {WeeklyOrdersData.orders.map((order, i) => 
            <NewOrderCard 
                key={i}
                order={order}
                srcImg={srcImg}
                />
        )}
        </div>
    </div>
  )
}

export default WeeklyOrders
