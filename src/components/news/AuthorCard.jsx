export default function AuthorCard({ name, source }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="author-card">
      <div className="author-card__avatar">
        <span>{initials}</span>
      </div>

      <div className="author-card__info">
        <p className="author-card__label">Author</p>
        <h3 className="author-card__name">{name}</h3>
        <p className="author-card__bio">Source: {source}</p>
      </div>

      <button type="button" className="follow-btn">
        <img src="icons/twitter-red.svg" alt="" />
        FOLLOW
      </button>
    </section>
  );
}
