import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./awardsDetail.css";

const AwardsDetail = ({ language = "th", t, setCurrentPage, setLanguage, setBusinessToolId }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [desktopBusinessOpen, setDesktopBusinessOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
    setMobileBusinessOpen(false);
  };

  const handleBackToAbout = () => {
    setCurrentPage("about");
    // Scroll to awards section after a small delay to ensure page renders
    setTimeout(() => {
      const awardsSection = document.querySelector(".about-awards");
      if (awardsSection) {
        awardsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="awards-detail-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left-links">
            <a href="#join-business" onClick={(e) => { e.preventDefault(); document.getElementById('join-business')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.startBusiness}</a>
            <a href="#promotions" onClick={(e) => { e.preventDefault(); document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.memberBenefits}</a>
            <a href="#contact-us" onClick={(e) => { e.preventDefault(); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.contact}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.topBar.about}</a>
          </div>
          <div className="top-right-info">
            <span>{t.topBar.email} info@happympm.com</span>
            <span>{t.topBar.phone} 02-642-5425</span>
            <div className="lang-dropdown-container">
              <button 
                className="lang-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
              >
                {language === "th" ? "TH" : "EN"} ▾
              </button>
              {langDropdownOpen && (
                <div 
                  className="lang-dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="lang-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage("th");
                      setLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.th}
                  </button>
                  <button
                    className="lang-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage("en");
                      setLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.en}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="main-nav">
        <div className="container nav-inner">
          <div className="nav-left-group">
            <div className="nav-logo" onClick={() => setCurrentPage("home")}>HAPPY MPM</div>

            {/* DESKTOP MENU */}
            <nav className="nav-center">
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}>
                {t.nav.home}
              </a>

              <div 
                className={`nav-dropdown ${desktopProductOpen ? "is-open" : ""}`}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    setDesktopProductOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    setDesktopProductOpen(false);
                  }
                }}
              >
                <button 
                  className="nav-link nav-link-button"
                  onClick={(e) => {
                    if (!window.matchMedia("(hover: hover)").matches) {
                      e.preventDefault();
                      setDesktopProductOpen(!desktopProductOpen);
                    }
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDesktopProductOpen(!desktopProductOpen);
                  }}
                >
                  {t.nav.product}▾
                </button>
                <div 
                  className="nav-dropdown-menu"
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setDesktopProductOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setDesktopProductOpen(false);
                    }
                  }}
                >
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.pollitin}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.healthWellness}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.beautyBody}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.onlineMembership}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.agriculture}</a>
                </div>
              </div>

              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "news-articles"); setCurrentPage("home"); }}>
                {t.nav.news}
              </a>

              <div 
                className={`nav-dropdown ${desktopBusinessOpen ? "is-open" : ""}`}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    setDesktopBusinessOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    setDesktopBusinessOpen(false);
                  }
                }}
              >
                <button 
                  className="nav-link nav-link-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sessionStorage.setItem("scrollToSection", "business-tools");
                    setCurrentPage("home");
                  }}
                >
                  {t.nav.businessperson}▾
                </button>
                <div 
                  className="nav-dropdown-menu"
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setDesktopBusinessOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setDesktopBusinessOpen(false);
                    }
                  }}
                >
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(1); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.businessPlan}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(2); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.onlineMarketing}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setCurrentPage("calendarOfEvents"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.calendar}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(4); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.promotions}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(5); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.lectureGuide}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(6); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.travelRewards}</a>
                </div>
              </div>

              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "contact-us"); setCurrentPage("home"); }}>
                {t.nav.contactUs}
              </a>
            </nav>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="nav-right">
            <a href="https://www.happympm.com/EROOM/form-login.php" target="_blank" rel="noopener noreferrer" className="btn-outline">{t.nav.onClassroom}</a>
            <a href="https://www.myhmpm.com/member/index.php" target="_blank" rel="noopener noreferrer" className="btn-solid">{t.nav.logIn}</a>
          </div>

          {/* HAMBURGER (MOBILE ONLY) */}
          <button
            className="hamburger-menu"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div className={`mobile-nav-backdrop ${mobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-panel">
          <div className="mobile-lang-bar">
            <div className="mobile-lang-dropdown-container">
              <button 
                className="mobile-lang-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileLangDropdownOpen(!mobileLangDropdownOpen);
                }}
              >
                {language === "th" ? "TH" : "EN"} ▾
              </button>
              {mobileLangDropdownOpen && (
                <div className="mobile-lang-dropdown-menu">
                  <button
                    className="mobile-lang-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage("th");
                      setMobileLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.th}
                  </button>
                  <button
                    className="mobile-lang-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage("en");
                      setMobileLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.en}
                  </button>
                </div>
              )}
            </div>
            <button
              className="mobile-close-btn"
              onClick={() => closeMobileMenu()}
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav-menu">
            <button 
              className="mobile-link mobile-link-active"
              onClick={() => { closeMobileMenu(); setCurrentPage("home"); }}
            >
              {t.mobile.home}
            </button>

            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => setMobileProductOpen((prev) => !prev)}
              >
                {t.mobile.product} ▾
              </button>
              {mobileProductOpen && (
                <div className="mobile-dropdown-menu">
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.pollitin}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.healthWellness}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.beautyBody}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.onlineMembership}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.agriculture}</a>
                </div>
              )}
            </div>

            <button 
              className="mobile-link"
              onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "news-articles"); setCurrentPage("home"); }}
            >
              {t.mobile.news}
            </button>

            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => {
                  if (mobileBusinessOpen) {
                    closeMobileMenu();
                    sessionStorage.setItem("scrollToSection", "business-tools");
                    setCurrentPage("home");
                  } else {
                    setMobileBusinessOpen(true);
                  }
                }}
              >
                {t.mobile.businessperson} ▾
              </button>
              {mobileBusinessOpen && (
                <div className="mobile-dropdown-menu">
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setBusinessToolId(1); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.businessPlan}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setBusinessToolId(2); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.onlineMarketing}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setCurrentPage("calendarOfEvents"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.calendar}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setBusinessToolId(4); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.promotions}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setBusinessToolId(5); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.lectureGuide}</a>
                  <a href="#" className="mobile-dropdown-item" onClick={(e) => { e.preventDefault(); closeMobileMenu(); setBusinessToolId(6); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.travelRewards}</a>
                </div>
              )}
            </div>

            <button 
              className="mobile-link"
              onClick={() => { closeMobileMenu(); setCurrentPage("home"); }}
            >
              {t.mobile.contactUs}
            </button>
          </nav>
        </div>
      </div>

      {/* AWARDS DETAIL CONTENT */}
      <main className="awards-detail-content">
        <section className="awards-detail-hero">
          <div className="container">
            <h1 className="awards-detail-title">Our Awards</h1>
            <p className="awards-detail-subtitle">Recognition of our commitment to excellence and quality</p>
          </div>
        </section>

        {/* About Section */}
        <section className="awards-detail-about">
          <div className="container">
            <h2 className="awards-detail-section-title">Our Journey Since 1999</h2>
            <div className="awards-detail-text-box">
              <p className="awards-detail-text">
                <strong>Founded on June 10, 1999</strong> by Mr. Sukit Satperisaprai, Happy MPM Co., Ltd. was built on a vision to deliver <strong>high-quality natural products</strong> and bring effective network marketing to ASEAN.
              </p>
              <p className="awards-detail-text">
                We specialize in carefully selected, <strong>internationally certified products</strong> with emphasis on holistic health care. Our <strong>binary compensation system</strong> creates unlimited income opportunities for business owners.
              </p>
              <p className="awards-detail-text">
                <strong>Legally registered</strong> with the Office of the Consumer Protection Board (OCPB) and member of the Thailand Direct Selling Association (TDIA), we're committed to sustainable success and consumer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Award */}
        <section className="awards-detail-featured">
          <div className="container">
            <div className="awards-detail-featured-content">
              <div className="awards-detail-featured-image">
                <img src="/images/44887_1668913446_87959 (1).jpg" alt="Featured Award" />
              </div>
              <div className="awards-detail-featured-text">
                <h3 className="awards-detail-featured-title">Outstanding Product Innovation</h3>
                <p className="awards-detail-featured-description">
                  Our <strong>Sernitin product group</strong> received the <strong>"Outstanding Product in Innovation"</strong> award from Thailand's Smart Awards on Channel 5, presented by the Director-General of the Department of Business Development, Ministry of Commerce.
                </p>
                <p className="awards-detail-featured-description">
                  Happy MPM's health products are sourced from <strong>100% natural ingredients</strong> with <strong>international quality certifications</strong> from world-renowned research institutes. We're known globally for our excellence and natural product innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Grid */}
        <section className="awards-detail-grid">
          <div className="container">
            <h2 className="awards-detail-section-title">Our Major Awards & Recognition</h2>
            
            <div className="awards-grid">
              {/* Award 1 */}
              <div className="awards-grid-item">
                <div className="awards-grid-icon">🏆</div>
                <h3 className="awards-grid-title">Outstanding Business Product Award</h3>
                <p className="awards-grid-description">
                  Our company has been certified by the (S.S.T.) as a company that has developed and produced the highest quality products with international standards.
                </p>
              </div>

              {/* Award 2 */}
              <div className="awards-grid-item">
                <div className="awards-grid-icon">⭐</div>
                <h3 className="awards-grid-title">Outstanding Executive Award</h3>
                <p className="awards-grid-description">
                  Recognized by Thai Route Magazine for our systematic management approach in both product sales and consumer returns, guaranteeing the quality of our company's operations.
                </p>
              </div>

              {/* Award 3 */}
              <div className="awards-grid-item">
                <div className="awards-grid-icon">🌱</div>
                <h3 className="awards-grid-title">Outstanding Person of the Year</h3>
                <p className="awards-grid-description">
                  Award from the Thai Cabinet for promoting sustainable agriculture projects. We produce products using natural raw materials and take care of nature for future generations.
                </p>
              </div>

              {/* Award 4 */}
              <div className="awards-grid-item">
                <div className="awards-grid-icon">🌟</div>
                <h3 className="awards-grid-title">Golden Bell Award</h3>
                <p className="awards-grid-description">
                  Outstanding Contribution to Society and the Nation. We manufacture products using only natural ingredients and regularly conduct CSR projects for society and the nation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="awards-detail-closing">
          <div className="container">
            <p className="awards-detail-closing-text">
              With our <strong>experienced management, clear vision, premium products,</strong> and <strong>proven marketing strategies,</strong> Happy MPM leads entrepreneurs to <strong>success, better lifestyle,</strong> and <strong>sustainable growth.</strong>
            </p>
            <p className="awards-detail-closing-note">
              These are our main awards. We also hold many other certifications from various agencies that recognize our products and management excellence.
            </p>
            <button 
              className="awards-detail-back-button"
              onClick={handleBackToAbout}
            >
              ← Back to About
            </button>
          </div>
        </section>
      </main>

      <Footer t={t} language={language} />
    </div>
  );
};

export default AwardsDetail;
