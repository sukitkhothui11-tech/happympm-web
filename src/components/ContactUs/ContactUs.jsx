import React, { useState } from "react";
import "./contactUs.css";
import { FiPhone, FiMail, FiClock, FiHeadphones } from "react-icons/fi";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const ContactUs = ({ language, t }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+66",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+66",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="contact-us-section">
      <div className="container">
        <h1 className="contact-us-title">{t.contactUs.title}</h1>

        <div className="contact-us-wrapper">
          {/* Left Side - Map & Form */}
          <div className="contact-left">
            {/* Map */}
            <div className="contact-map">
              <iframe
                title="Happy MPM Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7559159394!2d100.55029!3d13.76584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6147b63ccccc%3A0x123456789!2sNoble%20House%20Phayathai%20Building%2C%20Phayathai%20Rd%2C%20Bangkok!5e0!3m2!1sth!2sth!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Send Message Form */}
            <div className="send-message-section">
              <h2 className="send-message-title">{t.contactUs.sendMessage}</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.contactUs.firstName}</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.contactUs.lastName}</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.contactUs.email}</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.contactUs.phone}</label>
                    <div className="phone-input">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="country-code"
                      >
                        <option value="+66">+66</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+81">+81</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your contact number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>{t.contactUs.message}</label>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-message">
                  {t.contactUs.sendButton}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="contact-right">
            <div className="contact-info-box">
              <div className="contact-info-header">
                <div className="contact-header-icon">
                  <FiHeadphones size={32} />
                </div>
                <h3 className="contact-info-title">
                  {t.contactUs.contactInfo}
                </h3>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-icon">
                  <FiPhone size={24} />
                </div>
                <div className="contact-text">
                  <span className="label">{t.contactUs.phoneLabel}</span>
                  <span className="value">02-642-5425</span>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail size={24} />
                </div>
                <div className="contact-text">
                  <span className="label">{t.contactUs.emailLabel}</span>
                  <span className="value"><a href="mailto:info@happympm.com">info@happympm.com</a></span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="contact-item">
                <div className="contact-icon">
                  <FiClock size={24} />
                </div>
                <div className="contact-text">
                  <span className="label">{t.contactUs.hoursLabel}</span>
                  <span className="value">{t.contactUs.hours}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact-social">
                <span className="social-label">{t.contactUs.connectWithUs}</span>
                <div className="social-icons">
                  <a href="https://www.tiktok.com/@happympm.official" target="_blank" rel="noopener noreferrer" className="social-link" title="TikTok">
                    <span>🎵</span>
                  </a>
                  <a href="https://www.facebook.com/happympmofficial/?_rdc=2&_rdr" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                    <FaFacebook size={20} />
                  </a>
                  <a href="https://www.youtube.com/@happympmofficial/featured" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                    <FaYoutube size={20} />
                  </a>
                  <a href="https://page.line.me/happympm?openQrModal=true" target="_blank" rel="noopener noreferrer" className="social-link" title="LINE">
                    <SiLine size={20} />
                  </a>
                </div>
              </div>

              {/* Other Branches */}
              <div className="other-branches">
                <h4>{t.contactUs.branches}</h4>
                <div className="branch-box">
                  <h5>{t.contactUs.headOffice}</h5>
                  <button className="btn-click">Click →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
