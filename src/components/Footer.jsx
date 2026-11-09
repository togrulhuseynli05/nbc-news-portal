import {
  footerLogo,
  footerLegalLinks,
  footerCompanyLinks,
  socialLinks,
  copyrightText,
} from '../lib/siteConfig.js';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <img className="footer__logo" src={footerLogo} alt="NBC News" />
          <p className="footer__copy">{copyrightText}</p>
        </div>

        <div className="footer__list">
          {footerLegalLinks.map((link) => (
            <a key={link.id} href="#">{link.title}</a>
          ))}
        </div>

        <div className="footer__list">
          {footerCompanyLinks.map((link) => (
            <a key={link.id} href="#">{link.title}</a>
          ))}
        </div>

        <div className="footer__social">
          {socialLinks.map((item) => (
            <a key={item.id} href="#" aria-label={item.name}>
              <img src={item.icon} alt={item.name} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
