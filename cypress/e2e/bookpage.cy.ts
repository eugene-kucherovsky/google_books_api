describe("Home page test", () => {
  beforeEach(() => {
    cy.visit("/zj8IywAACAAJ");
  });

  it("book page default state", () => {
    // search input & submit button visible
    cy.getDataTestId("search-input").should("exist");
    cy.getDataTestId("submit-button").should("exist");
    // custom-select info displayed correctly
    cy.contains(/categories/i).should("exist");
    cy.contains(/sort by/i).should("exist");
    cy.getDataTestId("custom-select").should("exist");
    cy.getDataTestId("custom-select-select")
      .find("div")
      .should("have.length", 2);
    // custom-select`s dropdown-menu`s not present on page by default
    cy.getDataTestId("custom-select-dropdown-menu").should("not.exist");
    // founded-results not present on page by default
    cy.getDataTestId("founded-results").should("not.exist");

    cy.getDataTestId("circles-loader").should("exist");
    cy.getDataTestId("back-link").should("exist");

    cy.wait(3000).getDataTestId("book-info").should("exist");
  });

//   it("redirect functionality tests", () => {

//   });
});
