import { DETAIL_TAGS } from "../../lib/articles.js";


export default function ArticleTags() {
  return (
    <div className="article-tags">
      <div className="tag-pills">
        {DETAIL_TAGS.map((tag) => (
          <button key={tag} type="button" className="tag-pill">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
