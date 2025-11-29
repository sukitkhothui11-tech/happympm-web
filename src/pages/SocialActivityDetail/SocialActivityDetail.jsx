import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./socialActivityDetail.css";

const SocialActivityDetail = ({ activity = 1, language = "th", t, setCurrentPage, setLanguage, setSocialActivityId, setBusinessToolId }) => {
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
    setTimeout(() => {
      const socialActivitiesSection = document.querySelector(".about-social-activities");
      if (socialActivitiesSection) {
        socialActivitiesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Activity content
  const activityContent = {
    1: {
      title: "Building the Road to Ban Kut Nam Sai School",
      heroSubtitle: "Donating Funds for Educational Infrastructure",
      mainTitle: "Happy MPM joins in donating funds to build the entrance road to Ban Kut Nam Sai School, Sakon Nakhon Province",
      description1: "Happy MPM Co., Ltd. continues to contribute to society (CSR) with the project \"Fulfilling Dreams, Sharing Kindness to Children\" by donating 150,000 baht to build a road entrance to Ban Kut Nam Sai School, Sakon Nakhon Province, led by Mr. Naphawat Satphetprai, Chief Operating Officer, and a team of businessmen from Happy MPM Sakon Nakhon branch.",
      details: [
        "Project: Fulfilling Dreams, Sharing Kindness to Children",
        "Donation Amount: 150,000 baht",
        "Location: Ban Kut Nam Sai School, Sakon Nakhon Province",
        "Led by: Mr. Naphawat Satphetprai, Chief Operating Officer",
        "Objective: Building entrance road infrastructure for better school access"
      ],
      closing: "This CSR initiative demonstrates Happy MPM's commitment to supporting education and improving quality of life for communities."
    },
    2: {
      title: "Cultivate Ideas, Embrace Knowledge",
      heroSubtitle: "Supporting Education and Scholarship Programs",
      mainTitle: "Happy MPM continues to give back to society with the CSR project \"Cultivate Ideas, Embrace Knowledge\"",
      description1: "Happy MPM continues to give back to society with a CSR project called \"Planting Ideas, Embracing Knowledge,\" aiming to ignite light in darkness and create life opportunities for developing knowledge potential. Held on Thursday, June 27th, at Thamikawittayaram School under the Royal Patronage in Phetchaburi Province, the event raised over 210,000 baht for scholarships and donations from Happy MPM businesspeople.",
      details: [
        "Project: Planting Ideas, Embracing Knowledge",
        "Date: Thursday, June 27th",
        "Location: Thamikawittayaram School under Royal Patronage, Phetchaburi Province",
        "Funds Raised: Over 210,000 baht",
        "Purpose: Scholarships and educational support for underprivileged students",
        "Objective: Create opportunities to develop knowledge potential"
      ],
      closing: "This scholarship program reflects Happy MPM's belief in education as a pathway to brighter futures for Thailand's youth."
    },
    3: {
      title: "Helping Flood Victims in Ubon Ratchathani",
      heroSubtitle: "Emergency Relief and Community Support",
      mainTitle: "Happy MPM joins in helping flood victims in Ubon Ratchathani",
      description1: "Happy MPM Co., Ltd., led by Mr. Sukit and Ms. Araya Satperisaprai, Chairman and Vice Chairman, Mr. Noppawit Satperisaprai, Chief Marketing Officer, Mr. Napawat Satperisaprai, Chief Operating Officer, and executives, donated funds to assist flood victims. On Thursday, September 26th, Happy MPM Co., Ltd., represented by Mr. Peerapong Langpute, led a group of businesspeople and employees to deliver relief funds to flood victims in Ubon Ratchathani Province. The donations, along with essential consumer goods, were used to alleviate their suffering.",
      details: [
        "Date: Thursday, September 26th",
        "Location: Ubon Ratchathani Province",
        "Leadership: Mr. Sukit & Ms. Araya Satperisaprai (Chairman & Vice Chairman)",
        "Represented by: Mr. Peerapong Langpute",
        "Relief Support: Funds and essential consumer goods",
        "Participants: Businesspeople and employees from Happy MPM"
      ],
      closing: "Happy MPM's swift response to natural disasters demonstrates our commitment to community resilience and mutual support during times of crisis."
    },
    4: {
      title: "Supporting the Thai Archery Association for the Disabled",
      heroSubtitle: "Empowering Athletes and Community Support",
      mainTitle: "Happy MPM Co., Ltd. supports the Thai Archery Association for the Disabled",
      description1: "On September 13th, Happy MPM Co., Ltd., led by Mr. Naphawat Satperisaprai, Chief Operating Officer, reaffirmed its commitment to returning happiness to society by donating 734,100 baht (seven hundred thirty-four thousand one hundred baht) to the Sports Association for the Disabled of Thailand under Royal Patronage. The donation was received by Colonel Prayut Niramitranon, Vice President of the Sports Association for the Disabled of Thailand under Royal Patronage and President of the Archery Association for the Disabled of Thailand. The donation aims to support archery for the disabled and prepare a team to compete in the 10th ASEAN Para Games in the Philippines.",
      details: [
        "Date: September 13th",
        "Donation Amount: 734,100 baht",
        "Recipient: Sports Association for the Disabled of Thailand (under Royal Patronage)",
        "Led by: Mr. Naphawat Satperisaprai, Chief Operating Officer",
        "Received by: Colonel Prayut Niramitranon, Vice President",
        "Purpose: Supporting archery programs and ASEAN Para Games preparation"
      ],
      closing: "This donation showcases Happy MPM's dedication to empowering people with disabilities and supporting Thailand's para-sports development."
    }
  };

  const content = activityContent[activity] || activityContent[1];

  return (
    <div className="social-activity-detail-page">
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

      {/* SOCIAL ACTIVITY DETAIL CONTENT */}
      <main className="social-activity-detail-content">
        {/* Hero Section */}
        <section className="social-activity-detail-hero">
          <div className="container">
            <h1 className="social-activity-detail-title">{content.title}</h1>
            <p className="social-activity-detail-subtitle">{content.heroSubtitle}</p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="social-activity-detail-main">
          <div className="container">
            <h2 className="social-activity-detail-main-title">{content.mainTitle}</h2>
            
            <div className="social-activity-detail-image">
              <img src="/images/8100_1643603010_65984 (1).jpg" alt="Social Activity" />
            </div>

            <p className="social-activity-detail-description">
              {content.description1}
            </p>
          </div>
        </section>

        {/* Details Section */}
        <section className="social-activity-detail-info">
          <div className="container">
            <h2 className="social-activity-detail-info-title">Activity Details</h2>
            
            <div className="social-activity-detail-list">
              {content.details.map((detail, index) => (
                <div key={index} className="social-activity-detail-item">
                  <span className="social-activity-detail-icon">✓</span>
                  <p className="social-activity-detail-text">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="social-activity-detail-closing">
          <div className="container">
            <p className="social-activity-detail-closing-text">
              {content.closing}
            </p>
            <button 
              className="social-activity-detail-back-button"
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

export default SocialActivityDetail;
