import React from "react";
import "./businessTools.css";
import { MdAssignmentTurnedIn, MdPublic, MdCalendarToday, MdPeople, MdMenuBook, MdCardTravel } from "react-icons/md";

const BusinessTools = ({ language, t, setCurrentPage, setBusinessToolId }) => {
  const tools = [
    {
      id: 1,
      icon: MdAssignmentTurnedIn,
      title: t.businessTools.tools.tool1.title,
      description: t.businessTools.tools.tool1.description,
      buttonText: "Details",
      hasDetail: true,
    },
    {
      id: 2,
      icon: MdPublic,
      title: t.businessTools.tools.tool2.title,
      description: t.businessTools.tools.tool2.description,
      buttonText: "Details",
      hasDetail: true,
    },
    {
      id: 3,
      icon: MdCalendarToday,
      title: t.businessTools.tools.tool3.title,
      description: t.businessTools.tools.tool3.description,
      buttonText: "Details",
      hasDetail: true,
    },
    {
      id: 4,
      icon: MdPeople,
      title: t.businessTools.tools.tool4.title,
      description: t.businessTools.tools.tool4.description,
      buttonText: "Details",
      hasDetail: true,
    },
    {
      id: 5,
      icon: MdMenuBook,
      title: t.businessTools.tools.tool5.title,
      description: t.businessTools.tools.tool5.description,
      buttonText: "Details",
      hasDetail: true,
    },
    {
      id: 6,
      icon: MdCardTravel,
      title: t.businessTools.tools.tool6.title,
      description: t.businessTools.tools.tool6.description,
      buttonText: "Details",
      hasDetail: true,
    },
  ];

  const handleToolClick = (tool) => {
    if (tool.hasDetail) {
      window.scrollTo(0, 0);
      if (tool.id === 3) {
        // Tool 3 goes to Calendar of Events
        setTimeout(() => {
          setCurrentPage("calendarOfEvents");
        }, 0);
      } else {
        // Other tools go to Business Tool Detail
        setBusinessToolId(tool.id);
        setTimeout(() => {
          setCurrentPage("businessToolDetail");
        }, 0);
      }
    } else if (tool.externalLink) {
      window.open(tool.externalLink, "_blank");
    }
  };

  return (
    <section className="business-tools-section">
      <div className="business-tools-bg">
        <img
          src="/images/492599373_1078600380966689_5233720880464695950_n.jpg"
          alt="Business Background"
          className="business-tools-bg-img"
        />
        <div className="business-tools-overlay"></div>
      </div>

      <div className="container">
        <div className="business-tools-content">
          {/* Header */}
          <div className="business-tools-header">
            <h1 className="business-tools-title">
              {t.businessTools.title}
            </h1>
            <p className="business-tools-subtitle">
              {t.businessTools.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="business-tools-description">
            {t.businessTools.description}
          </p>

          {/* Action Buttons */}
          <div className="business-tools-actions">
            <button className="btn-start-business">
              {t.businessTools.startBusiness} <span>→</span>
            </button>
            <button className="btn-explore-tools">{t.businessTools.exploreTools}</button>
          </div>

          {/* Tools Grid */}
          <div className="business-tools-label">BUSINESS TOOLS</div>
          <div className="business-tools-grid">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div key={tool.id} className="business-tool-card">
                  <div className="tool-icon">
                    <IconComponent size={40} />
                  </div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-description">{tool.description}</p>
                  <button 
                    className="tool-button"
                    onClick={() => handleToolClick(tool)}
                  >
                    {tool.buttonText} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessTools;
