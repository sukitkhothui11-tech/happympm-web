import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./executiveDetail.css";

const ExecutiveDetail = ({ language = "en", t, setCurrentPage, setLanguage, setBusinessToolId }) => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const executives = [
    {
      id: 1,
      name: 'Sukit & Araya Satperisaprai',
      position: 'Chairman & Vice Chairman',
      image: '/images/Executive/1.jpg',
      isCoPair: true,
      role: 'leadership',
      bio: 'Visionary founders with 30+ years of combined experience in business development and strategic growth.'
    },
    {
      id: 2,
      name: 'Nopphawit Satperisaprai',
      position: 'Chief Marketing Officer',
      image: '/images/Executive/2.jpg',
      role: 'executive',
      bio: 'Leading global brand strategy and market expansion initiatives across Asia-Pacific regions.'
    },
    {
      id: 3,
      name: 'Napawat Satperisaprai',
      position: 'Chief Operating Officer',
      image: '/images/Executive/3.png',
      role: 'executive',
      bio: 'Driving operational excellence and process optimization for sustainable business growth.'
    },
    {
      id: 4,
      name: 'Jirun Satperisaprai',
      position: 'Chief Production Officer',
      image: '/images/Executive/4.jpg',
      role: 'executive',
      bio: 'Overseeing product innovation and quality assurance across our premium product lines.'
    },
    {
      id: 5,
      name: 'Satchavasai Boonbinnun',
      position: 'Executive Board Member',
      image: '/images/Executive/5.jpg',
      role: 'board',
      bio: 'Strategic advisor bringing deep expertise in financial management and corporate governance.'
    },
    {
      id: 6,
      name: 'Piritayaning Langtae',
      position: 'Executive Board Member',
      image: '/images/Executive/6.jpg',
      role: 'board',
      bio: 'Guiding organizational development and talent management across all divisions.'
    },
    {
      id: 7,
      name: 'Porsiphitch Suratkaew',
      position: 'Operations Director',
      image: '/images/Executive/7.jpg',
      role: 'board',
      bio: 'Managing day-to-day operations and ensuring seamless execution of strategic initiatives.'
    },
    {
      id: 8,
      name: 'Napawat Satperisaprai',
      position: 'Operations Director',
      image: '/images/Executive/8.jpg',
      role: 'board',
      bio: 'Supporting operational teams and fostering innovation in supply chain management.'
    }
  ];

  const roleFilters = [
    { value: 'all', label: 'All' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'executive', label: 'Executives' },
    { value: 'board', label: 'Board' }
  ];

  const filteredExecutives = selectedRole === 'all' 
    ? executives 
    : executives.filter(exec => exec.role === selectedRole);

  return (
    <div className="executive-detail-page">
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
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <NavBar language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />

      {/* MAIN CONTENT */}
      <main className="executive-detail-main">
        <div className="container">
          {/* HERO SECTION */}
          <section className="executive-detail-hero">
            <h1 className="executive-detail-hero-title">Leadership Team</h1>
            <p className="executive-detail-hero-subtitle">
              Meet the visionary leaders driving Happy MPM's mission to deliver excellence and innovation.
            </p>
          </section>

          {/* ABOUT TEAM SECTION */}
          <section className="executive-detail-about-team">
            <div className="about-team-content">
              <h2 className="about-team-title">Our Leadership Philosophy</h2>
              <p className="about-team-text">
                We believe in transparent, collaborative leadership that empowers our team to achieve excellence. 
                Our executive team combines decades of industry experience with a commitment to innovation, 
                customer satisfaction, and sustainable growth.
              </p>
            </div>
          </section>

          {/* FILTER SECTION */}
          <section className="executive-detail-filters">
            <div className="filter-label">Filter by Role:</div>
            <div className="filter-buttons">
              {roleFilters.map((filter) => (
                <button
                  key={filter.value}
                  className={`filter-button ${selectedRole === filter.value ? 'active' : ''}`}
                  onClick={() => setSelectedRole(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          {/* EXECUTIVE CARDS - FLAT GRID VIEW */}
          {selectedRole !== 'all' ? (
            <section className="executive-detail-grid-section">
              <div className="executive-detail-flat-grid">
                {filteredExecutives.map((executive, idx) => (
                  <div 
                    key={executive.id} 
                    className="executive-detail-card expandable"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => setExpandedCard(expandedCard === executive.id ? null : executive.id)}
                  >
                    <div className="executive-detail-image-wrapper">
                      <img src={executive.image} alt={executive.name} className="executive-detail-image" />
                      <div className="executive-detail-overlay"></div>
                      <div className="executive-role-badge">{executive.role}</div>
                    </div>
                    <div className="executive-detail-info">
                      <h3 className="executive-detail-name">{executive.name}</h3>
                      <p className="executive-detail-position">{executive.position}</p>
                      {expandedCard === executive.id && (
                        <p className="executive-detail-bio">{executive.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="executive-detail-grid-section">
              <div className="executive-detail-grid">
                {/* LEVEL 0 - CHAIRMAN & VICE CHAIRMAN */}
                <div className="executive-detail-card-large">
                  {executives.slice(0, 1).map((executive) => (
                    <div 
                      key={executive.id} 
                      className="executive-detail-card"
                      onClick={() => setExpandedCard(expandedCard === executive.id ? null : executive.id)}
                    >
                      <div className="executive-detail-image-wrapper">
                        <img src={executive.image} alt={executive.name} className="executive-detail-image" />
                        <div className="executive-detail-overlay"></div>
                        <div className="executive-role-badge leadership">{executive.role}</div>
                      </div>
                      <div className="executive-detail-info">
                        <h3 className="executive-detail-name">{executive.name}</h3>
                        <p className="executive-detail-position">{executive.position}</p>
                        {expandedCard === executive.id && (
                          <p className="executive-detail-bio">{executive.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* LEVEL 1 - CMO, COO, CPO */}
                <div className="executive-detail-level-1">
                  {executives.slice(1, 4).map((executive, idx) => (
                    <div 
                      key={executive.id} 
                      className="executive-detail-card"
                      onClick={() => setExpandedCard(expandedCard === executive.id ? null : executive.id)}
                    >
                      <div className="executive-detail-image-wrapper">
                        <img src={executive.image} alt={executive.name} className="executive-detail-image" />
                        <div className="executive-detail-overlay"></div>
                        <div className="executive-role-badge executive">{executive.role}</div>
                      </div>
                      <div className="executive-detail-info">
                        <h3 className="executive-detail-name">{executive.name}</h3>
                        <p className="executive-detail-position">{executive.position}</p>
                        {expandedCard === executive.id && (
                          <p className="executive-detail-bio">{executive.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* LEVEL 2 - BOARD MEMBERS & DIRECTORS */}
                <div className="executive-detail-level-2">
                  {executives.slice(4).map((executive, idx) => (
                    <div 
                      key={executive.id} 
                      className="executive-detail-card"
                      onClick={() => setExpandedCard(expandedCard === executive.id ? null : executive.id)}
                    >
                      <div className="executive-detail-image-wrapper">
                        <img src={executive.image} alt={executive.name} className="executive-detail-image" />
                        <div className="executive-detail-overlay"></div>
                        <div className="executive-role-badge board">{executive.role}</div>
                      </div>
                      <div className="executive-detail-info">
                        <h3 className="executive-detail-name">{executive.name}</h3>
                        <p className="executive-detail-position">{executive.position}</p>
                        {expandedCard === executive.id && (
                          <p className="executive-detail-bio">{executive.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA SECTION */}
          <section className="executive-detail-cta">
            <div className="cta-content">
              <h2 className="cta-title">Want to join our team?</h2>
              <p className="cta-text">We're always looking for talented individuals to grow with us.</p>
              <button 
                className="cta-button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(() => { setCurrentPage("home"); }, 0);
                }}
              >
                View Opportunities
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default ExecutiveDetail;
