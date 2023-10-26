import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchBook } from "../../redux/slices/bookSlice";
import Loader from "../../components/loader/Loader";
import emptyPhoto from "../../assets/empty.png";
import DOMPurify from "dompurify";
import "./Book.scss";

export default function Book() {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const { item, status, error } = useAppSelector((state) => state.book);

  useEffect(() => {
    if (id) {
      dispatch(fetchBook(id));
    }
  }, []);

  const addImg = () => {
    if (item?.volumeInfo?.imageLinks?.thumbnail) {
      return item?.volumeInfo?.imageLinks?.thumbnail;
    } else {
      return emptyPhoto;
    }
  };

  const BookDescription = (description: string) => {
    const cleanDescription = DOMPurify.sanitize(description, {
      ALLOWED_TAGS: [],
    });
    return <textarea readOnly value={cleanDescription}></textarea>;
  };

  return (
    <div className="book-wrapper">
      <div className="back-link" data-testid="back-link">
        <svg
          className="back-link__svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <Link to="/">Назад к поиску</Link>
      </div>

      {status === "pending" && <Loader />}
      {error && <p className="api-error-message">{error}</p>}

      {item && (
        <div className="book-info" data-testid="book-info">
          <div className="book-info__img">
            <img src={addImg()} alt="cover image" />
          </div>
          <div className="book-info__text">
            {item.volumeInfo?.categories && (
              <p className="book-cat">
                {item.volumeInfo?.categories?.join("/")}
              </p>
            )}
            {item.volumeInfo?.title && (
              <p className="book-title">{item.volumeInfo?.title}</p>
            )}
            {item.volumeInfo?.authors && (
              <p className="book-auth">
                {item.volumeInfo?.authors?.join(", ")}
              </p>
            )}
            {item.volumeInfo?.description &&
              BookDescription(item.volumeInfo?.description)}
          </div>
        </div>
      )}
    </div>
  );
}
