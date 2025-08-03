import welcome1 from "../assets/welcome1.png"
import welcome2 from "../assets/welcome2.png"
import welcome3 from "../assets/welcome3.png"

import { Adds, Admin, Agents, Cart, CurrencyCircleDollar, CurrencyDollar, Files, Gear, ShoppingBag, ShoppingCart, Store, UserCirclePlus } from "../assets/icons";

const user = JSON.parse(localStorage.getItem("user"));

// welcome screen data
export const welcomeScreens = [
    {
      id: 1,
      image: welcome1,
      text: "مرحباً بك في سودامول, حيث التسوق السهل والمُمتع",
    },
    {
      id: 2,
      image: welcome2,
      text: "حبابك عشرة ! خليك جاهز لعروض وسلع ما بتتفوت!",
    },
    {
      id: 3,
      image: welcome3,
      text: "سودامول معك في كل خطوة - تسوق وإنت  مُطمّن!",
    },
  ];

  // store owner side bar data

  export const Store_Owner_Sidebar = [
    { label: "إدارة الطلبات", icon: ShoppingCart, path: `/store-owner/${user.id}/orders` },
    { label: "المنتجات", icon: ShoppingBag, path: `/store-owner/${user.id}/products`},
    { label: "العملاء", icon: Agents, path: `/store-owner/${user.id}/dashboard` },
    { label: "الفواتير", icon: Files, path: `/store-owner/${user.id}/dashboard` },
    { label: "الدفع الإلكتروني", icon: CurrencyCircleDollar, path: `/store-owner/${user.id}/dashboard` },
    { label: "إدارة المخزن", icon: Store, path: `/store-owner/${user.id}/dashboard` },
    { label: "الإعلانات", icon: Adds, path: `/store-owner/${user.id}/dashboard` },
    { label: "الإعدادات", icon: Gear, path: `/store-owner/${user.id}/dashboard` },
    { label: "المشرف", icon: Admin, path: `/store-owner/${user.id}/dashboard` },
  ]

  // analytics data
  export const AnalyticsData = [
  {
    label: 'العملاء الجدد',
    value: 45,
    icon: UserCirclePlus,
    bgClass: 'gold-gradient',
    path: `/store-owner/${user.id}/dashboard/new-clients`
  },
  {
    label: 'الطلبات الجديدة',
    value: 30,
    icon: Cart,
    bgClass: 'violet-gradient',
    path: `/store-owner/${user.id}/dashboard/new-orders`
  },
  {
    label: 'المبيعات اليوم',
    value: 10000,
    icon: CurrencyDollar,
    bgClass: 'dark-green-gradient',
    path: `/store-owner/${user.id}/dashboard/total-sales`
  },
  {
    label: 'الطلبات المعلقة',
    value: 30,
    icon: Cart,
    bgClass: 'sky-blue-gradient',
    path: `/store-owner/${user.id}/dashboard/paused-orders`
  }
];
