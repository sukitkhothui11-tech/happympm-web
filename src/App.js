import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { translations } from "./translations";
import Intro from "./components/Intro/Intro"; // <-- ดึง intro แยกไฟล์
import NewsArticles from "./components/NewsArticles/NewsArticles";
import BusinessTools from "./components/BusinessTools/BusinessTools";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import AwardsDetail from "./pages/AwardsDetail/AwardsDetail";
import SocialActivityDetail from "./pages/SocialActivityDetail/SocialActivityDetail";
import ExecutiveDetail from "./pages/ExecutiveDetail/ExecutiveDetail";
import BusinessToolDetail from "./pages/BusinessToolDetail/BusinessToolDetail";
import CalendarOfEvents from "./pages/CalendarOfEvents/CalendarOfEvents";
import NewsArticleDetail from "./pages/NewsArticleDetail/NewsArticleDetail";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { page, id } = useParams();
  
  const [language, setLanguage] = useState("en"); // 'th' or 'en'
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'about', 'awardsDetail', 'socialActivityDetail', 'executiveDetail', 'businessToolDetail', 'calendarOfEvents', 'newsArticleDetail'
  const [socialActivityId, setSocialActivityId] = useState(1); // 1, 2, 3, or 4
  const [businessToolId, setBusinessToolId] = useState(1); // 1-5 for tools
  const [articleId, setArticleId] = useState(1); // 1-8 for articles
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  const [desktopBusinessOpen, setDesktopBusinessOpen] = useState(false);
  const [activeMobileLink, setActiveMobileLink] = useState("HOME PAGE");
  const [promotionsScrolled, setPromotionsScrolled] = useState(false);
  const [activePromotionDot, setActivePromotionDot] = useState(0);
  const [productsScrolled, setProductsScrolled] = useState(false);
  const [activeProductDot, setActiveProductDot] = useState(0);
  const [joinBusinessScrolled, setJoinBusinessScrolled] = useState(false);
  const [activeJoinBusinessDot, setActiveJoinBusinessDot] = useState(0);
  const promotionsRowRef = useRef(null);
  const productsRowRef = useRef(null);
  const joinBusinessRowRef = useRef(null);
  const isPromotionScrollingRef = useRef(false);
  const isProductScrollingRef = useRef(false);
  const isJoinBusinessScrollingRef = useRef(false);

  



  
  const t = translations[language];

  const scrollToNext = () => {
    if (promotionsRowRef.current) {
      const cardWidth = 400; // width of each card
      const gap = 24; // gap between cards
      const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ดเพื่อเห็นการ์ดที่ 4 แบบเต็ม
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isPromotionScrollingRef.current = true;
      
      promotionsRowRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setPromotionsScrolled(true);
      setActivePromotionDot(1);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isPromotionScrollingRef.current = false;
      }, 600);
    }
  };

  const handleBackToTop = () => {
    console.log("Back to top clicked");

    const candidates = [
      document.scrollingElement,
      document.documentElement,
      document.body,
      document.getElementById("root"),
      document.querySelector(".page"),
    ].filter(Boolean);

    candidates.forEach((el) => {
      try {
        if (typeof el.scrollTo === "function") {
          el.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          el.scrollTop = 0;
        }
      } catch (e) {
        try {
          el.scrollTop = 0;
        } catch (_) {}
      }
    });
  };

  const scrollToPrev = () => {
    if (promotionsRowRef.current) {
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isPromotionScrollingRef.current = true;
      
      promotionsRowRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setPromotionsScrolled(false);
      setActivePromotionDot(0);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isPromotionScrollingRef.current = false;
      }, 600);
    }
  };

  const scrollToSlide = (slideIndex) => {
    if (promotionsRowRef.current) {
      const cardWidth = 400;
      const gap = 24;
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isPromotionScrollingRef.current = true;
      
      // อัปเดต state ทันที
      setActivePromotionDot(slideIndex);
      
      if (slideIndex === 0) {
        // เลื่อนกลับไปจุดเริ่มต้น (การ์ด 1-3)
        promotionsRowRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setPromotionsScrolled(false);
      } else {
        // เลื่อนไปการ์ดที่ 4 แบบเต็ม
        const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ดเพื่อเห็นการ์ดที่ 4 แบบเต็ม
        promotionsRowRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
        setPromotionsScrolled(true);
      }
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isPromotionScrollingRef.current = false;
      }, 600);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
    setMobileBusinessOpen(false);
  };

  // Handle click outside for desktop dropdowns (mobile/touch devices)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close on touch/click devices, not on hover devices
      if (window.matchMedia("(hover: hover)").matches) {
        return; // Desktop with hover support - let hover handle it
      }

      // For touch devices, close if clicking outside
      const target = event.target;
      const isClickInsideDropdown = 
        target.closest(".nav-dropdown") !== null;
      
      if (!isClickInsideDropdown) {
        setDesktopProductOpen(false);
        setDesktopBusinessOpen(false);
      }
    };

    // Only add listener on touch devices
    if (!window.matchMedia("(hover: hover)").matches) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, []);

  // Handle click outside for language dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".lang-dropdown-container") && !target.closest(".mobile-lang-dropdown-container")) {
        setLangDropdownOpen(false);
        setMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle scroll position for promotions
  useEffect(() => {
    const handleScroll = () => {
      if (promotionsRowRef.current && !isPromotionScrollingRef.current) {
        const scrollLeft = promotionsRowRef.current.scrollLeft;
        const cardWidth = 400;
        const gap = 24;
        const threshold = (cardWidth + gap) * 2; // เกณฑ์สำหรับเปลี่ยน slide
        
        // ถ้า scroll ไปเกือบถึงจุดสิ้นสุด ให้แสดงปุ่มย้อนกลับ
        if (scrollLeft > 50) {
          setPromotionsScrolled(true);
        } else {
          setPromotionsScrolled(false);
        }

        // อัปเดต active dot ตาม scroll position
        if (scrollLeft < threshold) {
          setActivePromotionDot(0);
        } else {
          setActivePromotionDot(1);
        }
      }
    };

    if (promotionsRowRef.current) {
      promotionsRowRef.current.addEventListener('scroll', handleScroll);
      // เรียก handleScroll ทันทีเพื่ออัปเดต state เริ่มต้น
      handleScroll();
      return () => {
        if (promotionsRowRef.current) {
          promotionsRowRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  // Products scroll functions
  const scrollProductsNext = () => {
    if (productsRowRef.current) {
      const cardWidth = 160;
      const gap = 20;
      const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ด
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isProductScrollingRef.current = true;
      
      productsRowRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setProductsScrolled(true);
      setActiveProductDot(1);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isProductScrollingRef.current = false;
      }, 600);
    }
  };

  const scrollProductsPrev = () => {
    if (productsRowRef.current) {
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isProductScrollingRef.current = true;
      
      productsRowRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setProductsScrolled(false);
      setActiveProductDot(0);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isProductScrollingRef.current = false;
      }, 600);
    }
  };

  const scrollProductsToSlide = (slideIndex) => {
    if (productsRowRef.current) {
      const cardWidth = 160;
      const gap = 20;
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isProductScrollingRef.current = true;
      
      // อัปเดต state ทันที
      setActiveProductDot(slideIndex);
      
      if (slideIndex === 0) {
        productsRowRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setProductsScrolled(false);
      } else {
        // เลื่อนไปการ์ดที่ 4 (index 3) เพื่อแสดงการ์ด 4-5
        const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ด
        productsRowRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
        setProductsScrolled(true);
      }
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isProductScrollingRef.current = false;
      }, 600);
    }
  };

  // Handle scroll position for products
  useEffect(() => {
    const handleScroll = () => {
      if (productsRowRef.current && !isProductScrollingRef.current) {
        const scrollLeft = productsRowRef.current.scrollLeft;
        const cardWidth = 160;
        const gap = 20;
        const threshold = (cardWidth + gap) * 2.5; // เกณฑ์สำหรับเปลี่ยน slide
        
        if (scrollLeft > 50) {
          setProductsScrolled(true);
        } else {
          setProductsScrolled(false);
        }

        // อัปเดต active dot ตาม scroll position
        if (scrollLeft < threshold) {
          setActiveProductDot(0);
        } else {
          setActiveProductDot(1);
        }
      }
    };

    if (productsRowRef.current) {
      productsRowRef.current.addEventListener('scroll', handleScroll);
      // เรียก handleScroll ทันทีเพื่ออัปเดต state เริ่มต้น
      handleScroll();
      return () => {
        if (productsRowRef.current) {
          productsRowRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  // Join Business scroll functions
  const scrollJoinBusinessNext = () => {
    if (joinBusinessRowRef.current) {
      const cardWidth = 400;
      const gap = 24;
      const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ดเพื่อเห็นการ์ดที่ 4 แบบเต็ม
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isJoinBusinessScrollingRef.current = true;
      
      joinBusinessRowRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setJoinBusinessScrolled(true);
      setActiveJoinBusinessDot(1);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isJoinBusinessScrollingRef.current = false;
      }, 600);
    }
  };

  const scrollJoinBusinessPrev = () => {
    if (joinBusinessRowRef.current) {
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isJoinBusinessScrollingRef.current = true;
      
      joinBusinessRowRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setJoinBusinessScrolled(false);
      setActiveJoinBusinessDot(0);
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isJoinBusinessScrollingRef.current = false;
      }, 600);
    }
  };

  const scrollJoinBusinessToSlide = (slideIndex) => {
    if (joinBusinessRowRef.current) {
      const cardWidth = 400;
      const gap = 24;
      
      // ตั้ง flag เพื่อป้องกัน scroll event listener override
      isJoinBusinessScrollingRef.current = true;
      
      // อัปเดต state ทันที
      setActiveJoinBusinessDot(slideIndex);
      
      if (slideIndex === 0) {
        // เลื่อนกลับไปจุดเริ่มต้น (การ์ด 1-3)
        joinBusinessRowRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setJoinBusinessScrolled(false);
      } else {
        // เลื่อนไปการ์ดที่ 4 แบบเต็ม
        const scrollAmount = (cardWidth + gap) * 3; // เลื่อนไป 3 การ์ดเพื่อเห็นการ์ดที่ 4 แบบเต็ม
        joinBusinessRowRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
        setJoinBusinessScrolled(true);
      }
      
      // รีเซ็ต flag หลังจาก scroll เสร็จ
      setTimeout(() => {
        isJoinBusinessScrollingRef.current = false;
      }, 600);
    }
  };

  // Handle scroll position for join business
  useEffect(() => {
    const handleScroll = () => {
      if (joinBusinessRowRef.current && !isJoinBusinessScrollingRef.current) {
        const scrollLeft = joinBusinessRowRef.current.scrollLeft;
        const cardWidth = 400;
        const gap = 24;
        const threshold = (cardWidth + gap) * 2; // เกณฑ์สำหรับเปลี่ยน slide
        
        // ถ้า scroll ไปเกือบถึงจุดสิ้นสุด ให้แสดงปุ่มย้อนกลับ
        if (scrollLeft > 50) {
          setJoinBusinessScrolled(true);
        } else {
          setJoinBusinessScrolled(false);
        }

        // อัปเดต active dot ตาม scroll position
        if (scrollLeft < threshold) {
          setActiveJoinBusinessDot(0);
        } else {
          setActiveJoinBusinessDot(1);
        }
      }
    };

    if (joinBusinessRowRef.current) {
      joinBusinessRowRef.current.addEventListener('scroll', handleScroll);
      // เรียก handleScroll ทันทีเพื่ออัปเดต state เริ่มต้น
      handleScroll();
      return () => {
        if (joinBusinessRowRef.current) {
          joinBusinessRowRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  // Intro state - ใช้ localStorage เพื่อให้ไม่เล่นซ้ำ
  const [showIntro, setShowIntro] = useState(() => {
    // ตรวจสอบว่า Intro เคยแสดงแล้วหรือไม่
    const introShown = localStorage.getItem("introShown");
    return !introShown; // ถ้าไม่เคยแสดง ให้แสดง (true), ถ้าเคยแล้วให้ซ่อน (false)
  });

  // บันทึกว่า Intro ได้แสดงแล้ว
  const handleIntroFinish = () => {
    setShowIntro(false);
    localStorage.setItem("introShown", "true");
  };

  // Handle scroll to business-tools when returning from business tool detail
  useEffect(() => {
    if (currentPage === "home" && sessionStorage.getItem("scrollToBusinessTools")) {
      sessionStorage.removeItem("scrollToBusinessTools");
      setTimeout(() => {
        const businessToolsSection = document.getElementById("business-tools");
        if (businessToolsSection) {
          businessToolsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [currentPage]);

  // Handle scroll to section from NavBar
  useEffect(() => {
    if (currentPage === "home" && sessionStorage.getItem("scrollToSection")) {
      const sectionId = sessionStorage.getItem("scrollToSection");
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [currentPage]);

  // Read URL and update currentPage accordingly
  useEffect(() => {
    const pathname = location.pathname;
    
    if (pathname === "/") {
      setCurrentPage("home");
    } else if (pathname === "/about") {
      setCurrentPage("about");
    } else if (pathname === "/awards") {
      setCurrentPage("awardsDetail");
    } else if (pathname.startsWith("/social-activity/")) {
      const activityId = pathname.split("/").pop();
      setSocialActivityId(parseInt(activityId) || 1);
      setCurrentPage("socialActivityDetail");
    } else if (pathname === "/executive") {
      setCurrentPage("executiveDetail");
    } else if (pathname.startsWith("/business-tool/")) {
      const toolId = pathname.split("/").pop();
      setBusinessToolId(parseInt(toolId) || 1);
      setCurrentPage("businessToolDetail");
    }
  }, [location.pathname]);

  // Sync currentPage with URL
  useEffect(() => {
    if (currentPage === "home") {
      navigate("/");
    } else if (currentPage === "about") {
      navigate("/about");
    } else if (currentPage === "awardsDetail") {
      navigate("/awards");
    } else if (currentPage === "socialActivityDetail") {
      navigate(`/social-activity/${socialActivityId}`);
    } else if (currentPage === "executiveDetail") {
      navigate("/executive");
    } else if (currentPage === "businessToolDetail") {
      navigate(`/business-tool/${businessToolId}`);
    } else if (currentPage === "calendarOfEvents") {
      navigate("/calendar-of-events");
    }
  }, [currentPage, socialActivityId, businessToolId, navigate]);

  return (
    <div className="page">
      {currentPage === "about" && <About language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setSocialActivityId={setSocialActivityId} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "awardsDetail" && <AwardsDetail language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "socialActivityDetail" && <SocialActivityDetail activity={socialActivityId} language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setSocialActivityId={setSocialActivityId} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "executiveDetail" && <ExecutiveDetail language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "businessToolDetail" && <BusinessToolDetail toolId={businessToolId} language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "calendarOfEvents" && <CalendarOfEvents language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />}
      {currentPage === "newsArticleDetail" && <NewsArticleDetail articleId={articleId} language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} setArticleId={setArticleId} />}

      {currentPage === "home" && (
      <>
      {/* TOP BAR */}
      {showIntro && <Intro onFinish={handleIntroFinish} />}
      <div className="top-bar">
        <div className="container top-bar-inner">
            <div className="top-left-links">
            <a href="#join-business" onClick={(e) => { e.preventDefault(); document.getElementById('join-business')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.startBusiness}</a>
            <a href="#promotions" onClick={(e) => { e.preventDefault(); document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.memberBenefits}</a>
            <a href="#contact-us" onClick={(e) => { e.preventDefault(); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.topBar.contact}</a>
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

      {/* NAVBAR (DESKTOP + HAMBURGER) */}
      <header className="main-nav">
        <div className="container nav-inner">
          <div className="nav-left-group">
            <div className="nav-logo">HAPPY MPM</div>

            {/* DESKTOP MENU */}
            <nav className="nav-center">
              <a href="#" className="nav-link nav-link-active" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                    // Only handle click on touch devices (hover not supported)
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
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); setDesktopProductOpen(false); }}>{t.products.pollitin}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); setDesktopProductOpen(false); }}>
                    {t.products.healthWellness}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); setDesktopProductOpen(false); }}>
                    {t.products.beautyBody}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); setDesktopProductOpen(false); }}>
                    {t.products.onlineMembership}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); setDesktopProductOpen(false); }}>
                    {t.products.agriculture}
                  </a>
                </div>
              </div>

              <a href="#news-articles" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('news-articles')?.scrollIntoView({ behavior: 'smooth' }); }}>
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
                    // Scroll to business-tools section
                    document.getElementById('business-tools')?.scrollIntoView({ behavior: 'smooth' });
                    // On hover-enabled devices, keep dropdown open; on touch devices, toggle dropdown
                    if (!window.matchMedia("(hover: hover)").matches) {
                      setDesktopBusinessOpen(!desktopBusinessOpen);
                    }
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDesktopBusinessOpen(!desktopBusinessOpen);
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
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(1); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.businessperson.businessPlan}</a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(2); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {t.businessperson.onlineMarketing}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setCurrentPage('calendarOfEvents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {t.businessperson.calendar}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(4); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {t.businessperson.promotions}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(5); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {t.businessperson.lectureGuide}
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setDesktopBusinessOpen(false); setBusinessToolId(6); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    {t.businessperson.travelRewards}
                  </a>
                </div>
              </div>
              
              <a href="#contact-us" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}>
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
      <div
        className={`mobile-nav-backdrop ${
          mobileMenuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-nav-panel">
          {/* แถบภาษาเล็ก ๆ ด้านบน */}
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
                <div 
                  className="mobile-lang-dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
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
          </div>

          {/* HEADER HAPPY MPM + ปุ่มปิด */}
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

          {/* รายการเมนู */}
          <nav className="mobile-nav-list">
            <button 
              className={`mobile-link ${activeMobileLink === "HOME PAGE" ? "mobile-link-active" : ""}`}
              onClick={() => { setActiveMobileLink("HOME PAGE"); closeMobileMenu(); setCurrentPage("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              {t.mobile.homePage}
            </button>

            {/* PRODUCT DROPDOWN (MOBILE) */}
            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => {
                  // If dropdown is already open, scroll to products instead
                  if (mobileProductOpen) {
                    closeMobileMenu();
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setMobileProductOpen(true);
                  }
                }}
              >
                {t.mobile.product} ▾
              </button>
              <div
                className={`mobile-dropdown-menu ${
                  mobileProductOpen ? "open" : ""
                }`}
              >
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t.products.pollitin}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t.products.healthWellness}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t.products.beautyBody}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t.products.onlineMembership}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t.products.agriculture}
                </button>
              </div>
            </div>

            <button 
              className={`mobile-link ${activeMobileLink === "NEWS & ARTICLES" ? "mobile-link-active" : ""}`}
              onClick={() => { setActiveMobileLink("NEWS & ARTICLES"); closeMobileMenu(); document.getElementById('news-articles')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {t.mobile.newsArticles}
            </button>

            {/* BUSINESSPERSON DROPDOWN (MOBILE) */}
            <div className="mobile-dropdown">
              <button
                className="mobile-link"
                onClick={() => {
                  // If dropdown is already open, scroll to business-tools instead
                  if (mobileBusinessOpen) {
                    closeMobileMenu();
                    document.getElementById('business-tools')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setMobileBusinessOpen(true);
                  }
                }}
              >
                {t.mobile.businessperson} ▾
              </button>
              <div
                className={`mobile-dropdown-menu ${
                  mobileBusinessOpen ? "open" : ""
                }`}
              >
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(1); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.businessPlan}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(2); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.onlineMarketing}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setCurrentPage('calendarOfEvents'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.calendar}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(4); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.promotions}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(5); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.lectureGuide}
                </button>
                <button className="mobile-dropdown-item" onClick={() => { closeMobileMenu(); setBusinessToolId(6); setCurrentPage('businessToolDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {t.businessperson.travelRewards}
                </button>
              </div>
            </div>

            <button 
              className={`mobile-link ${activeMobileLink === "CONTACT US" ? "mobile-link-active" : ""}`}
              onClick={() => { setActiveMobileLink("CONTACT US"); closeMobileMenu(); setCurrentPage("home"); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {t.mobile.contactUs}
            </button>
          </nav>

          {/* ปุ่มด้านล่าง */}
          <div className="mobile-menu-buttons">
            <a href="https://www.happympm.com/EROOM/form-login.php" target="_blank" rel="noopener noreferrer" className="btn-outline-mobile">
              {t.mobile.onlineClassroom}
            </a>
            <a href="https://www.myhmpm.com/member/index.php" target="_blank" rel="noopener noreferrer" className="btn-solid-mobile">
              {t.mobile.logIn}
            </a>
          </div>
        </div>
      </div>

      {/* HERO VIDEO */}
      <main className="hero">
        <video
          className="hero-video"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" />
      </main>

      {/* QUALITY PRODUCTS SECTION */}
      <section className="products-section" id="products">
        <div className="container">
          <h2 className="products-title">
            {t.productsSection.title}
          </h2>

          <div className="products-wrapper">
            <div className="products-row" ref={productsRowRef}>
              <div className="product-card">
                <div className="product-image">
                  <img src="/products/pollitin.png" alt="Pollitin" />
                </div>
                <div className="product-name">Pollitin</div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="/products/health.png" alt="Health Choice" />
                </div>
                <div className="product-name">Health Choice</div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="/products/beauty.png" alt="Beauty & Body" />
                </div>
                <div className="product-name">Beauty &amp; Body</div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="/products/cr-set.png" alt="CR Online Set" />
                </div>
                <div className="product-name">CR Online Set</div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img
                    src="/products/agriculture.png"
                    alt="Agriculture & Equipment"
                  />
                </div>
                <div className="product-name">
                  Agriculture &amp; Equipment
                </div>
              </div>
            </div>

            {!productsScrolled && (
              <button 
                className="products-arrow products-arrow-next"
                onClick={scrollProductsNext}
                aria-label="Next"
              >
                ❯
              </button>
            )}

            {productsScrolled && (
              <button 
                className="products-arrow products-arrow-prev"
                onClick={scrollProductsPrev}
                aria-label="Previous"
              >
                ❮
              </button>
            )}
          </div>

          <div className="products-dots">
            <button
              className={`product-dot ${activeProductDot === 0 ? "dot-active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollProductsToSlide(0);
              }}
              aria-label="Go to slide 1"
            />
            <button
              className={`product-dot ${activeProductDot === 1 ? "dot-active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollProductsToSlide(1);
              }}
              aria-label="Go to slide 2"
            />
          </div>
        </div>
      </section>

      {/* PROMOTIONS SECTION */}
      <section className="promotions-section" id="promotions">
        <div className="container">
          <div className="promotions-header">
            <h2 className="promotions-title">{t.promotions.title}</h2>
            <a href="#" className="promotions-view-all">{t.promotions.viewAll}</a>
          </div>

          <div className="promotions-wrapper">
            <div className="promotions-row" ref={promotionsRowRef}>
              {/* Card 1: Starter Package */}
              <div className="promotion-card promotion-card-1">
                <div className="promotion-card-image">
                  <img src="/promotions/starter-package.jpg" alt="Starter Package" />
                </div>
                <div className="promotion-card-content">
                  <div className="promotion-audience">{t.promotions.starterPackage.audience}</div>
                  <h3 className="promotion-title">{t.promotions.starterPackage.title}</h3>
                  <p className="promotion-description">{t.promotions.starterPackage.description}</p>
                  <div className="promotion-duration">{t.promotions.starterPackage.duration}</div>
                </div>
                <div className="promotion-card-overlay">
                  <span className="promotion-card-overlay-text">{t.promotions.moreDetail}</span>
                </div>
              </div>

              {/* Card 2: Welcome Bonus Points */}
              <div className="promotion-card promotion-card-2">
                <div className="promotion-card-image">
                  <img src="/promotions/welcome-bonus.jpg" alt="Welcome Bonus Points" />
                </div>
                <div className="promotion-card-content">
                  <div className="promotion-audience">{t.promotions.welcomeBonus.audience}</div>
                  <h3 className="promotion-title">{t.promotions.welcomeBonus.title}</h3>
                  <p className="promotion-description">{t.promotions.welcomeBonus.description}</p>
                  <div className="promotion-duration">{t.promotions.welcomeBonus.duration}</div>
                </div>
                <div className="promotion-card-overlay">
                  <span className="promotion-card-overlay-text">{t.promotions.moreDetail}</span>
                </div>
              </div>

              {/* Card 3: 0% Installment Plan */}
              <div className="promotion-card promotion-card-3">
                <div className="promotion-card-image">
                  <img src="/promotions/installment-plan.jpg" alt="0% Installment Plan" />
                </div>
                <div className="promotion-card-content">
                  <div className="promotion-audience">{t.promotions.installment.audience}</div>
                  <h3 className="promotion-title">{t.promotions.installment.title}</h3>
                  <div className="promotion-duration">{t.promotions.installment.duration}</div>
                  <div className="promotion-duration-note">{t.promotions.installment.durationNote}</div>
                </div>
                <div className="promotion-card-overlay">
                  <span className="promotion-card-overlay-text">{t.promotions.moreDetail}</span>
                </div>
              </div>

              {/* Card 4: Fast Track Bonus */}
              <div className="promotion-card promotion-card-4">
                <div className="promotion-card-image">
                  <img src="/promotions/fast-track.jpg" alt="Fast Track Bonus" />
                </div>
                <div className="promotion-card-content">
                  <div className="promotion-audience">{t.promotions.fastTrack.audience}</div>
                  <h3 className="promotion-title">{t.promotions.fastTrack.title}</h3>
                  <p className="promotion-description">{t.promotions.fastTrack.description}</p>
                  <div className="promotion-duration">{t.promotions.fastTrack.duration}</div>
                </div>
                <div className="promotion-card-overlay">
                  <span className="promotion-card-overlay-text">{t.promotions.moreDetail}</span>
                </div>
              </div>
            </div>

            {!promotionsScrolled && (
              <button 
                className="promotions-arrow promotions-arrow-next"
                onClick={scrollToNext}
                aria-label="Next"
              >
                ❯
              </button>
            )}

            {promotionsScrolled && (
              <button 
                className="promotions-arrow promotions-arrow-prev"
                onClick={scrollToPrev}
                aria-label="Previous"
              >
                ❮
              </button>
            )}
          </div>

          <div className="promotions-dots">
            <button
              className={`promotion-dot ${activePromotionDot === 0 ? "dot-active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSlide(0);
              }}
              aria-label="Go to slide 1"
            />
            <button
              className={`promotion-dot ${activePromotionDot === 1 ? "dot-active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSlide(1);
              }}
              aria-label="Go to slide 2"
            />
          </div>
        </div>
      </section>

      {/* JOIN OUR BUSINESS SECTION */}
      <section className="join-business-section" id="join-business">
        <div className="container">
          <div className="join-business-header">
            <div className="join-business-title-wrapper">
              <h2 className="join-business-title">{t.joinBusiness.title}</h2>
              <p className="join-business-subtitle">{t.joinBusiness.subtitle}</p>
            </div>
            <a href="#" className="join-business-view-all">{t.joinBusiness.viewAll}</a>
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
                    <span className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</span>
                  </div>
                </div>
                <div className="join-business-card-content">
                  <div className="join-business-card-banner">{t.joinBusiness.card1.title}</div>
                  <p className="join-business-card-description">{t.joinBusiness.card1.description}</p>
                  <div className="join-business-card-footer">
                    <div className="join-business-card-availability">{t.joinBusiness.card1.availability}</div>
                    <button className="join-business-card-button">{t.joinBusiness.card1.button}</button>
                  </div>
                </div>
              </div>

              {/* Card 2: New Member Registration */}
              <div className="join-business-card join-business-card-2">
                <div className="join-business-card-image">
                  <img src="/join-business/new-member.jpg" alt="New Member Registration" />
                  <div className="join-business-image-overlay">
                    <span className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</span>
                  </div>
                </div>
                <div className="join-business-card-content">
                  <div className="join-business-card-banner">{t.joinBusiness.card2.title}</div>
                  <p className="join-business-card-description">{t.joinBusiness.card2.description}</p>
                  <div className="join-business-card-footer">
                    <div className="join-business-card-availability">{t.joinBusiness.card2.validity}</div>
                    <button className="join-business-card-button">{t.joinBusiness.card2.button}</button>
                  </div>
                </div>
              </div>

              {/* Card 3: Starter Business Package */}
              <div className="join-business-card join-business-card-3">
                <div className="join-business-card-image">
                  <img src="/join-business/starter-package.jpg" alt="Starter Business Package" />
                  <div className="join-business-image-overlay">
                    <span className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</span>
                  </div>
                </div>
                <div className="join-business-card-content">
                  <div className="join-business-card-banner">{t.joinBusiness.card3.title}</div>
                  <p className="join-business-card-description">{t.joinBusiness.card3.description}</p>
                  <div className="join-business-card-footer">
                    <div className="join-business-card-availability">{t.joinBusiness.card3.availability}</div>
                    <button className="join-business-card-button">{t.joinBusiness.card3.button}</button>
                  </div>
                </div>
              </div>

              {/* Card 4: Business Growth Program */}
              <div className="join-business-card join-business-card-4">
                <div className="join-business-card-image">
                  <img src="/join-business/growth-program.jpg" alt="Business Growth Program" />
                  <div className="join-business-image-overlay">
                    <span className="join-business-image-overlay-text">{t.joinBusiness.moreDetail}</span>
                  </div>
                </div>
                <div className="join-business-card-content">
                  <div className="join-business-card-banner">{t.joinBusiness.card4.title}</div>
                  <p className="join-business-card-description">{t.joinBusiness.card4.description}</p>
                  <div className="join-business-card-footer">
                    <div className="join-business-card-availability">{t.joinBusiness.card4.availability}</div>
                    <button className="join-business-card-button">{t.joinBusiness.card4.button}</button>
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

      {/* News & Articles Section */}
      <div id="news-articles">
        <NewsArticles language={language} t={t} setCurrentPage={setCurrentPage} setArticleId={setArticleId} />
      </div>

      {/* Business Tools Section */}
      <div id="business-tools">
        <BusinessTools language={language} t={t} setCurrentPage={setCurrentPage} setBusinessToolId={setBusinessToolId} />
      </div>

      {/* Contact Us Section */}
      <div id="contact-us">
        <ContactUs language={language} t={t} />
      </div>

      {/* Footer */}
      <Footer language={language} t={t} />

      <button
        className="back-to-top"
        type="button"
        onClick={handleBackToTop}
        aria-label={language === "th" ? "กลับขึ้นด้านบน" : "Back to top"}
      >
        ↑
      </button>
      </>
      )}
    </div>
  );
}

export default App;
