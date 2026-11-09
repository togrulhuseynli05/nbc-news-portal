import { useEffect, useState } from "react";


const KEY = "sv_bookmarks";

function readList() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export default function useBookmark() {
  const [list, setList] = useState(readList);

  useEffect(() => {
    const refresh = () => setList(readList());
    window.addEventListener("bookmarks-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("bookmarks-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const isSaved = (id) => list.includes(id);


  const toggle = (id) => {
    const current = readList();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("bookmarks-changed"));
  };

  return { isSaved, toggle };
}
