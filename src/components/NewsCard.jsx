import { Link } from "react-router-dom";
import CardActions from "./CardActions.jsx";


export default function NewsCard({ story }) {
  const link = `/news/${story.id}`;

  return (
    <article className="news-card">
      <div className="news-card__image">
        <Link to={link}>
          <img src={story.image} alt={story.title} />
        </Link>
      </div>

      <div className="news-card__content">
        <div className="news-card__body">
          <h3 className="news-card__title">
            <Link to={link}>{story.title}</Link>
          </h3>
          <p className="news-card__desc">{story.description}</p>
          <div className="meta">
            <span>{story.time}</span>
            <span>By {story.author} | {story.readTime}</span>
          </div>
        </div>

        <div className="news-card__footer">
          <CardActions url={story.url} color="dark" />
        </div>
      </div>
    </article>
  );
}
