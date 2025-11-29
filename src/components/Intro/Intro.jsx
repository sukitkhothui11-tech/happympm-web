// src/components/Intro/Intro.jsx
import React, { useEffect, useState } from "react";
import "./intro.css";

const Intro = ({ onFinish }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setHide(true), 3000);  // เริ่มเฟดออก
    const timer2 = setTimeout(() => onFinish(), 3800);     // เข้าเว็บจริง

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`intro-minimal ${hide ? "intro-hide" : ""}`}>
      {/* ใช้ PNG */}
      <img
        src="/logo.png"
        alt="Happy MPM"
        className="intro-logo"
      />

      <h1 className="intro-title">HAPPY MPM</h1>

      <p className="intro-tagline">
        Empowering People • Building Future • 26 Years of Trust
      </p>
    </div>
  );
};

export default Intro;
