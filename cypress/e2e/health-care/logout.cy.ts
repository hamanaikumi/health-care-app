describe("login.cy.ts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("sample@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("ログイン").click();
    cy.wait(2000);
  });
  it("ログアウトできるか", () => {
    cy.contains("ログアウト").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
