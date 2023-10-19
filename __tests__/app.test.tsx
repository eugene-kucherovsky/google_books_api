import React from "react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";
import { renderWithProviders } from "./test-utils";
import App from "../src/App";

describe("<App />", () => {
  test("App mounts properly", () => {
    const app = renderWithProviders(<App />);
    expect(app).toBeTruthy();
  });
});
