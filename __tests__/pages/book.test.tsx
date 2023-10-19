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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from "../test-utils";
import { rest } from "msw";
import { server } from "../setup";
// import SearchBar from "../../src/components/searchBar/SearchBar";
import Book from "../../src/pages/book/Book";

beforeEach(() => {
  renderWithProviders(
    <BrowserRouter>
      <Book />
    </BrowserRouter>
  );
});
afterEach(() => {
  cleanup();
});

// UNFINISHED
describe("<Book /> page", () => {
  test("Should always show the “Назад к поиску” link", async () => {
    expect(screen.getByText(/Назад к поиску/i)).toBeInTheDocument();
  });
});
