import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import books from "./mockedData/books.json";

import { fetch, Headers, Request, Response } from "cross-fetch";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const handlers = [
  rest.get(
    `https://www.googleapis.com/books/v1/volumes`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(books), ctx.delay(150));
    }
  ),
  rest.get(
    `https://www.googleapis.com/books/v1/volumes/${books[0].id}`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(books[0]), ctx.delay(150));
    }
  ),
];

export const server = setupServer(...handlers);
