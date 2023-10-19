import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../src/redux/store";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import SearchBar from "../../src/components/searchBar/SearchBar";

describe("<SearchBar /> component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("Search Input test", async () => {
    const searchInput = screen.getByTestId(
      "search-input"
    ) as HTMLInputElement | null;

    expect(searchInput).toBeTruthy();
    expect(searchInput?.textContent).toBe("");

    if (searchInput) {
      expect(searchInput.type).toBe("text");
      expect(searchInput.name).toBe("serch");

      await waitFor(() => {
        fireEvent.change(searchInput, { target: { value: "science" } });
        fireEvent.focusOut(searchInput);
        expect(searchInput.value).toBe("science");
      });
    }
  });

  test("Search Button should be visible", () => {
    const searchButton = screen.getByTestId(
      "submit-button"
    ) as HTMLButtonElement | null;
    expect(searchButton).toBeTruthy();
  });

  test("Selects text 'categories' and 'cort by' should should be visible all the time", () => {
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  test("CustomSelect elements should be visible", () => {
    const selects = screen.getAllByTestId("custom-select");
    expect(selects.length).toBe(2);
  });

  test("CustomSelect elements should have default values", () => {
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/relevance/i)).toBeInTheDocument();
  });

  test("When you click on the 'category' placeholder, a drop-down list should open", async () => {
    const category = screen.getByText("all");
    fireEvent.click(category);

    const categoryDropdown = screen.getByTestId("custom-select-dropdown-menu");
    expect(categoryDropdown).toBeInTheDocument();
  });

  test("When you click on the 'sort by' placeholder, a drop-down list should open", async () => {
    const category = screen.getByText("relevance");
    fireEvent.click(category);

    const categoryDropdown = screen.getByTestId("custom-select-dropdown-menu");
    expect(categoryDropdown).toBeInTheDocument();
  });
});
