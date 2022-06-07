describe("login.cy.ts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("入力フォームが空の状態でボタンは押せなくなっているか", () => {
    cy.get("button").contains("ログイン").should("be.disabled");
  });

  it("ユーザー登録画面へのリンクがあるか", () => {
    cy.contains("こちら").click();
    cy.url().should("eq", "http://localhost:3000/signUp");
  });

  it("登録していないメールアドレスでログインできないか", () => {
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("ng@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("ログイン").click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("登録しているユーザーでログインできるか", () => {
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("sample@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("ログイン").click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/home");
  });
});
