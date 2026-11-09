export default function ArticleContent({ article }) {
  return (
    <div className="article-content">
      {article.description && <p className="article-content__text">{article.description}</p>}
      {article.content && <p className="article-content__text">{article.content}</p>}
    </div>
  );
}
