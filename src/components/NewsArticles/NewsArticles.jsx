import React, { useState } from "react";
import "./newsArticles.css";

const NewsArticles = ({ language, t, setCurrentPage, setArticleId }) => {
  const [activeTab, setActiveTab] = useState("all");

  const mainNews = {
    id: 1,
    title: t.newsArticles.articles.mainNews.title,
    subtitle: t.newsArticles.articles.mainNews.subtitle,
    date: "5 months ago",
    image: "/images/news-articles/26 years.jpg",
    tag: t.newsArticles.articles.mainNews.tag,
  };

  const articles = [
    {
      id: 2,
      title: t.newsArticles.articles.article1.title,
      date: "5 months ago",
      category: "Events",
      image: "/images/news-articles/Open House.jpg",
    },
    {
      id: 3,
      title: t.newsArticles.articles.article2.title,
      date: "5 months ago",
      category: "Business",
      image: "/images/news-articles/Congratulations.jpg",
    },
    {
      id: 4,
      title: t.newsArticles.articles.article3.title,
      date: "5 months ago",
      category: "Announcements",
      image: "/images/news-articles/We express.jpg",
    },
    {
      id: 5,
      title: t.newsArticles.articles.article4.title,
      date: "5 months ago",
      category: "Events",
      image: "/images/news-articles/Happy MPM.jpg",
    },
    {
      id: 6,
      title: t.newsArticles.articles.article5.title,
      date: "4 months ago",
      category: "Training",
      image: "/images/news-articles/Happy MPM.jpg",
    },
    {
      id: 7,
      title: t.newsArticles.articles.article6.title,
      date: "4 months ago",
      category: "Events",
      image: "/images/news-articles/26 years.jpg",
    },
    {
      id: 8,
      title: t.newsArticles.articles.article7.title,
      date: "4 months ago",
      category: "Business",
      image: "/images/news-articles/Open House.jpg",
    },
  ];

  const filteredArticles = activeTab === "all" 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === activeTab.toLowerCase());

  const categories = [t.newsArticles.allNews, t.newsArticles.events, t.newsArticles.business, t.newsArticles.training, t.newsArticles.announcements];

  return (
    <section className="news-articles-section">
      <div className="container">
        {/* Header */}
        <div className="news-articles-header">
          <h1 className="section-title">{t.newsArticles.title}</h1>
        </div>

        <div className="news-articles-container">
          {/* Main News */}
          <div className="main-news-section">
            <div 
              className="main-news-card"
              onClick={() => {
                setArticleId(mainNews.id);
                setCurrentPage("newsArticleDetail");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="main-news-image">
                <img src={mainNews.image} alt={mainNews.title} />
                <span className="news-tag">{mainNews.tag}</span>
              </div>
              <div className="main-news-content">
                <h2 className="main-news-title">{mainNews.title}</h2>
                <p className="main-news-subtitle">{mainNews.subtitle}</p>
                <p className="news-date">{mainNews.date}</p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <div className="articles-section">
            {/* Category Tabs */}
            <div className="articles-header">
              <h3 className="articles-title">{language === "th" ? "บทความ" : "Articles"}</h3>
              <div className="category-tabs">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-tab ${activeTab === category.toLowerCase() ? "active" : ""}`}
                    onClick={() => setActiveTab(category.toLowerCase())}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="articles-list">
              {filteredArticles.map((article, index) => (
                <div key={article.id} className="article-item">
                  <div className="article-number">{index + 1}</div>
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="article-content">
                    <h4 className="article-title">{article.title}</h4>
                    <p className="article-date">{article.date}</p>
                  </div>
                  <button 
                    className="read-more-btn"
                    onClick={() => {
                      setArticleId(article.id);
                      setCurrentPage("newsArticleDetail");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {language === "th" ? "อ่านเพิ่มเติม" : "Read more"} →
                  </button>
                </div>
              ))}
            </div>

            {/* Read All News Button */}
            <div className="read-all-news">
              <a href="#all-news" className="read-all-news-link">
                {language === "th" ? "อ่านข่าวทั้งหมด" : "Read All News"} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsArticles;
