import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';


function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main className="not-found">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Səhifə tapılmadı</h1>
        <p className="not-found__text">Axtardığınız xəbər mövcud deyil və ya link səhvdir.</p>
        <Link to="/" className="btn-red">ANA SƏHİFƏYƏ QAYIT</Link>
      </main>

      <Footer />
    </>
  );
}

export default NotFoundPage;
