import { useEffect, useRef, useState } from "react";
import { useAsync } from "./useAsync.js";
import { fetchNews } from "../services/newsService.js";


// Komponent açılanda 1-ci səhifə gəlir. loadMore növbəti səhifəni əlavə edir.
export default function useNews({ category = "", query = "", sortBy = "", pageSize = 4 } = {}) {
  const { execute, isLoading, error } = useAsync(fetchNews);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isDone, setIsDone] = useState(false); // ilk yükləmə bitibmi
  const loadedPages = useRef(0);               // neçənci səhifəyə qədər yüklənib
  const isBusy = useRef(false);                // hal-hazırda sorğu gedirmi


  function loadPage(page) {
    isBusy.current = true;
    return execute({ category, query, sortBy, pageSize, page })
      .then((result) => {
        setArticles((prev) => (page === 1 ? result.articles : [...prev, ...result.articles]));
        setTotalResults(result.totalResults);
        loadedPages.current = page;
      })
      .finally(() => {
        isBusy.current = false;
        setIsDone(true);
      });
  }

  // Komponent açılanda 1-ci səhifə
  useEffect(() => {
    loadPage(1).catch(() => {});
  }, []);

  // VIEW MORE
  function loadMore() {
    if (isBusy.current) return;
    loadPage(loadedPages.current + 1).catch(() => {});
  }

  return {
    articles,
    totalResults,
    loading: isLoading || !isDone,
    error,
    loadMore,
  };
}
