import React, { useMemo, useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./calendarOfEvents.css";

const CATEGORIES = [
  "All",
  "MEET CEO",
  "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
  "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
  "Chiang Rai, Chiang Mai and Southern Region",
  "Northeastern",
];

const CATEGORY_COLORS = {
  "MEET CEO": {
    bg: "#fef08a",
    text: "#713f12",
    border: "#fcd34d",
    light: "#fef3c7",
  },
  "HQ Phaya Thai, Samut Sakhon, Phitsanulok": {
    bg: "#bfdbfe",
    text: "#1e40af",
    border: "#60a5fa",
    light: "#dbeafe",
  },
  "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi": {
    bg: "#c084fc",
    text: "#6b21a8",
    border: "#d8b4fe",
    light: "#ede9fe",
  },
  "Chiang Rai, Chiang Mai and Southern Region": {
    bg: "#86efac",
    text: "#166534",
    border: "#4ade80",
    light: "#dcfce7",
  },
  "Northeastern": {
    bg: "#f87171",
    text: "#7f1d1d",
    border: "#fca5a5",
    light: "#fee2e2",
  },
};

const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || { bg: "#e5e7eb", text: "#374151", border: "#d1d5db", light: "#f3f4f6" };
};

// Profile images for events
const PROFILE_IMAGES = [
  "/images/profile1.jpg",
  "/images/profile2.jpg",
  "/images/profile3.jpg",
  "/images/profile4.jpg",
  "/images/profile5.jpg",
  "/images/profile6.jpg",
];

const getRandomProfileImage = (seed) => {
  // Use seed to ensure consistent image for same event
  const index = Math.abs(seed) % PROFILE_IMAGES.length;
  return PROFILE_IMAGES[index];
};

// Helper to update event with random image
const updateEventsWithImages = (events) => {
  return events.map(event => ({
    ...event,
    imagePreview: getRandomProfileImage(event.id)
  }));
};

let DEFAULT_EVENTS = [
  {
    id: 1,
    title: "Better Business",
    category: "MEET CEO",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Hat Yai Branch",
    eventName: "Better Business",
    details: "MLM entrepreneurship ideas in the AI era: unlocking business secrets for unlimited extra income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 2,
    title: "Better Business Coffee",
    category: "MEET CEO",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Mr. Max Naphawit",
    location: "Vientiane Branch, Lao PDR",
    eventName: "Better Business Coffee",
    details: "Tips for making money from Happy coffee",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 3,
    title: "B-Vision",
    category: "MEET CEO",
    date: "2025-11-03",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Trang Province",
    eventName: "B-Vision",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 4,
    title: "B-Vision Mobile",
    category: "MEET CEO",
    date: "2025-11-04",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Yala Province",
    eventName: "B-Vision Mobile",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 5,
    title: "HappyCoffee Bootcamp",
    category: "MEET CEO",
    date: "2025-11-04",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Executive Committee, Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 6,
    title: "B-Vision",
    category: "MEET CEO",
    date: "2025-11-05",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Chalung Center",
    eventName: "B-Vision",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 7,
    title: "HappyCoffee Bootcamp",
    category: "MEET CEO",
    date: "2025-11-05",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Executive Committee, Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 8,
    title: "B-Vision",
    category: "MEET CEO",
    date: "2025-11-07",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Langu Boutique, Satun Province",
    eventName: "B-Vision",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 9,
    title: "B-Vision",
    category: "MEET CEO",
    date: "2025-11-09",
    time: "09:00",
    lecturer: "Mr. Max Naphawit",
    location: "Head office",
    eventName: "B-Vision",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 10,
    title: "Langkawi trip",
    category: "MEET CEO",
    date: "2025-11-11",
    time: "00:00",
    lecturer: "Mr. Mick Napawat / Mr. Max Napawit",
    location: "Malaysia",
    eventName: "Langkawi trip",
    details: "Langkawi trip - Day 1",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 11,
    title: "Langkawi trip",
    category: "MEET CEO",
    date: "2025-11-12",
    time: "00:00",
    lecturer: "Mr. Mick Napawat / Mr. Max Napawit",
    location: "Malaysia",
    eventName: "Langkawi trip",
    details: "Langkawi trip - Day 2",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 12,
    title: "Langkawi trip",
    category: "MEET CEO",
    date: "2025-11-13",
    time: "00:00",
    lecturer: "Mr. Mick Napawat / Mr. Max Napawit",
    location: "Malaysia",
    eventName: "Langkawi trip",
    details: "Langkawi trip - Day 3",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 13,
    title: "HappyCoffee Bootcamp",
    category: "MEET CEO",
    date: "2025-11-16",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Udon Thani Province",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 14,
    title: "Better Business",
    category: "MEET CEO",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Head office",
    eventName: "Better Business",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 15,
    title: "HappyCoffee Bootcamp",
    category: "MEET CEO",
    date: "2025-11-17",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Siam Grand Hotel, Udon Thani Province",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 16,
    title: "B-Vision Travel Suphanburi",
    category: "MEET CEO",
    date: "2025-11-21",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Suphan Buri Province",
    eventName: "B-Vision Travel Suphanburi",
    details: "Build confidence in the product, doing business with HAPPY MPM",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 17,
    title: "Happy Academy Class 31",
    category: "MEET CEO",
    date: "2025-11-22",
    time: "10:00",
    lecturer: "Mr. Max Naphawit / Ms. Laddawan Bunnan",
    location: "Head office",
    eventName: "Happy Academy Class 31",
    details: "Happy Academy training session",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 18,
    title: "Better Business",
    category: "MEET CEO",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Mick Napawat / Mr. Jirat Satprasertprai",
    location: "Phitsanulok Branch",
    eventName: "Better Business",
    details: "MX Protein Deep Dive",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 19,
    title: "Happy Academy Class 31",
    category: "MEET CEO",
    date: "2025-11-23",
    time: "10:00",
    lecturer: "Mr. Max Naphawit / Ms. Laddawan Bunnan",
    location: "Head office",
    eventName: "Happy Academy Class 31",
    details: "Happy Academy training session",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 20,
    title: "B-Vision",
    category: "MEET CEO",
    date: "2025-11-25",
    time: "18:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Ayutthaya Branch",
    eventName: "B-Vision",
    details: "Explore coffee business trends and organizational expansion in the Happy MPM business.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 21,
    title: "Better Business",
    category: "MEET CEO",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Hat Yai Branch",
    eventName: "Better Business",
    details: "MLM entrepreneurship ideas in the AI era: unlocking business secrets for unlimited extra income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 22,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-01",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "Make viral videos easily with AI + Capcut + ChatGPT\n1. Name your products to be searchable + clickable\n2. Write credible Shopee / Lazada product promotions",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 23,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Ms. Pim Kochanan / Ms. Kung Kornkamon",
    location: "Head office",
    eventName: "Better Business",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 24,
    title: "Training to energize the new generation",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Mr. Kittisak Suebphaophan and Ms. Kamonporn Tajai",
    location: "Samut Sakhon Branch",
    eventName: "Training to energize the new generation",
    details: "Understanding the modern marketing landscape",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 25,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Mr. Chalermchai Suranarak / Ms. Issara Sriphan",
    location: "Phitsanulok Branch",
    eventName: "Better Business",
    details: "Explore the 2025 coffee business trend: low investment, sustainable profits, and the secret to growing crops with Singto Yeab Phet products.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 26,
    title: "Pollitin Talk",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-05",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Pollitin Talk",
    details: "Q&A: In-depth information about Pollitin products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 27,
    title: "Owner Club",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-05",
    time: "14:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "Owner Club",
    details: "Marketing Plan Topic: Deep insight into marketing plans",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 28,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-05",
    time: "19:00",
    lecturer: "Mr. Max Naphawit",
    location: "ZOOM Meetings",
    eventName: "Better Business",
    details: "Business Storytelling – 4 Ways to Tell Stories That Will Convince Your Team and Your Customers",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 29,
    title: "B-Vision Mindset for Success",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-05",
    time: "13:00",
    lecturer: "Mr. Kittisak Suebphaophan",
    location: "Samut Sakhon Branch",
    eventName: "B-Vision Mindset for Success",
    details: "Strategic thinking techniques and team motivation",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 30,
    title: "Health & Wellness Forum",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-07",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Health & Wellness Forum",
    details: "Deep Dive into Rye Pollen: The Secret of Nature's Life Force and the Evolution of G60 – G63 Extraction",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 31,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-07",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "- Think of a campaign to shoot a VDO with a story telling feature for Happy MPM products\n- and edit it on CapCut with various tips and techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 32,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-08",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "Make viral videos easily with AI + Capcut + ChatGPT\n1. Name your products to be searchable + clickable\n2. Write credible Shopee / Lazada product promotions.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 33,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Mr. Max Naphawit",
    location: "Head office",
    eventName: "Better Business",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 34,
    title: "Training to increase sales with sales growth strategies",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Ms. Kotchaporn Rungpathomtham / Ms. Kamonporn Tajai",
    location: "Samut Sakhon Branch",
    eventName: "Training to increase sales with sales growth strategies",
    details: "Professional sales closing techniques to build long-term relationships with customers",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 35,
    title: "Pollitin Talk",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-12",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Pollitin Talk",
    details: "Q&A: In-depth information about Pollitin products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 36,
    title: "Owner Club",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-12",
    time: "14:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "Owner Club",
    details: "Product Training Topic: Techniques for presenting products in an interesting way",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 37,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-12",
    time: "19:00",
    lecturer: "Mr. Mick Napawat",
    location: "ZOOM Meetings",
    eventName: "Better Business",
    details: "Product Pipeline 2026 – Updates on new products and projects you've been waiting for",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 38,
    title: "B-Vision Closes Sales Professionally",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-12",
    time: "13:00",
    lecturer: "Mr. Narong Prajamthaew and Ms. Kamonporn Tajai",
    location: "Samut Sakhon Branch",
    eventName: "B-Vision Closes Sales Professionally",
    details: "Learn sales techniques to understand your customers and close sales faster.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 39,
    title: "Health & Wellness Forum",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-14",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Health & Wellness Forum",
    details: "Why Pollitin® is a complete multivitamin, naturally created",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 40,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-14",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "- Think of a campaign to shoot a video with a story telling feature for Happy MPM products\n- and edit it on CapCut with various tips and techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 41,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-15",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "Create content like a pro with Canva\n- Use Canva to create professional posters / stories / promotional images\n- choose fonts, colors and templates to match your brand.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 42,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Head office",
    eventName: "Better Business",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 43,
    title: "Training Tiktok & Reels Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Ms. Kamonporn Tajai / Ms. Rattanaya Phrommaharat",
    location: "Samut Sakhon Branch",
    eventName: "Training Tiktok & Reels Marketing",
    details: "Learn how to market your short video content to go viral and increase sales.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 44,
    title: "Owner Club",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-19",
    time: "14:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "Owner Club",
    details: "Sale & Sponsor Topic: Sales and Organization Expansion in Happy mpm Business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 45,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-19",
    time: "19:00",
    lecturer: "Mr. Max Naphawit",
    location: "ZOOM Meetings",
    eventName: "Better Business",
    details: "3 income paths to stability and sustainability",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 46,
    title: "B-Vision Social Selling",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-19",
    time: "13:00",
    lecturer: "Ms. Kamonporn Tajai / Ms. Rattanaya Phrommaharat",
    location: "Samut Sakhon Branch",
    eventName: "B-Vision Social Selling",
    details: "Professional posting and chat response techniques and how to close sales in chat like a pro.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 47,
    title: "Health & Wellness Forum",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-21",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Health & Wellness Forum",
    details: "Influenza is no small matter if our immune system is not strong.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 48,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-21",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "- Think of a campaign to shoot a video with a story telling feature for Happy MPM products\n- and edit it on CapCut with various tips and techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 49,
    title: "Happy Academy Class 31",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-22",
    time: "10:00",
    lecturer: "Mr. Max Naphawit / Ms. Laddawan Bunnan",
    location: "Head office",
    eventName: "Happy Academy Class 31",
    details: "- The art of presenting with conciseness and to the point\n- Speaking with charm, attracting the audience\n- Practicing professional storytelling\n- Opening the minds of the audience, ready to step into the Happy MPM business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 50,
    title: "Happy Academy Class 31",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-23",
    time: "10:00",
    lecturer: "Mr. Max Naphawit / Ms. Laddawan Bunnan",
    location: "Head office",
    eventName: "Happy Academy Class 31",
    details: "- The art of presenting with conciseness and to the point\n- Speaking with charm, attracting the audience\n- Practicing professional storytelling\n- Opening the minds of the audience, ready to step into the Happy MPM business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 51,
    title: "Training strategies to exceed sales targets in the digital age",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Ms. Kamonporn Tajai / Ms. Ubon Prakarak",
    location: "Samut Sakhon Branch",
    eventName: "Training strategies to exceed sales targets in the digital age",
    details: "Integrate traditional sales with online techniques to expand your customer base and increase sales.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 52,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Mick Napawat",
    location: "Phitsanulok Branch",
    eventName: "Better Business",
    details: "Explore the 2025 coffee business trend: low investment, sustainable profits",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 53,
    title: "Pollitin Talk",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-26",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Pollitin Talk",
    details: "Q&A: In-depth information about Pollitin products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 54,
    title: "Owner Club",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-26",
    time: "14:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Head office",
    eventName: "Owner Club",
    details: "Topic Follow Up & Service: Organizational Monitoring and Care",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 55,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-26",
    time: "19:00",
    lecturer: "Mr. Mick Napawat",
    location: "ZOOM Meetings",
    eventName: "Better Business",
    details: "Longevity and a valuable life in the Happy MPM style",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 56,
    title: "B-Vision Sales Mindset",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-26",
    time: "13:00",
    lecturer: "Mr. Phallop Sirimonchai / Ms. Kamonporn Tajai",
    location: "Samut Sakhon Branch",
    eventName: "B-Vision Sales Mindset",
    details: "Techniques to inspire and empower your sales team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 57,
    title: "Health & Wellness Forum",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-28",
    time: "11:00",
    lecturer: "Professor Metta Chinbut",
    location: "Head office",
    eventName: "Health & Wellness Forum",
    details: "Blood Disease...Warning Signs of an Irregular Body — Pollitin, a New Alternative for Healthy Blood",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 58,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-28",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "- Think of a campaign to shoot a VDO with a story telling feature for Happy MPM products\n- and edit it on CapCut with various tips and techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 59,
    title: "Online Marketing",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-29",
    time: "14:00",
    lecturer: "Mr. Phassak Phophophat (Coach Top)",
    location: "Head office",
    eventName: "Online Marketing",
    details: "1. Order ChatGPT to help you think of a \"product promotional image layout.\"\n2. Use Canva's AI to create stunning images quickly, without having to start from scratch.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 60,
    title: "Better Business",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Ms. Laddawan Bunnan",
    location: "Head office",
    eventName: "Better Business",
    details: "Workshop Happy Coffee WARRIOR PROJECT",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 61,
    title: "Training: Customer Relationship Selling",
    category: "HQ Phaya Thai, Samut Sakhon, Phitsanulok",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Ms. Kamonporn Tajai and Ms. Kotchaporn Rungpathomtham",
    location: "Samut Sakhon Branch",
    eventName: "Training: Customer Relationship Selling",
    details: "Turning casual customers into regulars and creating a good after-sales experience",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 62,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-01",
    time: "13:00",
    lecturer: "Captain Chawtrakarn",
    location: "Ayutthaya Branch",
    eventName: "B-Vision",
    details: "Deep dive into marketing plans, revenue generation techniques and business confidence.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 63,
    title: "Kasetparuey Travel Chachoengsao",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-01",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "The house of Mr. Wimon Chiang Sri, Bang Kla District, Chachoengsao Province",
    eventName: "Kasetparuey Travel Chachoengsao",
    details: "Deep dive into agricultural products and how to use them to increase productivity.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 64,
    title: "B-VISION & HAPPY Coffee Franchise Business",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Ms. Patcharee Chaiphak",
    location: "Chanthaburi branch",
    eventName: "B-VISION & HAPPY Coffee Franchise Business",
    details: "Earn hundreds of thousands in income with the Happy Coffee business.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 65,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Ms. Maliwan Phuanurakti",
    location: "Sriracha Branch",
    eventName: "B-Vision",
    details: "Revealing business techniques to generate growing income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 66,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-07",
    time: "18:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Ayutthaya Branch",
    eventName: "B-Vision",
    details: "Explore coffee business trends, billion-dollar coffee franchises, and sales closing techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 67,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Mr. Swat Phanmak",
    location: "Aranyaprathet Branch",
    eventName: "B-Vision",
    details: "Explore coffee business trends, billion-dollar coffee franchises, and sales closing techniques.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 68,
    title: "Know your plants, reduce costs, increase productivity",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Chanthaburi branch",
    eventName: "Know your plants, reduce costs, increase productivity",
    details: "Techniques for using products to collect food and open flower buds",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 69,
    title: "HAPPY Coffee Franchise Business",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Ms. Adipa Boonprasit",
    location: "Sriracha Branch",
    eventName: "HAPPY Coffee Franchise Business",
    details: "Explore business trends with Happy Coffee Gold",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 70,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Ms. Patcharee Chaiphak",
    location: "Chanthaburi branch",
    eventName: "B-Vision",
    details: "Deep dive into products and marketing plans",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 71,
    title: "Training",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Mr. Sadanan Thongnam",
    location: "Sriracha Branch",
    eventName: "Training",
    details: "Using AI tools, Capcut accelerates sales growth",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 72,
    title: "Training Marketing Plan",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-19",
    time: "13:00",
    lecturer: "Mr. Banjob Rattanarot and Ms. Jintana Chuawong",
    location: "Ayutthaya Branch",
    eventName: "Training Marketing Plan",
    details: "Provides in-depth marketing plans, health care topics, and business performance monitoring for new lines of work, emphasizing systematic work.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 73,
    title: "B-Vision Travel Suphanburi",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-21",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Sri Prachan District, Suphan Buri Province",
    eventName: "B-Vision Travel Suphanburi",
    details: "Build confidence in the product, doing business with HAPPY MPM",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 74,
    title: "EXPO Health Fair & HAPPY Coffee Franchise Business",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-22",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Sriracha Branch",
    eventName: "EXPO Health Fair & HAPPY Coffee Franchise Business",
    details: "Know before you get sick: In-depth look at how to properly consume dietary supplements, and how to make money from Happy coffee.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 75,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Natthaphong Mekpayap",
    location: "Aranyaprathet Branch",
    eventName: "B-Vision",
    details: "Describe the marketing plan and explore leading products.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 76,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Ms. Patcharee Chaiphak",
    location: "Chanthaburi branch",
    eventName: "B-Vision",
    details: "Sales closing techniques",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 77,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-25",
    time: "18:00",
    lecturer: "Mr. Sarayut Pathumporn",
    location: "Ayutthaya Branch",
    eventName: "B-Vision",
    details: "Explore coffee business trends and organizational expansion in the Happy MPM business.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 78,
    title: "Know your plants, reduce costs, increase productivity",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Chanthaburi branch",
    eventName: "Know your plants, reduce costs, increase productivity",
    details: "Tips for earning money from farming",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 79,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Mr. Banjob Rattanarot and Ms. Jintana Chuawong",
    location: "Ayutthaya Branch",
    eventName: "B-Vision",
    details: "Describe the marketing plan, describe the Pollitin product, how to generate income and expand the member base for sustainable growth.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 80,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Mr. Sadanan Thongnam",
    location: "Sriracha Branch",
    eventName: "B-Vision",
    details: "Working systematically, creating wealth from within",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 81,
    title: "Table Talk",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-12-14",
    time: "13:00",
    lecturer: "Mr. Sadanan Thongnam",
    location: "Sriracha Branch",
    eventName: "Table Talk",
    details: "Know the product thoroughly and truly understand it before presenting it. Focus on developing confidence in explaining the product to customers.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 82,
    title: "B-Vision",
    category: "Phra Nakhon Si Ayutthaya, Sriracha, Aranyaprathet, Chanthaburi",
    date: "2025-12-17",
    time: "13:00",
    lecturer: "Ms. Maliwan Phuanurakti",
    location: "Sriracha Branch",
    eventName: "B-Vision",
    details: "Revealing business techniques to generate growing income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 83,
    title: "Better Business",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Hat Yai Branch",
    eventName: "Better Business",
    details: "MLM entrepreneurship ideas in the AI era: unlocking business secrets for unlimited extra income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 84,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 85,
    title: "B-Vision Mobile",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-03",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Trang Province",
    eventName: "B-Vision Mobile",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 86,
    title: "B-Vision Mobile",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-04",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Yala Province",
    eventName: "B-Vision Mobile",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 87,
    title: "B-Vision Mobile",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-05",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Chalung Center, Satun Province",
    eventName: "B-Vision Mobile",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 88,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-05",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 89,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-06",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 90,
    title: "B-Vision Mobile",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-07",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai",
    location: "Langu Boutique, Satun Province",
    eventName: "B-Vision Mobile",
    details: "Build business trust, unlock the secrets of building a business and generating unlimited extra income.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 91,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-07",
    time: "13:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 92,
    title: "Team Thachphon Camp",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-08",
    time: "13:00",
    lecturer: "Team Thatchaphon",
    location: "Hat Yai Branch",
    eventName: "Team Thachphon Camp",
    details: "Team Thachphon Camp",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 93,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-08",
    time: "13:00",
    lecturer: "Ms. Supattra Saksaen and Ms. Suphaphon Wittayakhom",
    location: "Chiang Rai branch",
    eventName: "B-Vision",
    details: "Coffee franchise training and agricultural products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 94,
    title: "Team Thachphon Camp",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Team Thatchaphon",
    location: "Hat Yai",
    eventName: "Team Thachphon Camp",
    details: "Team Thachphon Camp",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 95,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Ms. Thansita Thamthiang and Ms. Saranaya Thamkun",
    location: "Chiang Mai branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 96,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 97,
    title: "Grand Expo",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-15",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Hat Yai Branch",
    eventName: "Grand Expo",
    details: "Know about diseases, take care of your health, Q&A with Pollitin",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 98,
    title: "EXPO",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Trang branch",
    eventName: "EXPO",
    details: "Know about diseases, take care of your health, Q&A with Pollitin",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 99,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Ms. Thansita Thamthiang and Ms. Saranaya Thamkun",
    location: "Chiang Mai branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 100,
    title: "EXPO",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-17",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Surat Thani Branch",
    eventName: "EXPO",
    details: "Know about diseases, take care of your health, Q&A with Pollitin",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 101,
    title: "Elite camp",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-22",
    time: "13:00",
    lecturer: "Mr. Kantkritchai Chumdaeng",
    location: "Hat Yai Branch",
    eventName: "Elite camp",
    details: "Elite Camp",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 102,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-22",
    time: "13:00",
    lecturer: "Mr. Thanapon Changbua",
    location: "Chumphon branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 103,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-22",
    time: "13:00",
    lecturer: "Ms. Namukda Sridaengying and Ms. Nakawan Pliwan",
    location: "Surat Thani Branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 104,
    title: "Training Product",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Jirat Satprasertprai",
    location: "Chiang Mai branch",
    eventName: "Training Product",
    details: "MX Protein Deep Dive",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 105,
    title: "Elite camp",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Kantkritchai Chumdaeng",
    location: "Hat Yai Branch",
    eventName: "Elite camp",
    details: "Elite Camp",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 106,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 107,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Ms. Supattra Saksaen and Ms. Suphaphon Wittayakhom",
    location: "Chiang Rai branch",
    eventName: "B-Vision",
    details: "Coffee franchise training and agricultural products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 108,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Mr. Chantrasam Manchai and Ms. Penchanphan Sriket",
    location: "Trang branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 109,
    title: "Better Business",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Mr. Naphawat Satphetprai and Mr. Sarayut Pathumporn",
    location: "Hat Yai Branch",
    eventName: "Better Business",
    details: "MLM entrepreneurship ideas in the AI era: unlocking business secrets for unlimited extra income",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 110,
    title: "EXPO",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Lieutenant Commander Metta Chinbut",
    location: "Chiang Mai branch",
    eventName: "EXPO",
    details: "Know about diseases, take care of your health, Q&A with Pollitin",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 111,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-02",
    time: "09:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Fang District, Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 112,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-03",
    time: "09:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Fang District, Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 113,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-03",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 114,
    title: "Travel Agriculture",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-04",
    time: "09:00",
    lecturer: "Mr. Isra Sriphan",
    location: "Fang District, Chiang Mai Province",
    eventName: "Travel Agriculture",
    details: "Lecture - Techniques, secrets for generating income from farming, guidelines for starting a sustainable business",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 115,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-07",
    time: "13:00",
    lecturer: "Ms. Supattra Saksaen",
    location: "Chiang Rai branch",
    eventName: "B-Vision",
    details: "Describe agricultural products",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 116,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-07",
    time: "13:00",
    lecturer: "Ms. Thansita Thamthiang and Ms. Saranaya Thamkun",
    location: "Chiang Mai branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 117,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-10",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 118,
    title: "Welcome Camp Leadership",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-13",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Hat Yai Branch",
    eventName: "Welcome Camp Leadership",
    details: "Welcome camp Leadership Southern Region 4th time",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 119,
    title: "Welcome Camp Leadership",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-14",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Hat Yai Branch",
    eventName: "Welcome Camp Leadership",
    details: "Welcome camp Leadership Southern Region 4th time",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 120,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-14",
    time: "13:00",
    lecturer: "Ms. Thansita Thamthiang and Ms. Saranaya Thamkun",
    location: "Chiang Mai branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 121,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-17",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 122,
    title: "B-Vision",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-21",
    time: "13:00",
    lecturer: "Ms. Supattra Saksaen and Ms. Suphaphon Wittayakhom",
    location: "Chiang Rai branch",
    eventName: "B-Vision",
    details: "Describe agricultural products and coffee franchises",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 123,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-21",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Mai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 124,
    title: "LEADER TRAINING",
    category: "Chiang Rai, Chiang Mai and Southern Region",
    date: "2025-12-24",
    time: "13:00",
    lecturer: "Dream Team",
    location: "Chiang Rai branch",
    eventName: "LEADER TRAINING",
    details: "Dream team",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 125,
    title: "Mobile OPP",
    category: "Northeastern",
    date: "2025-11-01",
    time: "13:00",
    lecturer: "Mr. Khomphusit Nopnatphong",
    location: "Phu Fah Resort, Nong Bua Lamphu Province",
    eventName: "Mobile OPP",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 126,
    title: "Mobile OPP",
    category: "Northeastern",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Udon Thani Province",
    eventName: "Mobile OPP",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 127,
    title: "HAPPY Coffee Business",
    category: "Northeastern",
    date: "2025-11-02",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Korat branch",
    eventName: "HAPPY Coffee Business",
    details: "Presentation techniques for selling Happy Copy Gold coffee",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 128,
    title: "Grand Expo",
    category: "Northeastern",
    date: "2025-11-08",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Khon Kaen branch",
    eventName: "Grand Expo",
    details: "POLLITIN product description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 129,
    title: "Grand Expo",
    category: "Northeastern",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Professor Metta Chinbut",
    location: "Roi Et Branch",
    eventName: "Grand Expo",
    details: "POLLITN Product Description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 130,
    title: "Training Product",
    category: "Northeastern",
    date: "2025-11-09",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Korat branch",
    eventName: "Training Product",
    details: "New Era POLLITIN Sales Techniques with AI + Cell Science",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 131,
    title: "Mobile OPP",
    category: "Northeastern",
    date: "2025-11-14",
    time: "13:00",
    lecturer: "Mr. Khomphusit Nopnatphong",
    location: "Amnat Charoen Province",
    eventName: "Mobile OPP",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 132,
    title: "Mobile OPP",
    category: "Northeastern",
    date: "2025-11-15",
    time: "13:00",
    lecturer: "Mr. Khomphusit Nopnatphong",
    location: "Phu Fah Resort, Nong Bua Lamphu Province",
    eventName: "Mobile OPP",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 133,
    title: "HappyCoffee Bootcamp",
    category: "Northeastern",
    date: "2025-11-16",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Siam Grand Hotel, Udon Thani Province",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 134,
    title: "Training: Customer Relationship Selling",
    category: "Northeastern",
    date: "2025-11-16",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Korat branch",
    eventName: "Training: Customer Relationship Selling",
    details: "ABC T-UP Course: From Solo Agent to Professional Team Leader",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 135,
    title: "HappyCoffee Bootcamp",
    category: "Northeastern",
    date: "2025-11-17",
    time: "09:00",
    lecturer: "Mr. Max Naphawit, Mr. Sarayut Pathumporn",
    location: "Siam Grand Hotel, Udon Thani Province",
    eventName: "HappyCoffee Bootcamp, a camp for building business warriors",
    details: "Learn in depth about the selling points and differences of HappyCoffee coffee, tips for communicating selling points.",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 136,
    title: "B-Vision",
    category: "Northeastern",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Roi Et Branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 137,
    title: "Training Content Marketing & Storytelling",
    category: "Northeastern",
    date: "2025-11-23",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Korat branch",
    eventName: "Training Content Marketing & Storytelling",
    details: "Turn newbies into agents with HAPPY MCN",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 138,
    title: "HAPPY Coffee Business",
    category: "Northeastern",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Roi Et Branch",
    eventName: "HAPPY Coffee Business",
    details: "Coffee Franchise Business Concept, Coffee Product Description",
    imagePreview: "/images/profile.jpg",
  },
  {
    id: 139,
    title: "B-Vision",
    category: "Northeastern",
    date: "2025-11-30",
    time: "13:00",
    lecturer: "Branch Leader",
    location: "Korat branch",
    eventName: "B-Vision",
    details: "Product description and marketing plan description",
    imagePreview: "/images/profile.jpg",
  },
];

// Apply random images to all events
DEFAULT_EVENTS = updateEventsWithImages(DEFAULT_EVENTS);

const toDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const formatDateLabel = (date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const isBetween = (date, start, end) =>
  date.getTime() >= start.getTime() && date.getTime() <= end.getTime();

function getMonthMatrix(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const start = new Date(firstDay);
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(lastDay);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const matrix = [];
  let temp = new Date(start);

  while (temp <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(temp));
      temp.setDate(temp.getDate() + 1);
    }
    matrix.push(week);
  }

  return matrix;
}

function getRangeByView(view, currentDate) {
  const base = new Date(currentDate);
  base.setHours(0, 0, 0, 0);

  if (view === "day") {
    return { start: base, end: base };
  }

  if (view === "week") {
    const start = new Date(base);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  }

  const start = new Date(base.getFullYear(), base.getMonth(), 1);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  return { start, end };
}

const CalendarOfEvents = ({ language = "en", t, setCurrentPage, setLanguage, setBusinessToolId }) => {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadEvents = () => {
      const savedEvents = localStorage.getItem("scheduledEvents");
      if (savedEvents) {
        try {
          const parsed = JSON.parse(savedEvents);
          const allEvents = [...DEFAULT_EVENTS];
          const defaultIds = new Set(DEFAULT_EVENTS.map(e => e.id));
          parsed.forEach(ev => {
            if (!defaultIds.has(ev.id)) {
              allEvents.push(ev);
            }
          });
          setEvents(allEvents);
        } catch (e) {
          console.error("Error loading events:", e);
          setEvents(DEFAULT_EVENTS);
        }
      } else {
        setEvents(DEFAULT_EVENTS);
      }
    };

    loadEvents();

    const handleStorageChange = () => {
      loadEvents();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const savedEvents = localStorage.getItem("scheduledEvents");
      if (savedEvents) {
        try {
          const parsed = JSON.parse(savedEvents);
          const allEvents = [...DEFAULT_EVENTS];
          const defaultIds = new Set(DEFAULT_EVENTS.map(e => e.id));
          parsed.forEach(ev => {
            if (!defaultIds.has(ev.id)) {
              allEvents.push(ev);
            }
          });
          setEvents(allEvents);
        } catch (e) {
          console.error("Error loading events:", e);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Reset event index when date changes
  useEffect(() => {
    setSelectedEventIndex(0);
  }, [selectedDate]);

  const { start, end } = useMemo(
    () => getRangeByView(view, currentDate),
    [view, currentDate]
  );

  const visibleEvents = useMemo(
    () =>
      events.filter((ev) => {
        const d = toDate(ev.date);
        return (
          isBetween(d, start, end) &&
          (selectedCategory === "All" || ev.category === selectedCategory)
        );
      }),
    [start, end, selectedCategory, events]
  );

  const selectedDateEvents = useMemo(
    () => {
      if (selectedEvent) {
        return [selectedEvent];
      }
      return visibleEvents.filter((ev) => {
        const d = toDate(ev.date);
        return isSameDay(d, selectedDate);
      });
    },
    [selectedDate, selectedEvent, visibleEvents]
  );

  const monthMatrix = useMemo(
    () => getMonthMatrix(currentDate),
    [currentDate]
  );

  // Statistics for events
  const eventStats = useMemo(() => {
    const stats = {
      totalEvents: events.length,
      eventsByCategory: {},
      eventsByDate: {},
      mostActiveCategory: null,
      mostActiveDate: null
    };

    events.forEach(ev => {
      // Count by category
      stats.eventsByCategory[ev.category] = (stats.eventsByCategory[ev.category] || 0) + 1;
      // Count by date
      stats.eventsByDate[ev.date] = (stats.eventsByDate[ev.date] || 0) + 1;
    });

    // Find most active category
    let maxCategory = 0;
    Object.entries(stats.eventsByCategory).forEach(([cat, count]) => {
      if (count > maxCategory) {
        maxCategory = count;
        stats.mostActiveCategory = { name: cat, count };
      }
    });

    // Find most active date
    let maxDate = 0;
    Object.entries(stats.eventsByDate).forEach(([date, count]) => {
      if (count > maxDate) {
        maxDate = count;
        stats.mostActiveDate = { date, count };
      }
    });

    return stats;
  }, [events]);

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const title =
    view === "day"
      ? formatDateLabel(currentDate)
      : view === "week"
      ? `Week of ${formatDateLabel(start)} - ${formatDateLabel(end)}`
      : currentDate.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });

  return (
    <div className="calendar-of-events-page">
      <NavBar language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />

      <main className="calendar-of-events-main">
        <div className="container">
          <section className="events-section">
            <div className="events-header">
              <div>
                <h2 className="events-title">Monthly activity schedule</h2>
                <p className="events-subtitle">
                  MEET CEO for {currentDate.toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="events-view-toggle">
                {["day", "week", "month"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={
                      "toggle-btn" + (view === v ? " toggle-btn--active" : "")
                    }
                    onClick={() => setView(v)}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="events-toolbar">
              <div className="category-chips scrollable">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={
                      "category-chip" +
                      (selectedCategory === cat ? " category-chip--active" : "")
                    }
                    onClick={() => setSelectedCategory(cat)}
                    style={
                      selectedCategory === cat && cat !== "All"
                        ? {
                            backgroundColor: getCategoryColor(cat).bg,
                            color: getCategoryColor(cat).text,
                            borderColor: getCategoryColor(cat).border,
                          }
                        : {}
                    }
                  >
                    {cat !== "All" && (
                      <span
                        className="category-color-dot"
                        style={{
                          backgroundColor: getCategoryColor(cat).bg,
                          borderColor: getCategoryColor(cat).border,
                        }}
                      ></span>
                    )}
                    {cat}
                  </button>
                ))}
              </div>

              <div className="date-nav">
                <button className="nav-btn" onClick={handlePrev}>
                  ‹
                </button>
                <span className="date-label">{title}</span>
                <button className="nav-btn" onClick={handleNext}>
                  ›
                </button>
              </div>
            </div>

            <div className="calendar-container">
              <div className="calendar-wrapper">
                {view === "month" && (
                  <>
                    <div className="calendar-grid calendar-grid--header">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                        <div key={d} className="calendar-header-cell">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="calendar-grid month">
                      {monthMatrix.map((week, wi) =>
                        week.map((day, di) => {
                          const inMonth =
                            day.getMonth() === currentDate.getMonth();
                          const dayEvents = visibleEvents.filter((ev) =>
                            isSameDay(toDate(ev.date), day)
                          );
                          const hasEvent = dayEvents.length > 0;
                          const isSelected = isSameDay(day, selectedDate);

                          return (
                            <button
                              key={`${wi}-${di}`}
                              className={`calendar-day ${inMonth ? "" : "muted"} ${
                                isSelected ? "selected" : ""
                              }`}
                              onClick={() => {
                                setSelectedDate(new Date(day));
                                setCurrentDate(new Date(day));
                                setSelectedEvent(null);
                              }}
                            >
                              <span className="day-num">{day.getDate()}</span>
                              {hasEvent && (
                                <div className="day-events">
                                  {dayEvents.length > 0 && (
                                    <div 
                                      className="day-event-item"
                                      style={{
                                        backgroundColor: getCategoryColor(dayEvents[0].category).bg,
                                        color: getCategoryColor(dayEvents[0].category).text,
                                        borderLeft: `3px solid ${getCategoryColor(dayEvents[0].category).border}`,
                                      }}
                                    >
                                      {dayEvents[0].eventName || dayEvents[0].title}
                                    </div>
                                  )}
                                  {dayEvents.length > 1 && (
                                    <div className="day-event-item more">
                                      +{dayEvents.length - 1} more
                                    </div>
                                  )}
                                  <span className="dot"></span>
                                </div>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </>
                )}

                {view === "week" && (
                  <div className="week-grid">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const day = new Date(start);
                      day.setDate(start.getDate() + i);

                      const dayEvents = visibleEvents.filter((ev) =>
                        isSameDay(toDate(ev.date), day)
                      );

                      return (
                        <div key={i} className="week-col">
                          <div className="week-col-header">
                            <div className="week-name">
                              {day.toLocaleDateString("en-GB", {
                                weekday: "short",
                              })}
                            </div>
                            <div className="week-num">{day.getDate()}</div>
                          </div>

                          <div className="week-body">
                            {dayEvents.length === 0 ? (
                              <div className="week-empty">-</div>
                            ) : (
                              dayEvents.map((ev) => (
                                <div 
                                  key={ev.id} 
                                  className="week-pill"
                                  style={{
                                    backgroundColor: getCategoryColor(ev.category).light,
                                    borderLeft: `4px solid ${getCategoryColor(ev.category).border}`,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setSelectedDate(new Date(day));
                                    setCurrentDate(new Date(day));
                                    setSelectedEvent(ev);
                                  }}
                                >
                                  <div className="pill-time" style={{ color: getCategoryColor(ev.category).text }}>
                                    {ev.time}
                                  </div>
                                  <div className="pill-title" style={{ color: getCategoryColor(ev.category).text }}>
                                    {ev.title}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {view === "day" && (
                  <div className="day-view">
                    <div className="day-timeline">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const hour = 8 + i;
                        const timeStr = String(hour).padStart(2, "0") + ":00";

                        const dayEvents = visibleEvents.filter((ev) => {
                          const eventHour = parseInt(ev.time.split(":")[0]);
                          return eventHour === hour;
                        });

                        return (
                          <div key={i} className="time-slot">
                            <div className="time-label">{timeStr}</div>
                            <div className="time-content">
                              {dayEvents.map((ev) => (
                                <div 
                                  key={ev.id} 
                                  className="time-event"
                                  style={{
                                    backgroundColor: getCategoryColor(ev.category).light,
                                    borderLeft: `4px solid ${getCategoryColor(ev.category).border}`,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setSelectedDate(new Date(currentDate));
                                    setSelectedEvent(ev);
                                  }}
                                >
                                  <div 
                                    className="event-badge" 
                                    style={{ 
                                      backgroundColor: getCategoryColor(ev.category).border,
                                      color: "#ffffff",
                                    }}
                                  >
                                    {ev.time}
                                  </div>
                                  <div className="event-info">
                                    <div className="event-title-sm" style={{ color: getCategoryColor(ev.category).text }}>
                                      {ev.title}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="events-sidebar">
                <div 
                  className="sidebar-header-section"
                  style={
                    selectedDateEvents.length > 0
                      ? {
                          background: `linear-gradient(135deg, ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).bg} 0%, ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).light} 100%)`,
                          color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                        }
                      : {}
                  }
                >
                  <div className="sidebar-header">
                    <div 
                      className="sidebar-date-badge"
                      style={
                        selectedDateEvents.length > 0
                          ? { color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }
                          : {}
                      }
                    >
                      {selectedDate.toLocaleDateString("en-GB", { day: "2-digit" })}
                    </div>
                    <div 
                      className="sidebar-date-info"
                      style={
                        selectedDateEvents.length > 0
                          ? { color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }
                          : {}
                      }
                    >
                      <div className="sidebar-time">
                        {selectedDateEvents.length > 0
                          ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''}`
                          : "No events"}
                      </div>
                      <div className="sidebar-day">
                        {selectedDate.toLocaleDateString("en-GB", {
                          weekday: "long",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-avatar">
                    <div className="avatar-placeholder">
                      {selectedDateEvents.length > 0 && selectedDateEvents[selectedEventIndex].imagePreview ? (
                        <img 
                          src={selectedDateEvents[selectedEventIndex].imagePreview} 
                          alt="event" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span style={{ display: selectedDateEvents.length > 0 && selectedDateEvents[selectedEventIndex].imagePreview ? 'none' : 'flex' }}>
                        👤
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-content">
                  {selectedDateEvents.length === 0 ? (
                    <p className="sidebar-empty">No activities found.</p>
                  ) : (
                    <div className="sidebar-event-card">
                      {/* Event Navigation - Top */}
                      {selectedDateEvents.length > 1 && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px',
                          paddingBottom: '15px',
                          borderBottom: `2px solid ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).border}`
                        }}>
                          <button
                            onClick={() => setSelectedEventIndex(prev => prev === 0 ? selectedDateEvents.length - 1 : prev - 1)}
                            style={{
                              background: getCategoryColor(selectedDateEvents[selectedEventIndex].category).bg,
                              color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                              border: `2px solid ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).border}`,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            ← Back
                          </button>
                          <span style={{
                            fontWeight: 'bold',
                            color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                            fontSize: '14px'
                          }}>
                            {selectedEventIndex + 1} / {selectedDateEvents.length}
                          </span>
                          <button
                            onClick={() => setSelectedEventIndex(prev => prev === selectedDateEvents.length - 1 ? 0 : prev + 1)}
                            style={{
                              background: getCategoryColor(selectedDateEvents[selectedEventIndex].category).bg,
                              color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                              border: `2px solid ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).border}`,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            Next →
                          </button>
                        </div>
                      )}

                      {/* Time */}
                      <div style={{
                        color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        fontSize: '16px',
                        textAlign: 'center'
                      }}>
                        🕐 {selectedDateEvents[selectedEventIndex].time}
                      </div>

                      {/* Event Details */}
                      <div className="sidebar-section">
                        <h4 className="sidebar-section-title">EVENT NAME</h4>
                        <p className="sidebar-section-value">
                          {selectedDateEvents[selectedEventIndex].eventName || selectedDateEvents[selectedEventIndex].title}
                        </p>
                      </div>

                      <div className="sidebar-section">
                        <h4 className="sidebar-section-title">LECTURER</h4>
                        <p className="sidebar-section-value">{selectedDateEvents[selectedEventIndex].lecturer || "N/A"}</p>
                      </div>

                      <div className="sidebar-section">
                        <h4 className="sidebar-section-title">LOCATION</h4>
                        <p className="sidebar-section-value">{selectedDateEvents[selectedEventIndex].location || "N/A"}</p>
                      </div>

                      <div className="sidebar-section">
                        <h4 className="sidebar-section-title">DETAILS</h4>
                        <p className="sidebar-section-value">
                          {selectedDateEvents[selectedEventIndex].details || "No details available"}
                        </p>
                      </div>

                      {/* View Full Details Button */}
                      <button
                        onClick={() => setShowModal(true)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          marginTop: '15px',
                          background: getCategoryColor(selectedDateEvents[selectedEventIndex].category).bg,
                          color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                          border: `2px solid ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).border}`,
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        📖 View Full Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Event Details Modal */}
      {showModal && selectedDateEvents.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            animation: 'slideInUp 0.3s ease'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: `3px solid ${getCategoryColor(selectedDateEvents[selectedEventIndex].category).border}`
            }}>
              <h2 style={{
                margin: 0,
                color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                fontSize: '24px'
              }}>
                {selectedDateEvents[selectedEventIndex].eventName || selectedDateEvents[selectedEventIndex].title}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              {selectedDateEvents[selectedEventIndex].imagePreview && (
                <img 
                  src={selectedDateEvents[selectedEventIndex].imagePreview}
                  alt={selectedDateEvents[selectedEventIndex].lecturer}
                  style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    marginBottom: '15px'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>

            {/* Modal Content */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text, marginTop: 0 }}>Date & Time</h3>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>
                  📅 {new Date(selectedDateEvents[selectedEventIndex].date).toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>
                  🕐 {selectedDateEvents[selectedEventIndex].time}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }}>Category</h3>
                <p style={{ 
                  display: 'inline-block',
                  padding: '8px 12px',
                  backgroundColor: getCategoryColor(selectedDateEvents[selectedEventIndex].category).bg,
                  color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text,
                  borderRadius: '6px',
                  fontWeight: 'bold'
                }}>
                  {selectedDateEvents[selectedEventIndex].category}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }}>Lecturer</h3>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>
                  👤 {selectedDateEvents[selectedEventIndex].lecturer || "N/A"}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }}>Location</h3>
                <p style={{ margin: '5px 0', fontSize: '16px' }}>
                  📍 {selectedDateEvents[selectedEventIndex].location || "N/A"}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: getCategoryColor(selectedDateEvents[selectedEventIndex].category).text }}>Details</h3>
                <p style={{ margin: '5px 0', fontSize: '16px', lineHeight: '1.6' }}>
                  {selectedDateEvents[selectedEventIndex].details || "No details available"}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #eee'
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.target.style.background = '#e0e0e0'; }}
                onMouseLeave={(e) => { e.target.style.background = '#f0f0f0'; }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <section style={{
        padding: '50px 20px',
        background: '#f8f9fa',
        marginBottom: '30px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#1a1a1a',
            marginBottom: '45px',
            fontSize: '26px',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>
            📊 Statistics
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {/* Total Events */}
            <div style={{
              background: 'white',
              padding: '30px 25px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              border: '1px solid #e8e8e8'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }}
            >
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Total Events
              </p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#1a1a1a',
                margin: '0'
              }}>
                {eventStats.totalEvents}
              </p>
            </div>

            {/* Most Active Category */}
            <div style={{
              background: 'white',
              padding: '30px 25px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              border: '1px solid #e8e8e8'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }}
            >
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Most Active
              </p>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                margin: '0 0 8px 0',
                lineHeight: '1.3'
              }}>
                {eventStats.mostActiveCategory?.name || "N/A"}
              </p>
              <p style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                margin: '0'
              }}>
                {eventStats.mostActiveCategory?.count || 0} events
              </p>
            </div>

            {/* Busiest Date */}
            <div style={{
              background: 'white',
              padding: '30px 25px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              border: '1px solid #e8e8e8'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }}
            >
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Busiest Date
              </p>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                margin: '0 0 8px 0'
              }}>
                {eventStats.mostActiveDate ? new Date(eventStats.mostActiveDate.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : "N/A"}
              </p>
              <p style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                margin: '0'
              }}>
                {eventStats.mostActiveDate?.count || 0} events
              </p>
            </div>
          </div>

          {/* Categories Breakdown */}
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ 
              color: '#1a1a1a', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              paddingLeft: '5px'
            }}>
              Categories
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              {Object.entries(eventStats.eventsByCategory).map(([cat, count]) => (
                <div key={cat} style={{
                  background: 'white',
                  padding: '18px 20px',
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8',
                  borderLeft: `3px solid ${getCategoryColor(cat).border}`,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftWidth = '4px';
                  e.currentTarget.style.paddingLeft = '19px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftWidth = '3px';
                  e.currentTarget.style.paddingLeft = '20px';
                }}
                >
                  <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
                    {cat.length > 16 ? cat.substring(0, 16) + '...' : cat}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: getCategoryColor(cat).border }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CalendarOfEvents;
