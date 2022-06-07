import { recoilPersist } from "recoil-persist";
import { atom, selector } from "recoil";
import { Data } from "../types/api/data";

// persist設定
const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

// 1年分のデータ
export const yearDataState = atom<Array<Data>>({
  key: "yearDataState",
  // 初期値
  default: [
    {
      id: "",
      temperature: 0,
      weight: 0,
      steps: 0,
      timeStampDate: 0,
    },
  ],
  // persist設定
  effects_UNSTABLE: [persistAtom],
});

export const filterDataState = atom<Array<Data>>({
  key: "filterDataState",
  default: [
    {
      id: "",
      temperature: 0,
      weight: 0,
      steps: 0,
      timeStampDate: 1654067784,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

// 今日の記録データ
export const todayDataState = atom<Data>({
  key: "todayDataState",
  default: {
    id: "",
    temperature: 0,
    weight: 0,
    steps: 0,
    timeStampDate: new Date().getTime() * 1000,
  },
  effects_UNSTABLE: [persistAtom],
});

// データ一覧に表示する期間
export const searchValueState = atom<number>({
  key: "searchValueState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// データ一覧に表示するデータ
export const filterDataSelector = selector<Data[]>({
  key: "filterDataSelector",
  // getは{ get }を引数に取る関数
  get: ({ get }) => {
    // 引数のgetを使ってAtomから最新の値を取得
    const allDataState: Data[] = get(yearDataState);
    // 同様に検索フィールドの値を取得
    const searchValue: number = get(searchValueState);
    // 記録がなかった時に返却する用のダミーデータ
    const dummyData: Array<Data> = [
      {
        id: "",
        temperature: 0,
        weight: 0,
        steps: 0,
        timeStampDate: new Date().getTime(),
      },
    ];
    // searchValueによって取得期間を切り替え
    let period;
    switch (searchValue) {
      case 0:
        period = 1;
        break;
      case 1:
        period = 1;
        break;
      case 2:
        period = 3;
        break;
      case 3:
        period = 6;
        break;
      case 4:
        period = 9;
        break;
      case 5:
        period = 12;
        break;
      default:
        period = 1;
    }

    const startDate = new Date();
    const today = new Date();
    // 日にちで絞り込み
    if (searchValue === 0) {
      const endDate = new Date(today.setDate(today.getDate() - 7));
      const filterData = allDataState.filter((data) => {
        return (
          new Date(data.timeStampDate * 1000) >= endDate &&
          new Date(data.timeStampDate * 1000) <= startDate
        );
      });
      return filterData.length === 0 ? dummyData : filterData;
      // 月で絞り込み
    } else {
      const endDate = new Date(today.setMonth(today.getMonth() - period));
      const filterData = allDataState.filter((data) => {
        return (
          new Date(data.timeStampDate * 1000) >= endDate &&
          new Date(data.timeStampDate * 1000) <= startDate
        );
      });
      return filterData.length === 0 ? dummyData : filterData;
    }
  },
  set: ({ set }, filterData) => {
    set(filterDataState, filterData);
  },
});
