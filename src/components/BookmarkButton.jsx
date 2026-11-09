import useBookmark from "../hooks/useBookmark.js";


export default function BookmarkButton({ id, color = "dark" }) {
  const { isSaved, toggle } = useBookmark();
  const saved = isSaved(id);

  return (
    <button type="button" className="action-btn" onClick={() => toggle(id)} aria-label="Yadda saxla">
      <img src={saved ? "icons/bookmark-filled.svg" : `icons/bookmark-${color}.svg`} alt="" />
    </button>
  );
}
