import { describe, test, expect } from "vitest";

import bookSlice, { initialState } from "../../src/redux/slices/bookSlice";

describe("tests for bookSlice", () => {
  test("initialize bookSlice with initialValue", () => {
    const listSliceInit = bookSlice(initialState, { type: "unknown" });
    expect(listSliceInit).toBe(initialState);
  });
});
