import { Link } from 'react-router-dom';
import { navLinks } from '../lib/siteConfig.js';
import MaskIcon from './MaskIcon.jsx';


function Navbar() {

  const handleCategoryClick = (event) => event.preventDefault();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo-link" aria-label="Ana səhifə">
          <img className="navbar__logo" src="images/logo.png" alt="NBC News" />
        </Link>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <a key={link.id} href="#" className="navbar__link" onClick={handleCategoryClick}>
              {link.isLive && <span className="navbar__dot" />}
              {link.title}
            </a>
          ))}
          <img className="navbar__more" src="icons/chevron.svg" alt="" />
        </nav>

        <div className="navbar__icons">
          <button type="button" className="icon-btn" aria-label="Profil">
            <MaskIcon src="icons/user.svg" />
          </button>
          <button type="button" className="icon-btn" aria-label="Axtar">
            <MaskIcon src="icons/search.svg" />
          </button>
          <button type="button" className="icon-btn" aria-label="Menyu">
            <MaskIcon src="icons/menu.svg" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
