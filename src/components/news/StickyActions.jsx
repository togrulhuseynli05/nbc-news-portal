import { useState } from "react";
import BookmarkButton from "../BookmarkButton.jsx";


export default function StickyActions({ article }) {
  const [liked, setLiked] = useState(false);

  function handleShare() {
    navigator.clipboard
      .writeText(article.url)
      .then(() => alert("Link kopyalandı!"))
      .catch(() => alert("Link kopyalana bilmədi."));
  }

  return (
    <aside className="sticky-actions">
      <p className="sticky-actions__label">See more like this?</p>

      <div className="sticky-actions__dots">
        <span className="dot dot--green" />
        <span className="dot-sep">|</span>
        <span className="dot dot--orange" />
      </div>

      <div className="sticky-actions__list">
        <button type="button" className="sticky-btn" onClick={() => setLiked(!liked)} aria-label="Bəyən">
          <img src={liked ? "icons/heart-filled.svg" : "icons/heart-dark.svg"} alt="" />
        </button>

        <a className="sticky-btn" href={article.url} target="_blank" rel="noreferrer" aria-label="Mənbədə bax">
          <img src="icons/comment.svg" alt="" />
        </a>

        <button type="button" className="sticky-btn" onClick={handleShare} aria-label="Paylaş">
          <img src="icons/share-dark.svg" alt="" />
        </button>

        <BookmarkButton id={article.url} color="dark" />
      </div>
    </aside>
  );
}
