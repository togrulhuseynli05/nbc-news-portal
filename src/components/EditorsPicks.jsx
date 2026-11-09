import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews.js";
import CardActions from "./CardActions.jsx";

// Bu ölçüdən böyük ekranda bir səhifədə 2 kart, kiçikdə 1 kart (CSS ilə eyni: 800px)
const DESKTOP_QUERY = "(min-width: 800px)";


export default function EditorsPicks() {
  const { articles, loading, error } = useNews({
    query: "United States",
    sortBy: "popularity",
    pageSize: 4,
  });

  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [page, setPage] = useState(0);

  // Ekran ölçüsü dəyişəndə səhifəni yenidən hesabla
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    function onChange() {
      setIsDesktop(media.matches);
      setPage(0);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const title = (
    <h2 className="picks__header">
      <span>Editor’s Picks</span>
      <img src="icons/star.svg" alt="" />
    </h2>
  );

  if (articles.length === 0) {
    return (
      <section className="picks">
        {title}
        <p className="state-box">{error || (loading ? "Xəbərlər yüklənir..." : "Xəbər tapılmadı.")}</p>
      </section>
    );
  }

  // Kartları səhifələrə bölürük: kompüterdə [[1,2],[3,4]], mobildə [[1],[2],[3],[4]]
  const perPage = isDesktop ? 2 : 1;
  const pages = [];
  for (let i = 0; i < articles.length; i += perPage) {
    pages.push(articles.slice(i, i + perPage));
  }

  return (
    <section className="picks">
      {title}

      <div className="picks__viewport">
        <div className="picks__track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((group, pageIndex) => (
            <div key={pageIndex} className="picks__page">
              {group.map((item) => (
                <article key={item.id} className="pick">
                  <div className="pick__image">
                    <Link to={`/news/${item.id}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                    <div className="pick__actions">
                      <CardActions url={item.url} color="white" />
                    </div>
                  </div>

                  <div className="pick__body">
                    <h3>
                      <Link to={`/news/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="dots">
          {pages.map((_, index) => (
            <button key={index} type="button" onClick={() => setPage(index)} aria-label={`${index + 1}-ci səhifə`}>
              <img
                src={index === page ? "icons/pagination-active.svg" : "icons/pagination-inactive.svg"}
                alt=""
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
