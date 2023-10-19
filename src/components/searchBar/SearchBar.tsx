import { useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchSearch } from "../../redux/slices/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import CustomSelect from "../../components/customSelect/CustomSelect";

import {
  changeSearchValue,
  changeCategory,
  changeSort,
  clearStartIndex,
} from "../../redux/slices/searchSlice";
import "./SearchBar.scss";

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalItems, availableCategories, availableOrders } = useAppSelector(
    (state) => state.search
  );
  const searchOptions = useAppSelector((state) => state.search.searchOptions);
  const debouncedSearch: string = useDebounce<string>(
    searchOptions.query,
    1000
  );

  useEffect(() => {
    if (searchOptions.query !== "") {
      navigate("/");
      dispatch(changeSearchValue(debouncedSearch));
      dispatch(fetchSearch(searchOptions));
    }
  }, [debouncedSearch]);

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    navigate("/");
    dispatch(fetchSearch(searchOptions));
  }

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    navigate("/");
    dispatch(clearStartIndex());
    dispatch(changeSearchValue(event.target.value));
  }

  function categoriesHandler(value: string) {
    navigate("/");
    dispatch(clearStartIndex());
    dispatch(changeCategory(value));
  }

  function sortHandler(value: string) {
    navigate("/");
    dispatch(clearStartIndex());
    dispatch(changeSort(value));
  }

  return (
    <div className="search-bar-wrapper">
      <form className="search-form" onSubmit={submitHandler}>
        <input
          className="search-form__input"
          data-testid="search-input"
          onChange={(event) => searchHandler(event)}
          type="text"
          name="serch"
          placeholder="Поиск книг..."
          autoFocus
        />

        <button
          className="search-form__btn-submit"
          data-testid="submit-button"
          type="submit"
        >
          <svg
            className="svg-btn-submit"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      <div className="search-selects">
        <div className="search-selects__select">
          <p className="select-title">categories</p>
          <CustomSelect
            // data-testid="select-categories"
            mode="cells"
            options={availableCategories}
            selected={searchOptions.category || null}
            onChange={categoriesHandler}
            placeholder="category..."
          />
        </div>
        <div className="search-selects__select">
          <p className="select-title">sort by</p>
          <CustomSelect
            // data-testid="select-sorting"
            mode="cells"
            options={availableOrders}
            selected={searchOptions.orderBy || null}
            onChange={sortHandler}
            placeholder="sorting..."
          />
        </div>
      </div>
      {totalItems != 0 && (
        <p className="founded" data-testid="founded-results">
          Founded {totalItems}
        </p>
      )}
    </div>
  );
}
