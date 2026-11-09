import { useState } from "react";
import NewsCard from "./NewsCard.jsx";
import useNews from "../hooks/useNews.js";
import { CATEGORY_TABS } from "../lib/articles.js";


const MAX_ITEMS = 12;


function LatestList({ category, view }) {
  const { articles, totalResults, loading, error, loadMore } = useNews({ category, pageSize: 4 });
  const canLoadMore = articles.length < MAX_ITEMS && articles.length < totalResults;

  return (
    <>
      {error && <div className="state-box state-box--error">{error}</div>}

      <div className={`news-grid news-grid--${view}`}>
        {articles.map((story) => (
          <NewsCard key={story.id} story={story} />
        ))}
      </div>

      {loading && articles.length === 0 && <p className="state-box">Xəbərlər yüklənir...</p>}

      {!loading && !error && articles.length === 0 && (
        <p className="latest__empty">Xəbər tapılmadı.</p>
      )}

      {canLoadMore && (
        <div className="view-more">
          <button type="button" className="view-more__btn" onClick={loadMore} disabled={loading}>
            {loading ? "LOADING..." : "VIEW MORE"}
          </button>
        </div>
      )}
    </>
  );
}


export default function LatestStories() {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);
  const [view, setView] = useState("grid");
  const tab = CATEGORY_TABS.find((item) => item.id === activeTab);

  return (
    <section className="latest">
      <div className="latest__header">
        <div className="latest__tabs">
          {CATEGORY_TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`latest__tab ${item.id === activeTab ? "is-active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={`view-btn ${view === "list" ? "is-active" : ""}`}
            onClick={() => setView("list")}
            aria-label="Siyahı görünüşü"
          >
            <img src="icons/list-view.svg" alt="" />
          </button>
          <button
            type="button"
            className={`view-btn ${view === "grid" ? "is-active" : ""}`}
            onClick={() => setView("grid")}
            aria-label="Grid görünüşü"
          >
            <img src="icons/grid-view.svg" alt="" />
          </button>
        </div>
      </div>

      <LatestList key={tab.id} category={tab.category} view={view} />
    </section>
  );
}
