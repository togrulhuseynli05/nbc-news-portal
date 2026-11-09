import { useState } from "react";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews.js";


function LocationResults({ city }) {
  const { articles, loading, error } = useNews({ query: city, pageSize: 3 });

  if (error) return <p className="location__error">{error}</p>;
  if (loading && articles.length === 0) return <p className="location__results">Yüklənir...</p>;
  if (articles.length === 0) return <p className="location__results">“{city}” üçün xəbər tapılmadı.</p>;

  return (
    <ul className="location__results">
      {articles.map((item) => (
        <li key={item.id}>
          <Link to={`/news/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}


export default function SidePanel() {
  const { articles } = useNews({ pageSize: 4 });
  const live = articles[1];

  const [input, setInput] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setCity(value);
    setInput("");
  }

  return (
    <aside className="side">
      {live && (
        <div className="live">
          <div className="live__header">
            <span>Live</span>
            <span className="live__dot" />
          </div>
          <Link to={`/news/${live.id}`}>
            <img className="live__image" src={live.image} alt={live.title} />
          </Link>
          <p className="live__title">
            <Link to={`/news/${live.id}`}>{live.title}</Link>
          </p>
        </div>
      )}

      <div className="location">
        <h3>Location News</h3>
        <form className="location__box" onSubmit={handleSubmit}>
          <p>Get Location specific News</p>
          <input
            type="text"
            placeholder="Enter Your Location"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" className="btn-red">SUBMIT</button>
        </form>

        {city && <LocationResults key={city} city={city} />}
      </div>
    </aside>
  );
}
