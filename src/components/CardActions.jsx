import { useState } from "react";
import BookmarkButton from "./BookmarkButton.jsx";


export default function CardActions({ url, color = "dark" }) {
  const [liked, setLiked] = useState(false);


  function handleShare() {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link kopyalandı!"))
      .catch(() => alert("Link kopyalana bilmədi."));
  }

  return (
    <div className={`card-actions card-actions--${color}`}>
      <button type="button" className="action-btn" onClick={() => setLiked(!liked)} aria-label="Bəyən">
        <img src={liked ? "icons/heart-filled.svg" : `icons/heart-${color}.svg`} alt="" />
      </button>

      <button type="button" className="action-btn" onClick={handleShare} aria-label="Paylaş">
        <img src={`icons/share-${color}.svg`} alt="" />
      </button>

      <BookmarkButton id={url} color={color} />
    </div>
  );
}
