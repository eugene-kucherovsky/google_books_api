import { describe, test, expect } from "vitest";

import searchSlice, {
  initialState,
  changeSearchValue,
  changeCategory,
  changeSort,
  changeStartIndex,
  clearStartIndex,
} from "../../src/redux/slices/searchSlice";

describe("tests for searchSlice", () => {
  test("initialize searchSlice with initialValue", () => {
    const listSliceInit = searchSlice(initialState, { type: "unknown" });
    expect(listSliceInit).toBe(initialState);
  });

  test("changeSearchValue reducer", () => {
    const testValue = "science";

    const afterReducerOperation = searchSlice(
      initialState,
      changeSearchValue(testValue)
    );

    expect(afterReducerOperation).toStrictEqual({
      items: [],
      totalItems: 0,
      status: "idle",
      error: null,
      searchOptions: {
        query: testValue,
        category: "all",
        orderBy: "relevance",
        startIndex: 0,
      },
      availableCategories: [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
      ],
      availableOrders: ["relevance", "newest"],
    });
  });

  test("changeCategory reducer", () => {
    const testValue = "art";

    const afterReducerOperation = searchSlice(
      initialState,
      changeCategory(testValue)
    );

    expect(afterReducerOperation).toStrictEqual({
      items: [],
      totalItems: 0,
      status: "idle",
      error: null,
      searchOptions: {
        query: "",
        category: testValue,
        orderBy: "relevance",
        startIndex: 0,
      },
      availableCategories: [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
      ],
      availableOrders: ["relevance", "newest"],
    });
  });

  test("changeSort reducer", () => {
    const testValue = "newest";

    const afterReducerOperation = searchSlice(
      initialState,
      changeSort(testValue)
    );

    expect(afterReducerOperation).toStrictEqual({
      items: [],
      totalItems: 0,
      status: "idle",
      error: null,
      searchOptions: {
        query: "",
        category: "all",
        orderBy: testValue,
        startIndex: 0,
      },
      availableCategories: [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
      ],
      availableOrders: ["relevance", "newest"],
    });
  });

  test("changeStartIndex reducer", () => {
    const testValue = 40;

    const afterReducerOperation = searchSlice(initialState, changeStartIndex());

    expect(afterReducerOperation).toStrictEqual({
      items: [],
      totalItems: 0,
      status: "idle",
      error: null,
      searchOptions: {
        query: "",
        category: "all",
        orderBy: "relevance",
        startIndex: testValue,
      },
      availableCategories: [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
      ],
      availableOrders: ["relevance", "newest"],
    });
  });

  test("clearStartIndex reducer", () => {
    const testValue = 0;

    const afterReducerOperation = searchSlice(initialState, clearStartIndex());

    expect(afterReducerOperation).toStrictEqual({
      items: [],
      totalItems: 0,
      status: "idle",
      error: null,
      searchOptions: {
        query: "",
        category: "all",
        orderBy: "relevance",
        startIndex: testValue,
      },
      availableCategories: [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
      ],
      availableOrders: ["relevance", "newest"],
    });
  });
});
