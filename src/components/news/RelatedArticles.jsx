import { Link } from "react-router-dom";
import CardActions from "../CardActions.jsx";


export default function RelatedArticles({ title, items, variant }) {
  if (items.length === 0) return null;

  if (variant === "side") {
    return (
      <div className="side-related">
        <h3 className="side-related__title">{title}</h3>
        {items.map((item) => (
          <Link key={item.id} to={`/news/${item.id}`} className="side-card">
            <img src={item.image} alt={item.title} />
            <p className="side-card__title">{item.title}</p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="related-topics">
      <h2 className="related-topics__title">{title}</h2>

      <div className="related-track">
        {items.map((item) => (
          <article key={item.id} className="related-card">
            <Link to={`/news/${item.id}`} className="related-card__image">
              <img src={item.image} alt={item.title} />
            </Link>
            <h3 className="related-card__title">
              <Link to={`/news/${item.id}`}>{item.title}</Link>
            </h3>
            <div className="related-card__footer">
              <CardActions url={item.url} color="dark" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
