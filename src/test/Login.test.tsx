import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "../components/pages/Login";
import userEvent from "@testing-library/user-event";

import firebase from "firebase";
// import { mockCollection } from "firestore-jest-mock/mocks/firestore";

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn(),
    initializeApp: jest.fn(),
  };
});

describe("ログインページ", () => {
  render(<Login />);
  test("ページ初期表示時、ボタンが押せない状態になっているか", () => {
    const button = screen.getByRole("button", { name: "ログイン" });
    expect(button).toBeDisabled();
  });
  test("メールアドレスを入力した時表示されるか", () => {
    render(<Login />);
    // inputのelementを取得
    const inputEmail: HTMLInputElement = screen.getByPlaceholderText("Email");
    expect(inputEmail).toBeInTheDocument();
    // userがinputフォームに文字を入力した状態をシミュレート
    fireEvent.change(inputEmail, {
      target: { value: "email@sample.com" },
    });
    expect(inputEmail.value).toBe("email@sample.com");
  });
  test("パスワードを入力した時表示されるか", () => {
    render(<Login />);
    // inputのelementを取得
    const inputPassword: HTMLInputElement =
      screen.getByPlaceholderText("Password");
    expect(inputPassword).toBeInTheDocument();
    // userがinputフォームに文字を入力した状態をシミュレート
    fireEvent.change(inputPassword, {
      target: { value: "password" },
    });
    expect(inputPassword.value).toBe("password");
  });
  test("メールアドレスとパスワードを入力した時、ボタンが押せる状態になっているか", () => {
    render(<Login />);
  });
});
