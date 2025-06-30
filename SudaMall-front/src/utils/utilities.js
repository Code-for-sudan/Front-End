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
