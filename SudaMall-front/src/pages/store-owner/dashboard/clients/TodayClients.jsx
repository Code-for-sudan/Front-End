import { SingleDailyChart } from "../../../../components/reusable";

const TodayClients = ({ TodayClientsData }) => {
  return (
    <div className="space-y-10">
      {/* Chart */}
      <div>
        <SingleDailyChart
            title="العملاء الجدد"
            data={TodayClientsData.data}
            unit=" عميل"
        />

        {/* Label below chart */}
        <p className="text-center text-base font-semibold text-gray-700">
         العملاء الجدد
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-primary rounded-lg overflow-hidden text-[0.6rem] mb-10">
          <thead>
            <tr className="bg-light-gold text-black text-right border border-primary rounded-t-lg">
              <th className="p-3">الاسم</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">البريد الإلكتروني</th>
            </tr>
          </thead>
          <tbody>
            {TodayClientsData.clients.map((client, index) => (
              <tr
                key={index}
                className="text-right border-l border-b border-gray-400 hover:bg-gray-50 transition"
              >
                <td className="p-3">{client.client_name}</td>
                <td className="p-3">
                    {new Date(client.created_at).toLocaleDateString( {
                        dateStyle: "short"
                    })}
                </td>
                <td className="p-3">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayClients;
