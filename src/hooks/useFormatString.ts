export const useFormatString = () => {
  /**
   * 健康記録のタイトルを英語から日本語にパースして返す.
   * @param text タイトル
   * @returns 日本語のタイトル
   */
  const toJaTitleString = (text: string) => {
    switch (text) {
      case "weight":
        return "体重";
      case "temperature":
        return "体温";
      case "steps":
        return "歩数";
    }
  };
  /**
   * 健康記録の単位を英語から日本語にパースして返す.
   * @param text 単位
   * @returns 日本語の単位
   */
  const toJaUnitString = (text: string) => {
    switch (text) {
      case "weight":
        return "kg";
      case "temperature":
        return "度";
      case "steps":
        return "歩";
    }
  };
  return { toJaTitleString, toJaUnitString };
};
