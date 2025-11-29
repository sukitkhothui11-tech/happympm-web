import React, { useState, useRef } from "react";
import Footer from "../../components/Footer/Footer";
import "./about.css";

const About = ({ language = "th", t, setCurrentPage, setLanguage, setSocialActivityId, setBusinessToolId }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [desktopBusinessOpen, setDesktopBusinessOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [joinBusinessScrolled, setJoinBusinessScrolled] = useState(false);
  const [activeJoinBusinessDot, setActiveJoinBusinessDot] = useState(0);
  const joinBusinessRowRef = useRef(null);

  const carouselImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg"
  ];

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
    setMobileBusinessOpen(false);
  };

  const scrollJoinBusinessNext = () => {
    if (joinBusinessRowRef.current) {
      joinBusinessRowRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(() => {
        if (joinBusinessRowRef.current) {
          const scrollLeft = joinBusinessRowRef.current.scrollLeft;
          const scrollWidth = joinBusinessRowRef.current.scrollWidth;
          const clientWidth = joinBusinessRowRef.current.clientWidth;
          setActiveJoinBusinessDot(scrollLeft > scrollWidth / 2 - clientWidth / 2 ? 1 : 0);
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            setJoinBusinessScrolled(true);
          }
        }
      }, 300);
    }
  };

  const scrollJoinBusinessPrev = () => {
    if (joinBusinessRowRef.current) {
      joinBusinessRowRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(() => {
        if (joinBusinessRowRef.current) {
          const scrollLeft = joinBusinessRowRef.current.scrollLeft;
          setActiveJoinBusinessDot(scrollLeft > 50 ? 1 : 0);
          if (scrollLeft <= 10) {
            setJoinBusinessScrolled(false);
          }
        }
      }, 300);
    }
  };

  const scrollJoinBusinessToSlide = (index) => {
    if (joinBusinessRowRef.current) {
      const cardWidth = joinBusinessRowRef.current.children[0].offsetWidth;
      joinBusinessRowRef.current.scrollBy({ left: (index * cardWidth * 2) - joinBusinessRowRef.current.scrollLeft, behavior: "smooth" });
      setActiveJoinBusinessDot(index);
    }
  };

  return (
    <div className="about-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left-links">
            <a href="#join-business" onClick={(e) => { e.preventDefault(); document.getElementById('join-business')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.startBusiness}</a>
            <a href="#promotions" onClick={(e) => { e.preventDefault(); document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.memberBenefits}</a>
            <a href="#contact-us" onClick={(e) => { e.preventDefault(); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.contact}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.topBar.about}</a>
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

      {/* ABOUT PAGE CONTENT */}
      <main className="about-content">
        
        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="about-hero-background">
            <img src="/images/about.jpg" alt="About Us Background" className="about-hero-img" />
          </div>
          <div className="about-hero-content">
            <h1 className="about-hero-title-top">About Us Happy MPM</h1>
            <div className="container about-hero-inner">
              <div className="about-hero-left">
                <div className="about-hero-video">
                  <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube-nocookie.com/embed/v0opxNPCgP4?si=kYc30K8pVuD3oCTz" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
              <div className="about-hero-right">
                <p className="about-hero-subtitle">
                  A vision of the future, inspired by the past, for our businesspeople.
                </p>
                <p className="about-hero-description">
                  A vision for the future, inspired by the past, for our members. Continuity and stability are the heart of our business development. With branches nationwide and a support system that's there for every stage, whether starting out or expanding, dealing in formal competition, these are what our partners are the confidence and courage to move forward. Happy MPM has developed a business structure that supports gradual growth, with quality and sustainability in the future. We are committed to the sustainable development of our entrepreneurs, whether starting small or large, we're here to ensure that you and your children can grow with quality and sustainability in the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 - YOUR BETTER BUSINESS */}
        <section className="about-section">
          <div className="container about-section-inner">
            <div className="about-section-left">
              <h2 className="about-section-title">Happy MPM</h2>
              <p className="about-section-subtitle">Your Better Business, Your Better Partner.</p>
              <p className="about-section-description">
                We're a Better Business & Better Partner. With nearly three decades of experience, Happy MPM understands every shift in the world, from analog to digital, and now fully entering the AI era. We support your stable growth with cutting-edge tools and a team ready to support you. We never stop developing, whether you're starting, building, or expanding your business, we're always here for you.
              </p>
            </div>
            <div className="about-section-right">
              <div className="about-section-video">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube-nocookie.com/embed/VdnHNnMdhnw?si=exc5iJbYYXRsbCkn" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - KNOW OUR HISTORY */}
        <section className="about-history">
          <div className="container about-history-inner">
            <h2 className="about-history-title">Know our hisyory</h2>
            
            <div className="about-history-content">
              {/* LEFT - IMAGE */}
              <div className="about-history-left">
                <img src="/images/32637_1754997515_16828 (1).jpg" alt="Heritage of Heart" className="about-history-image" />
              </div>

              {/* RIGHT - TEXT AND VIDEOS */}
              <div className="about-history-right">
                {/* SECTION 1 */}
                <div className="about-history-section">
                  <h3 className="about-history-heading">Heritage of Heart, Power for the Future</h3>
                  <p className="about-history-label">Inherited Values from the Heart for the Power of the Future</p>
                  <p className="about-history-text">
                    Every company has a starting point, but not every company can endure and grow for more than two decades like Happy MPM. Behind every step forward is the "heart", the heart of the two founders who dared to walk on a day when no one saw the future. Heart's filled with faith, hope, and the determination to change people's lives for the better.
                  </p>
                  <p className="about-history-text">
                    The journey was not smooth. There were obstacles, disappointment, and countless tests. Each step taken became a lesson. Each obstacle overcome became a foundation. And today, those lessons have become a gift for the next generation.
                  </p>
                  <p className="about-history-text">
                    We are not just passing on a business, but we are passing on "value" that will transcend time.
                  </p>
                </div>

                {/* VIDEO 1 */}
                <div className="about-history-video">
                  <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube-nocookie.com/embed/KQcD-eteHns?si=3dmJYzp3yKqL78nD" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                  </iframe>
                </div>

                {/* SECTION 2 */}
                <div className="about-history-section">
                  <h3 className="about-history-heading">Founder Story</h3>
                  <p className="about-history-label">Happy MPM - Through Every Storm, We Stand Strong Through every storm, we stand strong.</p>
                  <p className="about-history-text">
                    We have been through tough times, facing storm after storm, to the point where many people wondered if we would make it. But every time, we stand again, because we never walk alone. Everyone who has walked along the way is our greatest driving force. A generation of executives stands up to tell stories that have never been told.
                  </p>
                  <p className="about-history-text">
                    Not to show how far we have come, but to remind everyone that "This home... is still warm, stable, safe, and always ready to be by your side." Because for us, Happy MPM is not just a company, but it is your "last home" where you can confidently unfold your life... and your dreams.
                  </p>
                </div>

                {/* VIDEO 2 */}
                <div className="about-history-video">
                  <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube-nocookie.com/embed/25n6loiSgGg?si=QtrquBy-qQxODrC2" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - OUR AWARDS */}
        <section className="about-awards">
          <div className="container about-awards-inner">
            <h2 className="about-awards-title">Our Awards</h2>

            {/* AWARD 1 */}
            <div className="about-award-card">
              <div className="about-award-image">
                <img src="/images/44887_1668913446_87959 (1).jpg" alt="Award 2019" />
              </div>
              <div className="about-award-content">
                <h3 className="about-award-heading">The Quality Awards 2019 "Best Product Business Award 2019"</h3>
                <p className="about-award-text">
                  Happy Coffee wins the top quality award at the eee The Quality Awards 2019.
                </p>
                <p className="about-award-text">
                  <strong>"Best Product Business Award 2019"</strong>
                </p>
                <p className="about-award-text">
                  Mr. Noppawit Satperisaprai (CMO) and Mr. Noppawat Satperisaprai (COO) received the award from the ceremony's chairman, General Chittasak Charoensombat, advisor to the Committee on Commerce, Industry and Labor, National Legislative Assembly.
                </p>
              </div>
            </div>

            {/* AWARD 2 */}
            <div className="about-award-card">
              <div className="about-award-image">
                <img src="/images/44887_1668913446_87959 (1).jpg" alt="Award Founded" />
              </div>
              <div className="about-award-content">
                <h3 className="about-award-heading">Happy MPM Co., Ltd. was established on June 10, 1999.</h3>
                <p className="about-award-text">
                  Happy MPM Co., Ltd. was established on June 10, 1999, with Mr. Sukit Satperisaprai as Chairman and Managing Director. The company was founded on The Chairman and Executive Committee's unwavering commitment to offering quality and beneficial products, as well as the intention to bring effective network marketing to ASEAN. The company's policy is to focus on long-term business and to focus on developing high-quality products.
                </p>
                <button className="about-award-button" onClick={() => setCurrentPage("awardsDetail")}>More detail →</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - OUR VISION, MISSION, ULTIMATE GOALS */}
        <section className="about-vision-section">
          <div className="about-vision-header">
            <h2 className="about-vision-header-title">Our Vision, Mission, Ultimate Goals</h2>
          </div>

          {/* CAROUSEL */}
          <div className="about-carousel">
            <div className="about-carousel-container">
              <img 
                src={carouselImages[carouselIndex]} 
                alt={`Carousel ${carouselIndex + 1}`}
                className="about-carousel-image"
              />
            </div>

            {/* CAROUSEL CONTROLS */}
            <button 
              className="about-carousel-btn about-carousel-btn-prev"
              onClick={handlePrevCarousel}
              aria-label="Previous"
            >
              ‹
            </button>
            <button 
              className="about-carousel-btn about-carousel-btn-next"
              onClick={handleNextCarousel}
              aria-label="Next"
            >
              ›
            </button>

            {/* CAROUSEL DOTS */}
            <div className="about-carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`about-carousel-indicator ${index === carouselIndex ? "active" : ""}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - OUR SOCIAL ACTIVITIES */}
        <section className="about-social-activities">
          <div className="container">
            <h2 className="about-social-title">Our Social activities</h2>

            <div className="about-social-grid">
              {/* ACTIVITY 1 */}
              <div className="about-social-card">
                <div className="about-social-image">
                  <img src="/images/8100_1643603010_65984 (1).jpg" alt="Activity 1" />
                </div>
                <p className="about-social-description">
                  Happy MPM Co., Ltd. joins in donating funds to build the entrance road to Ban Kut Nan Sai School, Sakon Nakhon Province.
                </p>
                <button className="about-social-button" onClick={() => { window.scrollTo(0, 0); setTimeout(() => { setCurrentPage("socialActivityDetail"); setSocialActivityId(1); }, 0); }}>More detail →</button>
              </div>

              {/* ACTIVITY 2 */}
              <div className="about-social-card">
                <div className="about-social-image">
                  <img src="/images/8100_1643603010_65984 (1).jpg" alt="Activity 2" />
                </div>
                <p className="about-social-description">
                  Happy MPM continues to give back to society with the CSR project "Cultivate Ideas, Embrace Knowledge"
                </p>
                <button className="about-social-button" onClick={() => { window.scrollTo(0, 0); setTimeout(() => { setCurrentPage("socialActivityDetail"); setSocialActivityId(2); }, 0); }}>More detail →</button>
              </div>

              {/* ACTIVITY 3 */}
              <div className="about-social-card">
                <div className="about-social-image">
                  <img src="/images/8100_1643603010_65984 (1).jpg" alt="Activity 3" />
                </div>
                <p className="about-social-description">
                  Happy MPM joins in helping flood victims in Ubon Ratchathani, with donations of supplies and aid.
                </p>
                <button className="about-social-button" onClick={() => { window.scrollTo(0, 0); setTimeout(() => { setCurrentPage("socialActivityDetail"); setSocialActivityId(3); }, 0); }}>More detail →</button>
              </div>

              {/* ACTIVITY 4 */}
              <div className="about-social-card">
                <div className="about-social-image">
                  <img src="/images/8100_1643603010_65984 (1).jpg" alt="Activity 4" />
                </div>
                <p className="about-social-description">
                  Happy MPM Co., Ltd. supports the Thai Archery Association for the Disabled.
                </p>
                <button className="about-social-button" onClick={() => { window.scrollTo(0, 0); setTimeout(() => { setCurrentPage("socialActivityDetail"); setSocialActivityId(4); }, 0); }}>More detail →</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 - OUR EXECUTIVE COMMITTEE */}
        <section className="about-executive-section">
          <div className="container">
            <div className="about-executive-content">
              <h2 className="about-executive-title">Our Executive Committee</h2>
              <p className="about-executive-subtitle">The leadership team that drives our vision, strategy, and long-term growth.</p>
              <button 
                className="about-executive-button"
                onClick={() => { window.scrollTo(0, 0); setTimeout(() => { setCurrentPage("executiveDetail"); }, 0); }}
              >
                See all details here →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 8 - JOIN OUR BUSINESS */}
        <section className="join-business-section" id="join-business">
          <div className="container">
            <div className="join-business-header">
              <div className="join-business-title-wrapper">
                <h2 className="join-business-title">{t.joinBusiness.title}</h2>
                <p className="join-business-subtitle">{t.joinBusiness.subtitle}</p>
              </div>
              <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-view-all">{t.joinBusiness.viewAll}</a>
            </div>

            <div className="join-business-wrapper">
              {!joinBusinessScrolled && (
                <button
                  className="join-business-arrow join-business-arrow-next"
                  onClick={scrollJoinBusinessNext}
                  aria-label="Next"
                >
                  ❯
                </button>
              )}

              <div className="join-business-row" ref={joinBusinessRowRef}>
                {/* Card 1: Start Your Business */}
                <div className="join-business-card join-business-card-1">
                  <div className="join-business-card-image">
                    <img src="/join-business/start-business.jpg" alt="Start Your Business" />
                    <div className="join-business-image-overlay">
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</a>
                    </div>
                  </div>
                  <div className="join-business-card-content">
                    <div className="join-business-card-banner">{t.joinBusiness.card1.title}</div>
                    <p className="join-business-card-description">{t.joinBusiness.card1.description}</p>
                    <div className="join-business-card-footer">
                      <div className="join-business-card-availability">{t.joinBusiness.card1.availability}</div>
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-card-button">{t.joinBusiness.card1.button}</a>
                    </div>
                  </div>
                </div>

                {/* Card 2: New Member Registration */}
                <div className="join-business-card join-business-card-2">
                  <div className="join-business-card-image">
                    <img src="/join-business/new-member.jpg" alt="New Member Registration" />
                    <div className="join-business-image-overlay">
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</a>
                    </div>
                  </div>
                  <div className="join-business-card-content">
                    <div className="join-business-card-banner">{t.joinBusiness.card2.title}</div>
                    <p className="join-business-card-description">{t.joinBusiness.card2.description}</p>
                    <div className="join-business-card-footer">
                      <div className="join-business-card-availability">{t.joinBusiness.card2.validity}</div>
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-card-button">{t.joinBusiness.card2.button}</a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Starter Business Package */}
                <div className="join-business-card join-business-card-3">
                  <div className="join-business-card-image">
                    <img src="/join-business/starter-package.jpg" alt="Starter Business Package" />
                    <div className="join-business-image-overlay">
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</a>
                    </div>
                  </div>
                  <div className="join-business-card-content">
                    <div className="join-business-card-banner">{t.joinBusiness.card3.title}</div>
                    <p className="join-business-card-description">{t.joinBusiness.card3.description}</p>
                    <div className="join-business-card-footer">
                      <div className="join-business-card-availability">{t.joinBusiness.card3.availability}</div>
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-card-button">{t.joinBusiness.card3.button}</a>
                    </div>
                  </div>
                </div>

                {/* Card 4: Business Growth Program */}
                <div className="join-business-card join-business-card-4">
                  <div className="join-business-card-image">
                    <img src="/join-business/growth-program.jpg" alt="Business Growth Program" />
                    <div className="join-business-image-overlay">
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</a>
                    </div>
                  </div>
                  <div className="join-business-card-content">
                    <div className="join-business-card-banner">{t.joinBusiness.card4.title}</div>
                    <p className="join-business-card-description">{t.joinBusiness.card4.description}</p>
                    <div className="join-business-card-footer">
                      <div className="join-business-card-availability">{t.joinBusiness.card4.availability}</div>
                      <a href="https://myhmpm.com/register/index" target="_blank" rel="noopener noreferrer" className="join-business-card-button">{t.joinBusiness.card4.button}</a>
                    </div>
                  </div>
                </div>
              </div>

              {joinBusinessScrolled && (
                <button
                  className="join-business-arrow join-business-arrow-prev"
                  onClick={scrollJoinBusinessPrev}
                  aria-label="Previous"
                >
                  ❮
                </button>
              )}
            </div>

            <div className="join-business-dots">
              <button
                className={`join-business-dot ${activeJoinBusinessDot === 0 ? "dot-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollJoinBusinessToSlide(0);
                }}
                aria-label="Go to slide 1"
              />
              <button
                className={`join-business-dot ${activeJoinBusinessDot === 1 ? "dot-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollJoinBusinessToSlide(1);
                }}
                aria-label="Go to slide 2"
              />
            </div>
          </div>
        </section>

      </main>

      <Footer t={t} language={language} />
    </div>
  );
};

export default About;
