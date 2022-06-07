import firebase from "firebase";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { todayDataState, yearDataState } from "../store/dataState";
import { useFirestore } from "./useFirestore";

import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { getAllData } = useFirestore();
  const resetYearData = useResetRecoilState(yearDataState);
  const resetTodayData = useResetRecoilState(todayDataState);
  const [loading, setLoading] = useState(false);

  /**
   * ログインする.
   */
  const login = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          if (res) {
            // データが返ってきた時
            getAllData();
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          }
        })
        .catch((error: any) => {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
          setLoading(false);
        });
    },
    [history]
  );

  /**
   * ユーザー登録をする.
   */
  const signUp = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res: any) => {
          if (res) {
            // データが返ってきた時
            showMessage({ title: "ユーザー登録しました", status: "success" });
            history.push("/home");
          }
        })
        .catch((error: any) => {
          console.log(error.message);
          showMessage({ title: "ユーザー登録に失敗しました", status: "error" });
          setLoading(false);
        });
    },
    [history]
  );

  const logout = useCallback(() => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // recoilのデータを初期化
        resetYearData();
        resetTodayData();

        showMessage({ title: "ログアウトしました", status: "success" });
        setLoading(false);
      })
      .catch(() => {
        console.log("ログアウトに失敗しました");
        setLoading(false);
      });
  }, [history]);

  return { login, signUp, logout, loading };
};
