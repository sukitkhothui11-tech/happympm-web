import React from "react";
import "./footer.css";
import { FaTiktok, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = ({ language, t }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Left - Company Info */}
          <div className="footer-section footer-company">
            <h3 className="footer-logo">HAPPY MPM</h3>
            <p className="footer-company-name">Happy MPM Head Office</p>
            <p className="footer-address">
              3J/30 Noble House Phayathai Building, Phayathai Road, Thanon Phayathai Subistricts, Ratchathewi District, Bangkok 10400
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">{t.footer.quickLinks}</h4>
            <ul className="footer-links">
              <li><a href="#about">{t.footer.aboutCompany}</a></li>
              <li><a href="#join-business">{t.joinBusiness.title}</a></li>
              <li><a href="#news-articles">{t.newsArticles.title}</a></li>
              <li><a href="#">{t.footer.faq}</a></li>
              <li><a href="#contact-us">{t.contactUs.title}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">{t.footer.support}</h4>
            <ul className="footer-links">
              <li><a href="#">{t.footer.privacy}</a></li>
              <li><a href="#">{t.footer.terms}</a></li>
              <li><a href="#">{t.footer.faq}</a></li>
              <li><a href="#">{t.footer.contactSupport}</a></li>
              <li><a href="#">{t.footer.branches}</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4 className="footer-title">{t.footer.productsFooter}</h4>
            <ul className="footer-links">
              <li><a href="#products">{t.products.pollitin}</a></li>
              <li><a href="#products">{t.products.healthWellness}</a></li>
              <li><a href="#products">{t.products.beautyBody}</a></li>
              <li><a href="#products">{t.products.onlineMembership}</a></li>
              <li><a href="#products">{t.products.agriculture}</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section footer-social">
            <div className="social-icons-footer">
              <a href="#" className="social-icon-footer" title="TikTok">
                <FaTiktok size={24} />
              </a>
              <a href="#" className="social-icon-footer" title="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="social-icon-footer" title="YouTube">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="social-icon-footer" title="Instagram">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
