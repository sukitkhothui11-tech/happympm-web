import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<App />} />
      <Route path="/awards" element={<App />} />
      <Route path="/social-activity/:id" element={<App />} />
      <Route path="/executive" element={<App />} />
      <Route path="/business-tool/:id" element={<App />} />
      <Route path="/calendar-of-events" element={<App />} />
      <Route path="/news-article/:id" element={<App />} />
      <Route path="/branches" element={<App />} />
    </Routes>
  );
};

export default AppRoutes;
