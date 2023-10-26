import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchSearch, changeStartIndex } from "../../redux/slices/searchSlice";
import BookCard from "../../components/bookCard/BookCard";
import Loader from "../../components/loader/Loader";
import "./Home.scss";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, searchOptions, status, error } = useAppSelector(
    (state) => state.search
  );

  // console.log(items);

  const loadMore = () => {
    dispatch(changeStartIndex());
    dispatch(fetchSearch(searchOptions));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home-wrapper">
      {status === "pending" && <Loader />}
      {error && (
        <p
          className="home-wrapper__api-error-message"
          data-testid="api-error-message"
        >
          {error}
        </p>
      )}

      <div className="home-wrapper__container">
        {items
          ? items.map((item) => <BookCard key={item.id} {...item} />)
          : null}
      </div>

      {items?.length > 0 && (
        <div className="home-wrapper__buttons">
          <button
            className="btn-load-more"
            data-testid="btn-load-more"
            onClick={loadMore}
          >
            Показать больше
          </button>
          <button
            className="btn-scroll-top"
            data-testid="btn-scroll-top"
            onClick={scrollToTop}
          >
            <svg
              className="btn-scroll-top__svg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
