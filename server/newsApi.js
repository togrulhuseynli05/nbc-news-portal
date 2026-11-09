const NEWS_API_URL = "https://newsapi.org/v2";
const CACHE_MS = 10 * 60 * 1000; // 10 dəqiqə eyni sorğunu yadda saxla

export function createNewsApiMiddleware(apiKey, baseUrl = NEWS_API_URL) {
  const cache = new Map();

  return async function newsApiMiddleware(req, res, next) {
    if (!req.url.startsWith("/api/news")) {
      return next();
    }

    function send(status, body) {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    }

    if (!apiKey) {
      return send(500, { message: "NEWS_API_KEY tapılmadı. .env.local faylını yoxlayın." });
    }

    const params = new URL(req.url, "http://localhost").searchParams;
    const q = params.get("q");
    const category = params.get("category");

    // Ortaq parametrlər
    const query = new URLSearchParams({
      page: params.get("page") || "1",
      pageSize: params.get("pageSize") || "4",
    });

    // q varsa axtarış, yoxdursa baş xəbərlər
    let url;
    if (q) {
      query.set("q", q);
      query.set("language", "en");
      query.set("sortBy", params.get("sortBy") || "publishedAt");
      url = `${baseUrl}/everything?${query}`;
    } else {
      query.set("country", "us");
      if (category) query.set("category", category);
      url = `${baseUrl}/top-headlines?${query}`;
    }

    // Cache-də varsa, birbaşa oradan cavab ver
    const cached = cache.get(url);
    if (cached && Date.now() - cached.time < CACHE_MS) {
      return send(200, cached.data);
    }

    try {
      const response = await fetch(url, { headers: { "X-Api-Key": apiKey } });
      const data = await response.json();

      if (!response.ok) {
        return send(response.status, { message: data.message || "NewsAPI xətası" });
      }

      const result = { totalResults: data.totalResults, articles: data.articles };
      cache.set(url, { time: Date.now(), data: result });
      return send(200, result);
    } catch {
      return send(502, { message: "NewsAPI-yə qoşulmaq mümkün olmadı." });
    }
  };
}
