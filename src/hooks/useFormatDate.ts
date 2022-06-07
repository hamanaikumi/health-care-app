import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { useCallback } from "react";

export const useFormatDate = () => {
  /**
   * 今日の年月をパースして返す.
   */
  const topYear = useCallback((date: Date) => {
    return format(date, "yyyy年M月");
  }, []);

  /**
   * 今日の日付をパースして返す.
   */
  const topDate = useCallback((date: Date) => {
    return format(date, "d");
  }, []);

  /**
   * 今日の曜日をパースして返す.
   */
  const topDay = useCallback((date: Date) => {
    return format(date, "E曜日", { locale: ja });
  }, []);

  /**
   * 記録する日付の時分秒を切り捨てて返す.
   */
  const sendDate = useCallback((date: Date) => {
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return newDate;
  }, []);

  return { topYear, topDate, topDay, sendDate };
};
