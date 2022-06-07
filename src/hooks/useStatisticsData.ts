import { useCallback, useState } from "react";
import { PrintData } from "../types/printData";

export const useStatisticsData = () => {
  const [dataCount, setDataCount] = useState(0);
  const [dataAverage, setDataAverage] = useState(0);
  const [dataMax, setDataMax] = useState(0);
  const [dataMin, setDataMin] = useState(0);

  /**
   * データの統計をフォーマットして返す.
   */
  const statisticsTemperature = useCallback(
    (data: PrintData[], category: string) => {
      let array: Array<number> = [];
      if (category === "temperature") {
        array = data.map((dataObj) => dataObj.temperature);
      } else if (category === "weight") {
        array = data.map((dataObj) => dataObj.weight);
      } else if (category === "steps") {
        array = data.map((dataObj) => dataObj.steps);
      }

      // 配列から空文字を削除する
      const filterArray = array.filter(
        (dataNum) =>
          dataNum !== undefined && dataNum !== null && dataNum === dataNum
      );

      // 配列の合計を算出
      let sum = 0;
      if (filterArray.length > 0) {
        sum = filterArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      }
      // データ件数
      setDataCount(filterArray.length);
      // データ平均
      setDataAverage(
        category === "steps"
          ? Math.floor(sum / filterArray.length)
          : Math.round((sum / filterArray.length) * 10) / 10
      );
      // データ最大値
      setDataMax(Math.max(...filterArray));
      // データ最小値
      setDataMin(Math.min(...filterArray));
    },
    [dataCount, dataAverage, dataMin, dataMax]
  );
  return { statisticsTemperature, dataCount, dataAverage, dataMax, dataMin };
};
