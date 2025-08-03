import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowCircleRightR from "../../../../src/assets/icons/ArrowCircleRightR.svg";
import {
  User,
  Calendar,
  MapPin,
  CreditCard,
  Phone,
  VectorSend,
} from "../../../../src/assets/icons/index.js";
import { accsoar, TelImage } from "../../../assets/demo_data/index.js";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  return (
    <div className="bg-white min-h-screen text-xs text-right p-3">
      {/* Header */}
      <div className="relative p-4 text-base  flex items-center">
        <Link
          to={`/store-owner/${userId}/orders`}
          className="top-10 left-6 text-white hover:text-gray-200"
        >
          <img src={ArrowCircleRightR} alt="رجوع" className="h-6 w-6" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2">
          تفاصيل الطلب # {id}
        </span>
      </div>

      {/* Customer Info */}
      <div className="border border-gray-300  rounded-xl p-3 mb-3 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <img src={User} alt="ايقونة الشخص" className="h-5 w-5" />
          <span>أحمد علي</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={Calendar} alt="ايقونة التاريخ" className="h-5 w-5" />
          <span>٢٥/٠٧/٢٠٢٥</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={MapPin} alt="ايقونة المكان" className="h-5 w-5" />
          <span>الخرطوم، شارع الحرية</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={Phone} alt="ايقونة الهاتف" className="h-5 w-5" />
          <span>0994000576</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={CreditCard} alt="ايقونة طريقة الدفع" className="h-5 w-5" />
          <span>طريقة الدفع: أوكاش</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-separate border-spacing-y-2 ">
          <thead
            className="bg-[#F6DBAF]"
            style={{ backgroundColor: "var(--light-gold)" }}
          >
            <tr className=" text-center ">
              <th className="p-2 pt-6 pb-6">المنتج</th>
              <th className="p-2 whitespace-nowrap">اسم المنتج</th>
              <th className="p-2">الكمية</th>
              <th className="p-2">السعر</th>
              <th className="p-2">الخصم</th>
              <th className="p-2">الضريبة</th>
              <th className="p-2 ">الاجمالي</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-center shadow rounded">
              <td className="p-2">
                <img
                  src={TelImage}
                  alt="Headphones"
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="p-2">آيفون 11</td>
              <td className="p-2">1</td>
              <td className="p-2">650 ج</td>
              <td className="p-2">--</td>
              <td className="p-2">50 ج</td>
              <td className="p-2">10 ج</td>
            </tr>
            <tr className="bg-white text-center shadow rounded">
              <td className="p-2">
                <img src={accsoar} alt="iPhone" className="w-10 h-10 mx-auto" />
              </td>
              <td className="p-2">سماعة بلوتوث</td>
              <td className="p-2">3</td>
              <td className="p-2">50 ج</td>
              <td className="p-2">10 ج</td>
              <td className="p-2">50 ج</td>
              <td className="p-2">10 ج</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-center border border-gray-300 rounded-xl items-center mb-4 w-70 h-12 mx-auto">
        <div className=" px-4 py-2 ">
          <span style={{ color: "var(--primary)" }}> الإجمالي: </span>
          <span className="mr-1.5"> 810 ج</span>
        </div>
      </div>

      {/* Customer Note */}
      <div className="mb-4 ">
        <h2 className=" mr-5 mb-2">ملاحظة من العميل</h2>
        <div className="bg-[#FFF9EF] text-center p-3 rounded border border-[#F6DBAF] w-70 h-12 mx-auto text-gray-800">
          "الرجاء التأكد من لون السماعة"
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4 w-full">
        <button
          className="border hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl"
          style={{ borderColor: "var(--primary)" }}
        >
          إرسال إشعار للعميل
        </button>
        <button
          className=" hover:bg-orange-600 text-white px-8 py-2 rounded-xl"
          style={{ backgroundColor: "var(--primary)" }}
        >
          إلغاء الطلب
        </button>
      </div>

      {/* Admin Note */}
      <h2 className="font-bold text-sm mb-2">ملاحظات إدارية</h2>

      <div className="relative border rounded-xl border-orange-200 px-4 py-3 mb-12">
        {/* Textarea instead of input */}
        <textarea
          rows={3}
          placeholder="هذه الملاحظة تظهر للمشرفين فقط"
          className="w-full pr-10 text-sm text-gray-400 bg-transparent outline-none resize-none placeholder:text-gray-400"
        />

        {/* Send Button (Arrow) */}
        <button className="absolute bottom-3 right-3">
          <img src={VectorSend} alt="ايقونة ارسال" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
export default OrderDetailsPage;
