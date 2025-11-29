import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./businessToolDetail.css";
import { MdChevronLeft, MdChevronRight, MdZoomIn, MdZoomOut, MdDownload, MdClose } from "react-icons/md";

const BusinessToolDetail = ({ language = "en", t, setCurrentPage, setLanguage, setBusinessToolId, toolId = 1 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [selectedImage, setSelectedImage] = useState(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Tool data with detailed information and image galleries
  const toolsData = {
    1: {
      title: "",
      shortTitle: "",
      description: "",
      fullDescription: "",
      features: [],
      color: "#0043a8",
      icon: "",
      images: [
        "/images/join-business/tool-1/image-1.jpg",
        "/images/join-business/tool-1/image-2.jpg",
        "/images/join-business/tool-1/image-3.jpg",
        "/images/join-business/tool-1/image-4.jpg",
        "/images/join-business/tool-1/image-5.jpg",
        "/images/join-business/tool-1/image-6.jpg",
        "/images/join-business/tool-1/image-7.jpg",
        "/images/join-business/tool-1/image-8.jpg",
        "/images/join-business/tool-1/image-9.jpg",
        "/images/join-business/tool-1/image-10.jpg",
        "/images/join-business/tool-1/image-11.jpg",
        "/images/join-business/tool-1/image-12.jpg",
        "/images/join-business/tool-1/image-13.jpg",
        "/images/join-business/tool-1/image-14.jpg",
        "/images/join-business/tool-1/image-15.jpg",
        "/images/join-business/tool-1/image-16.jpg",
      ]
    },
    2: {
      title: "Global Marketplace Platform",
      shortTitle: "Global Market",
      description: "Businessmen who wish to do online marketing correctly",
      fullDescription: "Official permission must be obtained from HappyMPM Co., Ltd. only, and the \"HOB\" Happy Online Business Card must be displayed at all sales channels. Violators are considered to have violated the company's regulations and will be subject to punishment according to CBPM regulations, with the highest penalty being revocation of membership status. Applications can be submitted and the test taken at Line@HappySmiles.",
      features: [],
      color: "#0089c8",
      icon: "🌍",
      images: [
        "/images/join-business/tool-2/image-1.jpg",
        "/images/join-business/tool-2/image-2.jpg",
        "/images/join-business/tool-2/image-3.jpg",
        "/images/join-business/tool-2/image-4.jpg",
        "/images/join-business/tool-2/image-5.jpg",
      ]
    },
    3: {
      title: "Event Management System",
      shortTitle: "Event Management",
      description: "Organize, manage, and host successful business events effortlessly",
      fullDescription: "Our Event Management System simplifies the entire event lifecycle - from planning and promotion to execution and analytics. Create memorable experiences for your customers, partners, and team members. Track attendance, manage registrations, and measure event success with comprehensive reporting tools.",
      features: ["Event planning tools", "Registration management", "Ticketing system", "Attendee tracking", "Post-event analytics", "Marketing automation"],
      color: "#4caf50",
      icon: "📅",
      images: [
        "/images/join-business/tool-3/image-1.jpg",
        "/images/join-business/tool-3/image-2.jpg",
        "/images/join-business/tool-3/image-3.jpg",
      ]
    },
    4: {
      title: "Special privileges for new members",
      shortTitle: "Community",
      description: "Join us as a business partner at Happy Businessman MPM or",
      fullDescription: "https://www.myhmpm.com/register/index",
      features: [],
      color: "#ff9800",
      icon: "🤝",
      images: [
        "/images/join-business/tool-4/image-1.png",
      ]
    },
    5: {
      title: "Training & Development",
      shortTitle: "Training",
      description: "Elevate your skills with professional training and continuous learning programs",
      fullDescription: "Invest in your success with our comprehensive Training & Development platform. Access expert-led courses, webinars, and certifications designed for business professionals. Learn the latest strategies, tools, and best practices from industry leaders. Develop leadership skills, business acumen, and specialized expertise to advance your career.",
      features: [],
      color: "#9c27b0",
      icon: "📚",
      isPdf: true,
      pdfUrl: "/images/join-business/tool-5/1.pdf",
      images: [
        "/images/join-business/tool-5/image-1.jpg",
        "/images/join-business/tool-5/image-2.jpg",
        "/images/join-business/tool-5/image-3.jpg",
      ]
    },
    6: {
      title: "Travel Rewards Program",
      shortTitle: "Travel Rewards",
      description: "Explore our exclusive travel rewards program",
      fullDescription: "Click the link below to access the Travel Rewards Program",
      features: [],
      color: "#ff5722",
      icon: "✈️",
      isLink: true,
      linkUrl: "https://www.happympm.com/TravelRewards/",
      images: []
    },
  };

  const tool = toolsData[toolId] || toolsData[1];
  const currentImage = tool && tool.images ? tool.images[currentImageIndex] : null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? tool.images.length - 1 : prev - 1
    );
    setZoom(100);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === tool.images.length - 1 ? 0 : prev + 1
    );
    setZoom(100);
  };

  const handleSelectImage = (index) => {
    setCurrentImageIndex(index);
    setZoom(100);
    setPanX(0);
    setPanY(0);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 300));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 100));
    if (zoom - 20 <= 100) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleMouseDown = (e) => {
    if (zoom > 100) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 100) {
      const newPanX = e.clientX - dragStart.x;
      const newPanY = e.clientY - dragStart.y;
      setPanX(newPanX);
      setPanY(newPanY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `${tool.shortTitle}-image-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="business-tool-detail-page">
      {/* NAVBAR */}
      <NavBar language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />

      {/* MAIN CONTENT */}
      <main className="business-tool-detail-main">
        <div className="container">
          {/* BACK BUTTON */}
          <button 
            className="back-button"
            onClick={() => {
              // Store flag to scroll to business-tools after rendering
              sessionStorage.setItem("scrollToBusinessTools", "true");
              setCurrentPage("home");
            }}
          >
            ← Back to Home
          </button>

          {/* INFO SECTION - Show if tool has description/fullDescription */}
          {tool.description && (
            <section className="tool-info-section">
              <div className="info-content">
                <h2>{tool.description}</h2>
                <p>{tool.fullDescription}</p>
              </div>
            </section>
          )}

          {/* GALLERY SECTION */}
          <section className="tool-detail-gallery">
            {/* Main Image Viewer */}
            <div 
              className="gallery-main"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="main-image-container">
                {tool.isLink ? (
                  <div className="link-viewer">
                    <a 
                      href={tool.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-button"
                    >
                      Visit {tool.description}
                    </a>
                  </div>
                ) : tool.isPdf ? (
                  <iframe 
                    src={tool.pdfUrl} 
                    title="PDF Viewer"
                    className="pdf-viewer"
                  />
                ) : (
                  <img 
                    src={currentImage} 
                    alt={`Image ${currentImageIndex + 1}`}
                    className="main-image"
                    style={{ 
                      transform: `translate(${panX}px, ${panY}px) scale(${zoom / 100})`,
                      cursor: zoom > 100 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
                    }}
                    draggable="false"
                  />
                )}
              </div>

              {/* Navigation Arrows - Hide for PDF/Link */}
              {!tool.isPdf && !tool.isLink && (
                <>
                  <button className="gallery-nav-btn gallery-nav-prev" onClick={handlePrevImage}>
                    <MdChevronLeft size={32} />
                  </button>
                  <button className="gallery-nav-btn gallery-nav-next" onClick={handleNextImage}>
                    <MdChevronRight size={32} />
                  </button>

                  {/* Image Counter */}
                  <div className="image-counter">
                    {currentImageIndex + 1} / {tool.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Controls - Hide for PDF/Link */}
            {!tool.isPdf && !tool.isLink && (
              <div className="gallery-controls">
                <div className="control-group">
                  <button 
                    className="control-btn zoom-btn"
                    onClick={handleZoomOut}
                    disabled={zoom === 100}
                    title="Zoom Out"
                  >
                    <MdZoomOut size={24} />
                  </button>
                  <span className="zoom-level">{zoom}%</span>
                  <button 
                    className="control-btn zoom-btn"
                    onClick={handleZoomIn}
                    disabled={zoom === 300}
                    title="Zoom In"
                  >
                    <MdZoomIn size={24} />
                  </button>
                </div>

                <div className="control-group">
                  <button 
                    className="control-btn download-btn"
                    onClick={handleDownload}
                    title="Download Image"
                  >
                    <MdDownload size={24} />
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnail Gallery - Hide for PDF/Link */}
            {!tool.isPdf && !tool.isLink && (
              <div className="thumbnail-gallery">
                {tool.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleSelectImage(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                    <div className="thumbnail-number">{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default BusinessToolDetail;
