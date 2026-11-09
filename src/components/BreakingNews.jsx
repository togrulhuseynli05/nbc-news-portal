import useNews from "../hooks/useNews.js";


export default function BreakingNews() {
  const { articles, loading, error } = useNews({ pageSize: 4 });

  const titles = articles.slice(0, 5).map((item) => item.title).join("   •   ");
  const text = titles || error || (loading ? "Xəbərlər yüklənir..." : "Xəbər tapılmadı.");

  return (
    <div className="breaking">
      <div className="breaking__inner">
        <span className="breaking__label">Breaking News</span>
        <div className="breaking__ticker">
          <p className="breaking__text">{text}</p>
        </div>
      </div>
    </div>
  );
}
