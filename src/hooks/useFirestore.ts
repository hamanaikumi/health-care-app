import firebase from "firebase";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { todayDataState, yearDataState } from "../store/dataState";
import { Data } from "../types/api/data";
import { useFormatDate } from "./useFormatDate";
import { useMessage } from "./useMessage";

export const useFirestore = () => {
  const db = firebase.firestore();
  const { sendDate } = useFormatDate();
  const { showMessage } = useMessage();
  const [yearData, setYearData] = useRecoilState(yearDataState);
  const [todayData, setTodayData] = useRecoilState(todayDataState);
  const [loading, setLoading] = useState(false);

  /**
   * 最大1年分の記録をfireStoreから取得してrecoilに保存する.
   */
  const getAllData = useCallback(() => {
    setLoading(true);

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // 1年間分のデータを指定
        const startDate = firebase.firestore.Timestamp.fromDate(new Date());
        const today = new Date();
        const endDate = firebase.firestore.Timestamp.fromDate(
          new Date(today.setFullYear(today.getFullYear() - 1))
        );

        const ref = db
          .collection(`users/${currentUser.uid}/data`)
          .orderBy("updatedAt", "desc")
          .startAt(startDate)
          .endAt(endDate);

        ref.onSnapshot((snapshot) => {
          // 仮の配列
          let dataArray: Array<Data> = [];
          snapshot.forEach((doc) => {
            const data = doc.data();

            dataArray.push({
              id: doc.id,
              temperature: Number(data.temperature),
              weight: Number(data.weight),
              steps: Number(data.steps),
              timeStampDate: data.updatedAt.seconds,
            });
          });

          setYearData(dataArray.reverse());
          setLoading(false);
        });
      }
    });
  }, []);

  /**
   * 今日の記録をfireStoreから取得する.
   */
  const getInitialData = useCallback(() => {
    setLoading(true);

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // 今日のデータを指定
        const startDate = sendDate(new Date());

        const ref = db
          .collection(`users/${currentUser.uid}/data`)
          .where("updatedAt", ">=", startDate);

        ref.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();

            const dataObj = {
              id: doc.id,
              temperature: Number(data.temperature),
              weight: Number(data.weight),
              steps: Number(data.steps),
              timeStampDate: data.updatedAt.seconds,
            };
            setTodayData(dataObj);
          });

          setLoading(false);
        });
      }
    });
  }, []);

  /**
   * 入植した値をfireStoreに登録/更新する.
   * @param inputValue 入力した値
   * @param category 記録するカテゴリー
   */
  const editData = useCallback((inputValue: number, category: string) => {
    setLoading(true);
    // ログインしているユーザーを取得
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      if (todayData.id.length > 0) {
        const ref = db
          .collection(`users/${currentUser.uid}/data`)
          .doc(todayData.id);
        if (category === "temperature") {
          ref
            .set(
              {
                temperature: inputValue,
                // 自動でTimeStamp型に変換されるのでDate型でOK
                updatedAt: sendDate(new Date()),
              },
              // 送るデータににないカテゴリーを上書きしないよう設定
              { merge: true }
            )

            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "体温を更新しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              showMessage({ title: "登録に失敗しました", status: "warning" });
              setLoading(false);
            });
        } else if (category === "weight") {
          ref
            .set(
              {
                weight: inputValue,
                updatedAt: sendDate(new Date()),
              },
              { merge: true }
            )
            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "体重を更新しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              showMessage({ title: "登録に失敗しました", status: "warning" });
              setLoading(false);
            });
        } else if (category === "steps") {
          ref
            .set(
              {
                steps: inputValue,
                updatedAt: sendDate(new Date()),
              },
              { merge: true }
            )
            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "歩数を更新しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              showMessage({ title: "登録に失敗しました", status: "warning" });
              setLoading(false);
            });
        }
      } else {
        // 自動生成されるデータIDを取得
        const newId = db.collection(`users/${currentUser.uid}/data`).doc().id;
        const ref = db.collection(`users/${currentUser.uid}/data`).doc(newId);

        if (category === "temperature") {
          ref
            .set({
              temperature: inputValue,
              updatedAt: sendDate(new Date()),
            })
            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "体温を登録しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (category === "weight") {
          ref
            .set({
              weight: inputValue,
              updatedAt: sendDate(new Date()),
            })
            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "体重を登録しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              showMessage({ title: "更新に失敗しました", status: "warning" });
              setLoading(false);
            });
        } else if (category === "steps") {
          ref
            .set({
              steps: inputValue,
              updatedAt: sendDate(new Date()),
            })
            .then(() => {
              getInitialData();
              getAllData();
              showMessage({ title: "歩数を登録しました", status: "success" });
              setLoading(false);
            })
            .catch((error) => {
              showMessage({ title: "更新に失敗しました", status: "warning" });
              setLoading(false);
            });
        }
      }
    }
  }, []);

  return {
    getInitialData,
    todayData,
    editData,
    getAllData,
    loading,
  };
};
