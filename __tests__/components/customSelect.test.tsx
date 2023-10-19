import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../src/redux/store";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../test-utils";

import CustomSelect from "../../src/components/customSelect/CustomSelect";

describe("<CustomSelect /> component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomSelect
            options={store.getState().search.availableCategories}
            onChange={vi.fn()}
            selected={store.getState().search.availableCategories[0]}
            placeholder="placeholder"
          />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Must put the [data-selected="all"] attribute for the placeholder by default from redux', async () => {
    const placeholder = screen.queryByText(
      store.getState().search.availableCategories[0]
    );
    expect(placeholder).toHaveAttribute("data-selected", "all");
  });
});

describe("<CustomSelect /> component", () => {
  test('Must add the [data-mode="rows"] attribute to custom-select if mode=rows is passed', async () => {
    renderWithProviders(
      <CustomSelect
        options={store.getState().search.availableCategories}
        onChange={vi.fn()}
        selected={store.getState().search.availableCategories[0]}
        placeholder="placeholder"
        mode="rows"
      />
    );
    const selectWrapper = screen.getByTestId("custom-select");
    expect(selectWrapper).toHaveAttribute("data-mode", "rows");
  });

  test('Must add the [data-mode="cells"] attribute to custom-select if mode=cells is passed', async () => {
    renderWithProviders(
      <CustomSelect
        options={store.getState().search.availableCategories}
        onChange={vi.fn()}
        selected={store.getState().search.availableCategories[0]}
        placeholder="placeholder"
        mode="cells"
      />
    );
    const selectWrapper = screen.getByTestId("custom-select");
    expect(selectWrapper).toHaveAttribute("data-mode", "cells");
  });

  test('The [data-mode="rows"] attribute must be set for custom-select if the mode property is not specified', async () => {
    renderWithProviders(
      <CustomSelect
        options={store.getState().search.availableCategories}
        onChange={vi.fn()}
        selected={store.getState().search.availableCategories[0]}
        placeholder="placeholder"
      />
    );
    const selectWrapper = screen.getByTestId("custom-select");
    expect(selectWrapper).toHaveAttribute("data-mode", "rows");
  });
});

describe("<CustomSelect /> component", () => {
  test('When an option is clicked, the "onChange" handler should go through and close the dropdown', async () => {
    const handleSelect = vi.fn();

    render(
      <CustomSelect
        options={store.getState().search.availableCategories}
        onChange={handleSelect}
        selected={store.getState().search.availableCategories[0]}
        placeholder="placeholder"
      />
    );

    // click on default category
    const placeholder = screen.getByText(
      store.getState().search.availableCategories[0]
    );
    fireEvent.click(placeholder);

    // click on next category
    const option = screen.getByText(
      store.getState().search.availableCategories[1]
    );
    fireEvent.click(option);

    const optionAfterClick = screen.queryByText(
      store.getState().search.availableCategories[1]
    );

    expect(optionAfterClick).not.toBeInTheDocument();
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  test('When clicked outside the selector, the "onClose" handler should be called and the dropdown should be closed', async () => {
    const handleClose = vi.fn();

    render(
      <div data-testid="1">
        outer element
        <CustomSelect
          options={store.getState().search.availableCategories}
          onChange={vi.fn()}
          onClose={handleClose}
          selected={store.getState().search.availableCategories[0]}
          placeholder="placeholder"
        />
      </div>
    );

    // default value is visible
    const placeholder = screen.getByText(
      store.getState().search.availableCategories[0]
    );
    fireEvent.click(placeholder);

    const outerElement = screen.getByTestId("1");
    fireEvent.click(outerElement);

    // second value is invisible (the dropdown is no longer in the document)
    const option = screen.queryByText(
      store.getState().search.availableCategories[1]
    );

    expect(option).not.toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});