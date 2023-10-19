import { Link } from "react-router-dom";
import type { Item } from "../../redux/slices/searchSlice";
import emptyPhoto from "../../assets/empty.png";
import "./BookCard.scss";

export default function BookCard(item: Item) {
  const { imageLinks, title, categories, authors } = item.volumeInfo;

  return (
    <div className="book-card" data-testid="book-card">
      <Link to={`/${item.id}`} className="book-card__link-img">
        <img
          className="book-card-image"
          src={
            imageLinks?.smallThumbnail ? imageLinks?.smallThumbnail : emptyPhoto
          }
          alt="cover image"
        />
      </Link>

      <div className="book-card__content">
        <p className="book-card-title">{title}</p>
        {categories && <p className="book-card-cat" >{categories[0]}</p>}
        {authors && authors.length > 1 ? (
          <p className="book-card-auth">{authors.join(", ")}</p>
        ) : (
          <p className="book-card-auth">{authors}</p>
        )}
      </div>
    </div>
  );
}
