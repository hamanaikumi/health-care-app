import { format } from "date-fns";
import { Data } from "../types/api/data";
import { PrintData } from "../types/printData";

export const useFormatPrint = () => {
  /**
   * 健康記録をcsv出力ようのデータにパースして返す.
   * @param data 健康記録
   * @returns  csv出力用データ
   */
  const formatPrintData = (data: Array<Data>) => {
    let printData: Array<PrintData> = [];
    for (let dataObj of data) {
      printData.push({
        updatedAt: format(dataObj.timeStampDate * 1000, "yyyy-MM-dd"),
        temperature: dataObj.temperature,
        weight: dataObj.weight,
        steps: dataObj.steps,
      });
    }
    return printData;
  };
  return { formatPrintData };
};
