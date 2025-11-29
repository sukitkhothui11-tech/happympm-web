import React, { useState, useMemo } from "react";
import "./branches.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Branches = ({ language, t, setCurrentPage, setLanguage }) => {
  const [expandedRegion, setExpandedRegion] = useState("Bangkok");

  // Branch data organized by region
  const branchesData = {
    Bangkok: [
      {
        id: 1,
        name: "Happy MPM Head Office",
        region: "Head office, Bangkok",
        address: "35/30 Noble House Phayathai Building, Phayathai Road, Thanon Phayathai Subdistrict, Ratchathewi Distrct, Bangkok 10400",
        phone: "02-642-5425",
        email: "info@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Head+Office+Bangkok",
        logo: "🏢",
      },
    ],
    North: [
      {
        id: 2,
        name: "Chiang Mai Branch",
        region: "the North",
        address: "123 Superhighway Road, Tambon Nong Hoi, Amphoe Mueang Chiang Mai, Chiang Mai 50000",
        phone: "053-123-4567",
        email: "chiangmai@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Chiang+Mai",
        logo: "🏢",
      },
      {
        id: 3,
        name: "Nan Branch",
        region: "the North",
        address: "456 Mahidol Road, Tambon Nai Mueang, Amphoe Mueang Nan, Nan 55000",
        phone: "054-123-4567",
        email: "nan@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Nan",
        logo: "🏢",
      },
    ],
    "Northeastern region": [
      {
        id: 4,
        name: "Khon Kaen Branch",
        region: "Northeastern region",
        address: "789 Mitraphap Road, Tambon Nai Mueang, Amphoe Mueang Khon Kaen, Khon Kaen 40000",
        phone: "043-123-4567",
        email: "khonkaen@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Khon+Kaen",
        logo: "🏢",
      },
      {
        id: 5,
        name: "Udon Thani Branch",
        region: "Northeastern region",
        address: "321 Pho Si Road, Tambon Nai Mueang, Amphoe Mueang Udon Thani, Udon Thani 41000",
        phone: "042-123-4567",
        email: "udontani@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Udon+Thani",
        logo: "🏢",
      },
    ],
    "Central region": [
      {
        id: 6,
        name: "Ayutthaya Branch",
        region: "Central region",
        address: "654 Naresuan Road, Tambon Pratu Chai, Amphoe Phra Nakhon Si Ayutthaya, Ayutthaya 13000",
        phone: "035-123-4567",
        email: "ayutthaya@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Ayutthaya",
        logo: "🏢",
      },
      {
        id: 7,
        name: "Saraburi Branch",
        region: "Central region",
        address: "987 Mittraphap Road, Tambon Muak Lek, Amphoe Muak Lek, Saraburi 18180",
        phone: "044-123-4567",
        email: "saraburi@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Saraburi",
        logo: "🏢",
      },
    ],
    "Eastern region": [
      {
        id: 8,
        name: "Pattaya Branch",
        region: "Eastern region",
        address: "111 Soi Cosy Beach, Tambon Bang Lamung, Amphoe Bang Lamung, Chonburi 20150",
        phone: "038-123-4567",
        email: "pattaya@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Pattaya",
        logo: "🏢",
      },
      {
        id: 9,
        name: "Rayong Branch",
        region: "Eastern region",
        address: "222 Sukhumvit Road, Tambon Makham, Amphoe Mueang Rayong, Rayong 21000",
        phone: "039-123-4567",
        email: "rayong@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Rayong",
        logo: "🏢",
      },
    ],
    South: [
      {
        id: 10,
        name: "Phuket Branch",
        region: "South",
        address: "333 Phang Nga Road, Tambon Talat Yai, Amphoe Mueang Phuket, Phuket 83000",
        phone: "076-123-4567",
        email: "phuket@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Phuket",
        logo: "🏢",
      },
      {
        id: 11,
        name: "Hat Yai Branch",
        region: "South",
        address: "444 Petchkasem Road, Tambon Hat Yai, Amphoe Hat Yai, Songkhla 90110",
        phone: "074-123-4567",
        email: "hatyai@happympm.com",
        businessHours: "9:00 a.m. - 5:30 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Hat+Yai",
        logo: "🏢",
      },
    ],
    "International branches": [
      {
        id: 12,
        name: "Hong Kong Branch",
        region: "International branches",
        address: "555 Des Voeux Road Central, Central, Hong Kong",
        phone: "+852-1234-5678",
        email: "hongkong@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m. *Closed every Sunday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Hong+Kong",
        logo: "🏢",
      },
      {
        id: 13,
        name: "Singapore Branch",
        region: "International branches",
        address: "666 Orchard Road, Orchard, Singapore 238841",
        phone: "+65-1234-5678",
        email: "singapore@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m. *Closed every Sunday",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Singapore",
        logo: "🏢",
      },
    ],
  };

  const regionList = Object.keys(branchesData);

  return (
    <div className="branches-page">
      <NavBar language={language} setLanguage={setLanguage} t={t} setCurrentPage={setCurrentPage} />
      
      {/* Header */}
      <div className="branches-header">
        <div className="container">
          <h1>{t.contactUs?.branches || "Office branches nationwide"}</h1>
          <p>Find a Happy MPM office near you</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="branches-container">
        <div className="container">
          <div className="branches-layout">
          {/* Sidebar - Region List */}
          <div className="branches-sidebar">
            <h2>Region</h2>
            <div className="region-list">
              {regionList.map((region) => (
                <button
                  key={region}
                  className={`region-btn ${expandedRegion === region ? "active" : ""}`}
                  onClick={() => setExpandedRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Branches List */}
          <div className="branches-main">
            {/* Selected Region Title */}
            <div className="region-header">
              <h2>{expandedRegion}</h2>
              <p className="branch-count">
                {branchesData[expandedRegion].length} branch{branchesData[expandedRegion].length !== 1 ? "es" : ""}
              </p>
            </div>

            {/* Branches Grid */}
            <div className="branches-grid">
              {branchesData[expandedRegion].map((branch) => (
                <div key={branch.id} className="branch-card">
                  <div className="branch-card-header">
                    <div className="branch-logo">{branch.logo}</div>
                    <h3>{branch.name}</h3>
                  </div>

                  <div className="branch-card-body">
                    <div className="branch-info-item">
                      <span className="branch-label">Address</span>
                      <p>{branch.address}</p>
                    </div>

                    <div className="branch-info-item">
                      <span className="branch-label">Phone</span>
                      <a href={`tel:${branch.phone}`}>{branch.phone}</a>
                    </div>

                    <div className="branch-info-item">
                      <span className="branch-label">Email</span>
                      <a href={`mailto:${branch.email}`}>{branch.email}</a>
                    </div>

                    <div className="branch-info-item">
                      <span className="branch-label">Business Hours</span>
                      <p>{branch.businessHours}</p>
                    </div>

                    <div className="branch-info-item">
                      <span className="branch-label">Map</span>
                      <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                        Click
                      </a>
                    </div>
                  </div>

                  <div className="branch-card-footer">
                    <button className="btn-contact">Get Directions</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      <Footer language={language} t={t} />
    </div>
  );
};

export default Branches;
