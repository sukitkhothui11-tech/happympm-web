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
        address: "35/30 Noble House Phayathai Building, Phayathai Road, Thanon Phayathai Subdistrict, Ratchathewi District, Bangkok 10400",
        phone: "02-642-5425",
        email: "info@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m. *Closed every Thursday",
        mapLink: "https://maps.google.com/?q=35/30+Noble+House+Phayathai+Building+Bangkok",
        logo: "🏢",
      },
    ],
    "the North": [
      {
        id: 2,
        name: "Happy MPM Chiang Mai Branch",
        region: "the North",
        address: "111/59 K Park Project, Nong Hoi Subdistrict, Mueang District, Chiang Mai Province 50000",
        phone: "066-097-0521",
        email: "cm@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/mUJPdTigkh",
        mapLink: "https://maps.google.com/?q=Chiang+Mai+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 3,
        name: "Happy MPM Phitsanulok Branch",
        region: "the North",
        address: "337/29 Siharat Techochai Road, Nai Mueang Subdistrict, Mueang District, Phitsanulok Province 65000",
        phone: "066-097-0523",
        email: "pl@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/RNDy7T3cJQ",
        mapLink: "https://maps.google.com/?q=Phitsanulok+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 4,
        name: "Happy MPM Chiang Rai Branch",
        region: "the North",
        address: "643, Phahonyothin Road, Ban Du Subdistrict, Mueang Chiang Rai District, Chiang Rai Province 57100",
        phone: "066-097-0522",
        email: "cr@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/et1FJSVWmv",
        mapLink: "https://maps.google.com/?q=Chiang+Rai+Branch+Happy+MPM",
        logo: "🏢",
      },
    ],
    "Northeastern region": [
      {
        id: 5,
        name: "Happy MPM Roi Et Branch",
        region: "Northeastern region",
        address: "11B Village No. 3, Ban On, Dong Lan Subdistrict, Mueang Roi Et District, Roi Et Province 45000",
        phone: "066-097-0542",
        email: "ub@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/6235sjL",
        mapLink: "https://maps.google.com/?q=Roi+Et+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 6,
        name: "Happy MPM Korat Branch",
        region: "Northeastern region",
        address: "1164 Mitraphap Road, Nai Mueang Subdistrict, Mueang District, Nakhon Ratchasima Province 30000",
        phone: "066-097-0541",
        email: "pl@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/6235sjL",
        mapLink: "https://maps.google.com/?q=Korat+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 7,
        name: "Happy MPM Khon Kaen Branch",
        region: "Northeastern region",
        address: "485/20-21 Village No. 9, Srichan Road, Phralap Subdistrict, Mueang Khon Kaen District, Khon Kaen Province 40000",
        phone: "066-097-0539",
        email: "kk@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/6235sjL",
        mapLink: "https://maps.google.com/?q=Khon+Kaen+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 8,
        name: "Happy MPM Ubon Ratchathani Branch",
        region: "Northeastern region",
        address: "464/55-56 Moo 18, Chiayangkun Road, Kham Yai Subdistrict, Mueang Ubon Ratchathani District, Ubon Ratchathani Province 34000",
        phone: "066-097-0538",
        email: "ub@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/6235sjL",
        mapLink: "https://maps.google.com/?q=Ubon+Ratchathani+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 9,
        name: "Happy MPM Sakon Nakhon Branch",
        region: "Northeastern region",
        address: "386/29 Sai Sakonthawapt 4, Sakonthawapt Road, That Chiang Chum Subdistrict, Mueang Sakon Nakhon District, Sakon Nakhon Province",
        phone: "066-097-0540",
        email: "sn@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/6235sjL",
        mapLink: "https://maps.google.com/?q=Sakon+Nakhon+Branch+Happy+MPM",
        logo: "🏢",
      },
    ],
    "Central region": [
      {
        id: 10,
        name: "Happy MPM, Phra Nakhon SI Ayutthaya Branch",
        region: "Central region",
        address: "Amigo Toscana 155/30-31 Village No. 3, Khlong Suan Phlu Subdistrict, Phra Nakhon Si Ayutthaya District, Phra Nakhon Si Ayutthaya Province 13000",
        phone: "066-097-0530",
        email: "ay@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/cSeJ6-z2ee",
        mapLink: "https://maps.google.com/?q=Ayutthaya+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 11,
        name: "Happy MPM Samut Sakhon Branch",
        region: "Central region",
        address: "108/5 Village No. 5, Tha Mai Subdistrict, Krathum Baen District, Samut Sakhon Province 74110",
        phone: "066-097-0529",
        email: "ss@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/e7CrTxFX",
        mapLink: "https://maps.google.com/?q=Samut+Sakhon+Branch+Happy+MPM",
        logo: "🏢",
      },
    ],
    "Eastern region": [
      {
        id: 12,
        name: "Happy MPM Sriracha Branch",
        region: "Eastern region",
        address: "101/72 Moo 10, Sriracha - Nong Yai Bu Road, Nong Kham Subdistrict, Sriracha District, Chonburi Province 20230",
        phone: "066-097-0533",
        email: "cb@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/Ond3GMGQti2",
        mapLink: "https://maps.google.com/?q=Sriracha+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 13,
        name: "Happy MPM Aranyaprathet Branch",
        region: "Eastern region",
        address: "307/28 Moo 7, Pa Rai Subdistrict, Aranyaprathet District, Sa Kaeo Province 27120",
        phone: "066-0970535",
        email: "SK@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/156pTF4HzB",
        mapLink: "https://maps.google.com/?q=Aranyaprathet+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 14,
        name: "Happy MPM Chanthaburi Branch",
        region: "Eastern region",
        address: "59/55-56 Phraya Trang Road, Wat Mai Subdistrict, Mueang District, Chanthaburi Province 22000",
        phone: "066-097-0534",
        email: "ct@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://lin.ee/e7CrTxFX",
        mapLink: "https://maps.google.com/?q=Chanthaburi+Branch+Happy+MPM",
        logo: "🏢",
      },
    ],
    "South": [
      {
        id: 15,
        name: "Happy MPM Trang Branch",
        region: "South",
        address: "Charoenkit Project, No. 20/66, Trang Business Road, Bai Pho Subdistrict, Mueang Trang District, Trang Province",
        phone: "066-097-0548",
        email: "tg@happympm.com",
        businessHours: "9:00a.m. -6:00p.m. *Closed: Every Thursday",
        lineUrl: "https://lin.ee/98f90JTl9",
        mapLink: "https://maps.google.com/?q=Trang+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 16,
        name: "Happy MPM Chumphon Branch",
        region: "South",
        address: "9/27 Village No. 1, Na Cha-ang Subdistrict, Mueang Chumphon District, Chumphon Province 86000",
        phone: "066-097-0544",
        email: "cph@happympm.com",
        businessHours: "9:00 PM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/bsxhSAReY7aP",
        mapLink: "https://maps.google.com/?q=Chumphon+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 17,
        name: "Happy MPM Surat Thani Branch",
        region: "South",
        address: "59/73 Moo 4, Mekham Ta Subdistrict, Mueang District, Surat Thani Province 84000",
        phone: "066-097-0545",
        email: "st@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m. *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/5zuTyN0YS",
        mapLink: "https://maps.google.com/?q=Surat+Thani+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 18,
        name: "Happy MPM Hat Yai Branch",
        region: "South",
        address: "46/10 Petchkasem Road, Hat Yai Subdistrict, Hat Yai District, Songkhla Province 90110",
        phone: "066-097-0547",
        email: "hy@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/ZQ-YdzwJho",
        mapLink: "https://maps.google.com/?q=Hat+Yai+Branch+Happy+MPM",
        logo: "🏢",
      },
      {
        id: 19,
        name: "Happy MPM Nakhon Si Thammarat Branch",
        region: "South",
        address: "129/570 Muang Thong Project, Wandee Khosisutthon Road, Pak Nakhon Subdistrict, Mueang District, Nakhon Si Thammarat Province 80000",
        phone: "066-097-0546",
        email: "ns@happympm.com",
        businessHours: "9:00 AM - 6:00 PM *Closed: Every Thursday",
        lineUrl: "https://line.me/ti/p/Hsoi4XnXbi",
        mapLink: "https://maps.google.com/?q=Nakhon+Si+Thammarat+Branch+Happy+MPM",
        logo: "🏢",
      },
    ],
    "International branches": [
      {
        id: 20,
        name: "Happy MPM (Cambodia) Co., Ltd.",
        region: "International branches",
        address: "Otkide the Royal Villa [2004], No. SHK2-061, St Nakthe, Tragsang Chhouk Village, Sangkat Teuk Thla, Khan Sen Sok, Phnom Penh",
        phone: "+855 68 881 248",
        email: "peh.cambodia@happympm.com",
        businessHours: "9:00 a.m. - 6:00 p.m.",
        mapLink: "https://maps.google.com/?q=Happy+MPM+Cambodia+Phnom+Penh",
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
