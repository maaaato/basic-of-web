describe("The Game", () => {
  it("Winner X", () => {
    const v = [0, 3, 1, 4, 2];
    cy.visit("/");
    for (let i in v) {
      cy.get("button").eq(v[i]).click();
    }
    cy.contains("Winner: X");
  });

  it("Winner ○", () => {
    const v = [0, 3, 1, 4, 6, 5];
    cy.visit("/");
    for (let i in v) {
      cy.get("button").eq(v[i]).click();
    }
    cy.contains("Winner: ○");
  });

  it("Draw", () => {
    const v = [0, 3, 1, 4, 6, 2, 7, 8, 5];
    cy.visit("/");
    for (let i in v) {
      cy.get("button").eq(v[i]).click();
    }
    cy.contains("Draw!");
  });
});
