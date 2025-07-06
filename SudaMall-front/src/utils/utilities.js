import moment from "moment";

// formate the given time to near arabic text
export const formatTime = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);

  const diffInSeconds = now.diff(created, "seconds");
  const diffInMinutes = now.diff(created, "minutes");
  const diffInHours = now.diff(created, "hours");
  const diffInDays = now.diff(created, "days");
  const diffInWeeks = now.diff(created, "weeks");

  if (diffInSeconds < 60) {
    return "الآن";
  } else if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes === 1 ? " دقيقة" : diffInMinutes === 2 ? "دقيقتان" : diffInMinutes + " دقائق"} `;
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours === 1 ? "ساعة" : diffInHours === 2 ? "ساعتان" : diffInHours + " ساعات"}`;
  } else if (diffInDays < 7) {
    return `منذ ${diffInDays === 1 ? "يوم" : diffInDays === 2 ? "يومان" : diffInDays + " أيام"}`;
  } else if (diffInWeeks < 4) {
    return `منذ ${diffInWeeks === 1 ? "إسبوع" : diffInWeeks === 2 ? "إسبوعين" : diffInWeeks + " أسابيع"}`;
  }

  return created.format("DD/MM/YYYY");
};

// *************************** format timestamp **************************//
export const formatChatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const msInDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.floor((now - date) / msInDay);

  const weekdaysArabic = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  ];

  if (isToday) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    const suffix = isPM ? "م" : "ص";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${suffix}`;
  }

  if (isYesterday) {
    return "أمس";
  }

  if (daysDiff < 7) {
    return weekdaysArabic[date.getDay()];
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// format message time
export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const isAm = hours < 12;
  const suffix = isAm ? "ص" : "م";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${suffix}`;
};
