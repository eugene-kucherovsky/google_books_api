describe("Home page test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("home page default state", () => {
    // search input & submit button visible
    cy.getDataTestId("search-input").should("exist");
    cy.getDataTestId("submit-button").should("exist");
    // custom-select info displayed correctly
    cy.contains(/categories/i).should("exist");
    cy.contains(/sort by/i).should("exist");
    cy.contains(/all/i).should("exist");
    cy.contains(/relevance/i).should("exist");
    cy.getDataTestId("custom-select").should("exist");
    cy.getDataTestId("custom-select-select")
      .find("div")
      .should("have.length", 2);
    // custom-select`s dropdown-menu`s not present on page by default
    cy.getDataTestId("custom-select-dropdown-menu").should("not.exist");
    // founded-results not present on page by default
    cy.getDataTestId("founded-results").should("not.exist");
    cy.getDataTestId("book-card").should("not.exist");

    // no loading indicator & no error
    cy.getDataTestId("circles-loader").should("not.exist");
    cy.getDataTestId("api-error-message").should("not.exist");

    // no load-mode & scroll-to-top buttons by default
    cy.getDataTestId("btn-load-more").should("not.exist");
    cy.getDataTestId("btn-scroll-top").should("not.exist");
  });

  it("loadMore & scrollToTop button functionality", () => {
    cy.getDataTestId("submit-button").click();
    cy.wait(5000).getDataTestId("book-card").should("have.length", 30);

    cy.getDataTestId("btn-load-more").click();

    cy.wait(5000).getDataTestId("book-card").should("have.length", 60);

    cy.scrollTo("bottom").window().its("scrollY").should("not.equal", 0);
    cy.getDataTestId("btn-scroll-top").click();
    cy.window().its("scrollY").should("equal", 0);
  });

  it("search input and submit button functionality", () => {
    cy.getDataTestId("search-input").as("search-input");

    cy.wait(500).get("@search-input").type("science");

    cy.wait(600).getDataTestId("circles-loader").should("exist");

    cy.wait(5000).getDataTestId("book-card").should("exist");

    cy.wait(500).getDataTestId("book-card").should("have.length", 30);

    cy.getDataTestId("circles-loader").should("not.exist");

    cy.getDataTestId("btn-load-more").should("exist");
    cy.getDataTestId("btn-scroll-top").should("exist");
  });

  it("select categories & sorting functionality", () => {
    // CATEGORIES
    cy.getDataTestId("custom-select").find("div").contains(/all/i).click();

    const categories = [
      "all",
      "art",
      "biography",
      "computers",
      "history",
      "medical",
    ];

    cy.wait(500).getDataTestId("custom-select-dropdown-menu").should("exist");

    categories.forEach(function (value) {
      cy.getDataTestId("custom-select-dropdown-menu")
        .children()
        .should("contain", value);
    });
    // select 'art' and click
    cy.getDataTestId("custom-select-dropdown-menu").contains(/art/i).click();
    // 'art' appears on the page
    cy.wait(500).contains(/art/i).should("exist");
    // 'art' the value is assigned correctly
    cy.wait(500)
      .getDataTestId("custom-select-select")
      .contains(/art/i)
      .should("have.attr", "data-selected", "art");
    // SORT BY
    cy.getDataTestId("custom-select")
      .find("div")
      .contains(/relevance/i)
      .click();

    const sorting = ["relevance", "newest"];

    sorting.forEach(function (value) {
      cy.getDataTestId("custom-select-dropdown-menu")
        .children()
        .should("contain", value);
    });

    // select 'newest' and click
    cy.getDataTestId("custom-select-dropdown-menu")
      .contains(/newest/i)
      .click();
    // 'newest' appears on the page
    cy.wait(500)
      .contains(/newest/i)
      .should("exist");
    // 'newest' the value is assigned correctly
    cy.wait(500)
      .getDataTestId("custom-select-select")
      .contains(/newest/i)
      .should("have.attr", "data-selected", "newest");

    // click send after selecting a category and sorting
    cy.wait(500).getDataTestId("submit-button").click();

    // get at least 1 card containing 'Art'
    cy.wait(500).getDataTestId("book-card").contains(/Art/i);
  });
});
