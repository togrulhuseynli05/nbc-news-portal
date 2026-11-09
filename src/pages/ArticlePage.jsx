import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ArticleHero from "../components/news/ArticleHero.jsx";
import StickyActions from "../components/news/StickyActions.jsx";
import ArticleContent from "../components/news/ArticleContent.jsx";
import NewsletterSignup from "../components/news/NewsletterSignup.jsx";
import ArticleTags from "../components/news/ArticleTags.jsx";
import AuthorCard from "../components/news/AuthorCard.jsx";
import RelatedArticles from "../components/news/RelatedArticles.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import useNews from "../hooks/useNews.js";
import { findArticle } from "../lib/articles.js";


export default function ArticlePage() {
  const { id } = useParams();
  const article = findArticle(id);

  if (!article) return <NotFoundPage />;

  // key: başqa xəbərə keçəndə səhifə təmiz yüklənir
  return <ArticleView key={article.id} article={article} />;
}

function ArticleView({ article }) {
  // Eyni kateqoriyadan 10 xəbər: cari xəbər çıxarılır, qalanı əlaqəli xəbərlərdir
  const { articles } = useNews({ category: article.category, pageSize: 10 });
  const related = articles.filter((item) => item.url !== article.url);

  return (
    <>
      <Navbar />
      <ArticleHero article={article} />

      <div className="article-layout">
        <StickyActions article={article} />

        <div className="article-main">
          <ArticleContent article={article} />
          <a className="source-link" href={article.url} target="_blank" rel="noreferrer">
            Tam məqaləni {article.source} saytında oxu →
          </a>
          <NewsletterSignup authorName={article.author} />
          <ArticleTags />
          <AuthorCard name={article.author} source={article.source} />
        </div>

        <aside className="article-side">
          <RelatedArticles title="Recommended for you" items={related.slice(0, 3)} variant="side" />
          <RelatedArticles title="Based on Like" items={related.slice(3, 4)} variant="side" />
        </aside>
      </div>

      <div className="container">
        <RelatedArticles title="Related Topics" items={related.slice(4, 9)} variant="bottom" />
      </div>

      <Footer />
    </>
  );
}
