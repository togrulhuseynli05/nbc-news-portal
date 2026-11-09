import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
