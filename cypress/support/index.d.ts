/// <reference  types="cypress" />
import "./commands";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

declare global {
  namespace Cypress {
    interface Chainable {
      getDataTestId(value: string): Chainable<JQuery<HTMLElement>>;
      interceptRequest(method: Method): Chainable<null>;
      mount: typeof mount;
    }
  }
}

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
