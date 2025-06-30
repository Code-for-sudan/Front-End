import { NewOrderCard, SingleDailyChart } from "../../../../components/reusable";

const TodayOrders = ({ TodayOrdersData, srcImg }) => {
  return (
    <div>
      {/* Chart */}
      <div>
        <SingleDailyChart
            title="الطلبات الجديدة"
            data={TodayOrdersData.data}
            unit="طلب"
        />

        {/* Label below chart */}
        <p className="text-center text-base font-semibold text-gray-700">
            الطلبات الجديدة
        </p>
      </div>   
      <div className="flex flex-col gap-3 my-10">
        {TodayOrdersData.orders.map((order, i) => 
        <NewOrderCard 
            key={i}
            order={order}
            srcImg={srcImg}
            />
        )}
      </div>
    </div>
  );
};


export default TodayOrders
