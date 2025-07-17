import React from 'react'
import { SingleWeeklyChart } from '../../../../components/store-owner/reusable';

const WeeklyClients = ({ WeeklyClientsData }) => {
  return (
   <div className="space-y-10">
      {/* Chart */}
    <SingleWeeklyChart
        title="العملاء الجدد"
        data={WeeklyClientsData.data}
        unit=" عميل"
    />

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-400 overflow-hidden text-[0.6rem] mb-10">
          <thead>
            <tr className="bg-light-gold text-black text-right border border-primary">
              <th className="p-3">الاسم</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">البريد الإلكتروني</th>
            </tr>
          </thead>
          <tbody>
            {WeeklyClientsData.clients.map((client, index) => (
              <tr
                key={index}
                className="text-right hover:bg-gray-50 transition"
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
  )
}

export default WeeklyClients;
