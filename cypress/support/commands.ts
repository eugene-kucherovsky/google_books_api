/// <reference types="cypress" />

Cypress.Commands.add("getDataTestId", (value) => {
  return cy.get(`[data-testid="${value}"]`);
});

Cypress.Commands.add("interceptRequest", (method) => {
  cy.intercept({ method, path: "/add/api/path/here" }, (req) => {
    req.alias = method;
  });
});

export {};