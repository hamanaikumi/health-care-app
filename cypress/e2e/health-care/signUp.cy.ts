describe("login.cy.ts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signUp");
  });
  it("入力フォームが空の状態でボタンは押せなくなっているか", () => {
    cy.get("button").contains("登録").should("be.disabled");
  });

  it("ログイン画面へのリンクがあるか", () => {
    cy.contains("こちら").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("登録していないメールアドレスで登録できるか", () => {
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("test@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("登録").click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/home");
  });

  it("登録しているユーザーで登録できないか", () => {
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("sample@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("登録").click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/signUp");
  });
});
