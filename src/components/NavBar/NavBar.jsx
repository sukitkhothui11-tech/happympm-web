import React, { useState } from "react";

const NavBar = ({ language, t, setCurrentPage, setLanguage, setBusinessToolId }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [desktopBusinessOpen, setDesktopBusinessOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
    setMobileBusinessOpen(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left-links">
            <a href="#join-business" onClick={(e) => { e.preventDefault(); }}>{t.topBar.startBusiness}</a>
            <a href="#promotions" onClick={(e) => { e.preventDefault(); }}>{t.topBar.memberBenefits}</a>
            <a href="#contact-us" onClick={(e) => { e.preventDefault(); }}>{t.topBar.contact}</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.topBar.about}</a>
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
            <div className="nav-logo">HAPPY MPM</div>

            {/* DESKTOP MENU */}
            <nav className="nav-center">
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                >
                  {t.nav.product}▾
                </button>
                <div className="nav-dropdown-menu">
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.pollitin}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.healthWellness}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.beautyBody}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.onlineMembership}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); setDesktopProductOpen(false); }}>{t.products.agriculture}</a>
                </div>
              </div>

              <a href="#news-articles" className="nav-link" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "news-articles"); setCurrentPage("home"); }}>
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
                    // Navigate to business tools detail page with default tool
                    setBusinessToolId(1);
                    setCurrentPage("businessToolDetail");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {t.nav.businessperson}▾
                </button>
                <div className="nav-dropdown-menu">
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setBusinessToolId(1); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.businessPlan}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setBusinessToolId(2); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.onlineMarketing}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setCurrentPage("calendarOfEvents"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.calendar}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setBusinessToolId(4); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.promotions}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setBusinessToolId(5); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.lectureGuide}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setBusinessToolId(6); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.travelRewards}</a>
                </div>
              </div>
              
              <a href="#contact-us" className="nav-link" onClick={(e) => { e.preventDefault(); sessionStorage.setItem("scrollToSection", "contact-us"); setCurrentPage("home"); }}>
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

      {/* MOBILE MENU */}
      <div className={`mobile-nav-backdrop ${mobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-panel">
          <div className="mobile-lang-bar">
            <div className="mobile-lang-dropdown-container">
              <button 
                className="mobile-lang"
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
                    onClick={() => {
                      setLanguage("th");
                      setMobileLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.th}
                  </button>
                  <button
                    className="mobile-lang-dropdown-item"
                    onClick={() => {
                      setLanguage("en");
                      setMobileLangDropdownOpen(false);
                    }}
                  >
                    {t.lang.en}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mobile-menu-header">
            <span className="nav-logo-mobile">HAPPY MPM</span>
            <button
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              ×
            </button>
          </div>

          <nav className="mobile-nav-list">
            <button 
              className="mobile-link"
              onClick={() => { closeMobileMenu(); setCurrentPage("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              {t.mobile.homePage}
            </button>

            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
              >
                {t.mobile.product} ▾
              </button>
              <div className={`mobile-dropdown-menu ${mobileProductOpen ? "open" : ""}`}>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.pollitin}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.healthWellness}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.beautyBody}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.onlineMembership}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "products"); setCurrentPage("home"); }}>{t.products.agriculture}</button>
              </div>
            </div>

            <button className="mobile-link" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "news-articles"); setCurrentPage("home"); }}>{t.mobile.newsArticles}</button>

            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => {
                  // If dropdown is already open, navigate to businessToolDetail page
                  if (mobileBusinessOpen) {
                    closeMobileMenu();
                    setBusinessToolId(1);
                    setCurrentPage("businessToolDetail");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setMobileBusinessOpen(true);
                  }
                }}
              >
                {t.mobile.businessperson} ▾
              </button>
              <div className={`mobile-dropdown-menu ${mobileBusinessOpen ? "open" : ""}`}>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(1); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.businessPlan}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(2); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.onlineMarketing}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setCurrentPage("calendarOfEvents"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.calendar}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(4); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.promotions}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(5); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.lectureGuide}</button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(6); setCurrentPage("businessToolDetail"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.travelRewards}</button>
              </div>
            </div>

            <button className="mobile-link" onClick={() => { closeMobileMenu(); sessionStorage.setItem("scrollToSection", "contact-us"); setCurrentPage("home"); }}>{t.mobile.contactUs}</button>
          </nav>

          <div className="mobile-menu-footer">
            <a href="https://www.happympm.com/EROOM/form-login.php" target="_blank" rel="noopener noreferrer" className="btn-outline-mobile">{t.nav.onClassroom}</a>
            <a href="https://www.myhmpm.com/member/index.php" target="_blank" rel="noopener noreferrer" className="btn-solid-mobile">{t.nav.logIn}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
