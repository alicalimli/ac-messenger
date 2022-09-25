import { useEffect, useState } from "react";
import { isSameDay, isSameWeek, isSameYear, format, addDays } from "date-fns";

const useFormatDate = (date: Date) => {
  const [formattedDate, setFormattedDate] = useState<string>();

  useEffect(() => {
    if (!date) return;

    if (isSameDay(date, new Date())) {
      setFormattedDate(format(date, "h:mmbbb"));
    } else if (isSameWeek(date, new Date())) {
      setFormattedDate(format(date, "iii h:mmbbb"));
    } else if (isSameYear(date, new Date())) {
      setFormattedDate(format(date, "LLL dd"));
    } else {
      setFormattedDate(format(date, "LLL dd yyy"));
    }
  }, []);

  return formattedDate;
};

export default useFormatDate;
