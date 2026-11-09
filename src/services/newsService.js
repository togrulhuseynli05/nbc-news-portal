import { apiClient } from "../api/client.js";
import { normalizeArticle, saveArticles } from "../lib/articles.js";

// category: kateqoriya (boşdursa baş xəbərlər), query: axtarış sözü
export async function fetchNews({ category = "", query = "", sortBy = "", pageSize = 4, page = 1 }) {
  const params = { page, pageSize };
  if (category) params.category = category;
  if (query) params.q = query;
  if (sortBy) params.sortBy = sortBy;

  // apiClient cavabı artıq response.data kimi qaytarır
  const data = await apiClient.get("/news", { params });

  // "[Removed]" xəbərlər NewsAPI-nin sildiyi məqalələrdir, göstərilmir
  const articles = data.articles
    .filter((item) => item.title !== "[Removed]" && item.url)
    .map((item) => normalizeArticle(item, category || "general"));

  saveArticles(articles);
  return { articles, totalResults: data.totalResults };
}
