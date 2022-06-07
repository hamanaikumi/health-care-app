describe("dataLis.cy.ts", () => {
  beforeEach(() => {});
  it("データ一覧画面初期表示に体重が選択されているか", () => {
    //  テスト用ユーザーでログイン
    cy.visit("http://localhost:3000/");
    cy.get("input:first")
      .should("have.attr", "placeholder", "Email")
      .type("testUser@mail.com");
    cy.get("input:last")
      .should("have.attr", "placeholder", "Password")
      .type("password");
    cy.get("button").contains("ログイン").click();
    cy.wait(3000);
    cy.contains("データ一覧").click();
    cy.get("button")
      .contains("体重")
      .should("have.css", "background-color", "rgb(56, 178, 172)");
  });
  it("体温が正しい値が表示されているか", () => {
    cy.get("circle").eq(0).trigger("mouseover");
    cy.contains("36度");
    cy.contains("6/3");
  });
  it("体重を選択して正しい値が表示されるか", () => {
    cy.get("button")
      .contains("体重")
      .click()
      .should("have.css", "background-color", "rgb(56, 178, 172)");
    cy.get("circle").eq(0).trigger("mouseover");
    cy.contains("50kg");
    cy.contains("6/3");
  });
  it("歩数を選択して正しい値が表示されるか", () => {
    cy.get("button")
      .contains("歩数")
      .click()
      .should("have.css", "background-color", "rgb(56, 178, 172)");
    cy.get("circle").eq(0).trigger("mouseover");
    cy.contains("1500歩");
    cy.contains("6/3");
  });
  it("グラフの切り替えができるか", () => {
    cy.get("button:last").click({ force: true });
    cy.get(".recharts-bar");
    cy.get("button:last").click({ force: true });
    cy.get(".recharts-line");
  });
});
