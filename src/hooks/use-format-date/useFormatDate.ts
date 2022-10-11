import { isSameDay, isSameWeek, isSameYear, format } from "date-fns";

const useFormatDate = () => {
  const formatDate = (date: Date) => {
    if (!date) return;

    if (isSameDay(date, new Date())) {
      return format(date, "h:mmbbb");
    } else if (isSameWeek(date, new Date())) {
      return format(date, "iii h:mmbbb");
    } else if (isSameYear(date, new Date())) {
      return format(date, "LLL dd");
    } else {
      return format(date, "LLL dd yyy");
    }
  };

  return formatDate;
};

export default useFormatDate;
