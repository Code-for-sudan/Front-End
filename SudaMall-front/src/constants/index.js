import welcome1 from "../assets/welcome1.png"
import welcome2 from "../assets/welcome2.png"
import welcome3 from "../assets/welcome3.png"

import { Adds, Admin, Agents, CurrencyCircleDollar, Files, Gear, ShoppingBag, ShoppingCart, Store } from "../assets/icons";

// welcome screen data
export const welcomeScreens = [
    {
      id: 1,
      image: welcome1,
      text: "مرحباً بك في سودا مول, حيث التسوق السهل والمُمتع",
    },
    {
      id: 2,
      image: welcome2,
      text: "حبابك عشرة ! خليك جاهز لعروض وسلع ما بتتفوت!",
    },
    {
      id: 3,
      image: welcome3,
      text: "سودا مول معك في كل خطوة - تسوق وإنت  مُطمّن!",
    },
  ];

  // store owner side bar data

  export const Store_Owner_Sidebar = [
    { lable: "إدارة الطلبات", icon: ShoppingCart},
    { lable: "المنتجات", icon: ShoppingBag},
    { lable: "العملاء", icon: Agents},
    { lable: "الفواتير", icon: Files},
    { lable: "الدفع الإلكتروني", icon: CurrencyCircleDollar},
    { lable: "إدارة المخزن", icon: Store},
    { lable: "الإعلانات", icon: Adds},
    { lable: "الإعدادات", icon: Gear},
    { lable: "المشرف", icon: Admin},
  ]