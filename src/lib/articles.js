// Xəbər datasını saytın formatına çevirən sadə köməkçilər

export const PLACEHOLDER_IMAGE = "images/placeholder.svg";

// Kateqoriya tabları
export const CATEGORY_TABS = [
  { id: "latest", label: "Latest Stories", category: "general" },
  { id: "think", label: "Think", category: "technology" },
  { id: "health", label: "Health", category: "health" },
];


export const DETAIL_TAGS = ["WATCH", "LIVE", "FREEBIE", "TRENDING"];

const STORAGE_KEY = "nbc-articles";
const MAX_SAVED = 100;

// URL-dən sabit id yaradır (detay səhifəsinin ünvanı üçün)
export function makeId(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash * 31 + url.charCodeAt(i)) % 1000000007;
  }
  return String(hash);
}

// "2 hours ago" kimi vaxt
function timeAgo(isoDate) {
  if (!isoDate) return "";
  const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

// NewsAPI mətnin sonundakı "[+123 chars]" hissəsini silir
function cleanText(text) {
  return (text || "").replace(/\s*\[\+\d+ chars\]\s*$/, "").trim();
}

// Oxuma müddəti (təxmini: dəqiqədə 200 söz)
function readTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))}min read`;
}

// NewsAPI xəbərini saytın formatına çevirir
export function normalizeArticle(raw, category) {
  const description = cleanText(raw.description);
  const content = cleanText(raw.content);
  const source = raw.source?.name || "NewsAPI";

  return {
    id: makeId(raw.url),
    url: raw.url,
    title: raw.title,
    description,
    content,
    image: raw.urlToImage || PLACEHOLDER_IMAGE,
    source,
    author: raw.author || source,
    time: timeAgo(raw.publishedAt),
    readTime: readTime(`${description} ${content}`),
    category,
  };
}

// Xəbərləri brauzerdə saxlayır ki, detay səhifəsi açıla bilsin
export function saveArticles(list) {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const others = stored.filter((item) => !list.some((article) => article.id === item.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...others, ...list].slice(-MAX_SAVED)));
}

// id-yə görə saxlanmış xəbəri tapır
export function findArticle(id) {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return stored.find((item) => item.id === id) || null;
}
