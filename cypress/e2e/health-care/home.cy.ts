describe("home.cy.ts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/home");
  });

  it("体温を登録できるか", () => {
    cy.get("input:first").clear().type("36.2");
    cy.get("button").eq(1).should("have.text", "登録").click();
    cy.wait(1000);
    cy.contains("体温を登録しました");
  });

  it("体重を登録できるか", () => {
    cy.get("input").eq(1).clear().type("50.0");
    cy.get("button").eq(2).should("have.text", "登録").click();
    cy.wait(1000);
    cy.contains("体重を登録しました");
  });

  it("歩数を登録できるか", () => {
    cy.get("input").eq(2).clear().type("1000");
    cy.get("button").eq(3).should("have.text", "登録").click();
    cy.wait(1000);
    cy.contains("歩数を登録しました");
  });
});
