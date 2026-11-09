import { Link } from "react-router-dom";
import useNews from "../hooks/useNews.js";
import CardActions from "./CardActions.jsx";


export default function HeroSection() {
  const { articles, loading, error } = useNews({ pageSize: 4 });
  const story = articles[0];

  if (!story) {
    return (
      <section className="hero hero--state">
        <p>{error || (loading ? "Xəbərlər yüklənir..." : "Xəbər tapılmadı.")}</p>
      </section>
    );
  }

  const link = `/news/${story.id}`;

  return (
    <section className="hero">
      <div className="hero__image">
        <Link to={link}>
          <img src={story.image} alt={story.title} />
        </Link>
      </div>

      <div className="hero__content">
        <div className="hero__top">
          <span className="hero__label">Trending</span>
          <CardActions url={story.url} color="dark" />
        </div>

        <h1 className="hero__title">
          <Link to={link}>{story.title}</Link>
        </h1>
        <p className="hero__desc">{story.description}</p>

        <div className="meta">
          <span>{story.time}</span>
          <span>By {story.author} | {story.readTime}</span>
        </div>
      </div>
    </section>
  );
}
