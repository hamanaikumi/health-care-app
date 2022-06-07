import React from "react";
import { render, screen } from "@testing-library/react";
import { SignUp } from "../components/pages/SignUp";

test("renders learn react link", () => {
  render(<SignUp />);
  const linkElement = screen.getByText("登録");
  expect(linkElement).toBeInTheDocument();
});
