import React from "react";
import "@testing-library/jest-dom";
import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { BrowserRouter } from "react-router-dom";
import Home from "../../src/pages/home/Home";
import SearchBar from "../../src/components/searchBar/SearchBar";

// import { rest } from "msw";
// import { server } from "../setup";
import books from "../mockedData/books.json";

beforeEach(() => {
  renderWithProviders(
    <BrowserRouter>
      <SearchBar />
      <Home />
    </BrowserRouter>
  );
  // { onUnhandledRequest: `bypass` }
  // { onUnhandledRequest: `warn` } - default
  // { onUnhandledRequest: `error` }
  // server.listen();
});
afterEach(() => {
  cleanup();
  // server.resetHandlers();
});
// afterAll(() => server.close());

// UNFINISHED
describe("<Home /> page", () => {
  test("By default, there should be no book cards, no errors, no loading indicator, no 'load more' or 'scroll up' buttons on the page", async () => {
    renderWithProviders(
      <BrowserRouter>
        <SearchBar />
        <Home />
      </BrowserRouter>
    );
    const bookCard = screen.queryByTestId("book-card") as HTMLDivElement | null;
    expect(bookCard).not.toBeInTheDocument();

    const loadingIndicator = screen.queryByTestId(
      "circles-loader"
    ) as HTMLDivElement | null;
    expect(loadingIndicator).not.toBeInTheDocument();

    const errorMessage = screen.queryByTestId(
      "api-error-message"
    ) as HTMLDivElement | null;
    expect(errorMessage).not.toBeInTheDocument();

    const loadMoreButton = screen.queryByTestId(
      "btn-load-more"
    ) as HTMLButtonElement | null;

    expect(loadMoreButton).not.toBeInTheDocument();

    const scrollTopButton = screen.queryByTestId(
      "btn-scroll-top"
    ) as HTMLButtonElement | null;

    expect(scrollTopButton).not.toBeInTheDocument();
  });

  describe("<Home /> should show books cards and buttons after receiving the data", () => {
    test("fetches & receives books by search-submit button click", async () => {
      fireEvent.click(screen.getByTestId("submit-button"));

      // loading indicator
      expect(screen.getByTestId("circles-loader")).toBeInTheDocument();

      await waitForElementToBeRemoved(() =>
        screen.getByTestId("circles-loader")
      );

      // books.json - default has 30 elements
      expect((await screen.findAllByTestId("book-card")).length).toBe(30);

      const loadMoreButton = screen.getByTestId("btn-load-more");
      expect(loadMoreButton).toBeInTheDocument();

      const scrollTopButton = await screen.findByTestId("btn-scroll-top");

      expect(scrollTopButton).toBeInTheDocument();

      await waitFor(() => {
        books.forEach((book) => {
          expect(screen.findByText(book.volumeInfo.title)).toBeDefined();
        });
      });
    });
  });
});
