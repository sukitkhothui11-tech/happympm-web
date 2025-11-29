import React, { useState, useMemo } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./newsArticleDetail.css";

const NewsArticleDetail = ({ language = "en", t, setCurrentPage, setLanguage, setBusinessToolId, articleId = 1 }) => {
  // Article data - สามารถเอาไปใส่ database ในอนาคต
  const articlesData = {
    1: {
      id: 1,
      title: t.newsArticles?.articles?.mainNews?.title || "26 Years of Happy MPM",
      image: "/images/news-articles/26 years.jpg",
      date: "May 29, 2024",
      category: "Anniversary",
      author: "Happy MPM Team",
      readTime: "5 min read",
      content: `
        <p>Happy MPM is celebrating 26 years of excellence in direct selling and networking. Over these two decades, we have grown from a small startup to a leading company in the industry, serving thousands of members across Southeast Asia.</p>
        
        <h3>Our Journey</h3>
        <p>Founded in 1998, Happy MPM started with a vision to empower entrepreneurs and create a platform for business growth. Through dedication and innovation, we have continuously evolved to meet the changing needs of our members.</p>
        
        <p>Our commitment to quality products and excellent customer service has been the cornerstone of our success. We have built a community of passionate entrepreneurs who believe in the power of networking and collaboration.</p>
        
        <h3>Achievements</h3>
        <ul>
          <li>Over 50,000 active members worldwide</li>
          <li>Expansion to 8 countries in Asia</li>
          <li>100+ award-winning products</li>
          <li>Continuous innovation in business tools and training</li>
        </ul>
        
        <h3>Looking Ahead</h3>
        <p>As we move forward, we remain committed to providing the best platform for our members to succeed. We will continue to innovate, improve our services, and support our community in reaching their business goals.</p>
      `,
      summary: "Happy MPM celebrates 26 years of success and innovation in the direct selling industry.",
      tags: ["Anniversary", "Company News", "Milestone"]
    },
    2: {
      id: 2,
      title: t.newsArticles?.articles?.article1?.title || "Open House Event 2024",
      image: "/images/news-articles/Open House.jpg",
      date: "May 25, 2024",
      category: "Events",
      author: "Marketing Team",
      readTime: "3 min read",
      content: `
        <p>Join us for our annual Open House event where you can learn more about Happy MPM's business opportunities and product lines.</p>
        
        <h3>Event Details</h3>
        <p><strong>Date:</strong> June 15, 2024</p>
        <p><strong>Time:</strong> 10:00 AM - 5:00 PM</p>
        <p><strong>Location:</strong> Happy MPM Headquarters, Bangkok, Thailand</p>
        
        <h3>What to Expect</h3>
        <ul>
          <li>Product showcase and demonstrations</li>
          <li>Business opportunity presentations</li>
          <li>Expert seminars and training sessions</li>
          <li>Meet-and-greet with company leaders</li>
          <li>Special giveaways and prizes</li>
        </ul>
        
        <p>Whether you're a current member or interested in joining our community, this is a great opportunity to learn, network, and discover exciting opportunities with Happy MPM.</p>
        
        <p><strong>Registration is free!</strong> Simply register online or visit our office to secure your spot.</p>
      `,
      summary: "Annual Open House event featuring product showcases, business opportunities, and training sessions.",
      tags: ["Events", "Product Launch", "Networking"]
    },
    3: {
      id: 3,
      title: t.newsArticles?.articles?.article2?.title || "Congratulations to Our Top Performers",
      image: "/images/news-articles/Congratulations.jpg",
      date: "May 20, 2024",
      category: "Business",
      author: "HR Department",
      readTime: "4 min read",
      content: `
        <p>We're thrilled to announce the recognition of our top-performing members for Q1 2024. Their dedication and hard work exemplify the spirit of Happy MPM.</p>
        
        <h3>Top Performers Recognition</h3>
        <p>This quarter, we celebrated outstanding achievements from members across multiple categories including sales, recruitment, and customer satisfaction.</p>
        
        <h3>Featured Achievers</h3>
        <ul>
          <li><strong>Top Sales Representative:</strong> Ms. Somchai Pattanasilp - Exceeded quota by 150%</li>
          <li><strong>Best New Member:</strong> Mr. Ananda Kumar - Impressive growth in first quarter</li>
          <li><strong>Customer Service Excellence:</strong> Mrs. Pratuang Sombat - 99.5% customer satisfaction</li>
          <li><strong>Team Leadership:</strong> Mr. Vikram Singh - Successfully trained 25 new members</li>
        </ul>
        
        <h3>Recognition Rewards</h3>
        <p>Top performers will receive cash bonuses, exclusive travel packages, and recognition at our annual awards ceremony.</p>
        
        <p>We encourage all members to strive for excellence and be inspired by these success stories. Remember, success in Happy MPM is achievable with dedication, hard work, and the right support system.</p>
      `,
      summary: "Recognition of outstanding members who achieved excellence in sales, recruitment, and customer service.",
      tags: ["Business", "Recognition", "Success Stories"]
    },
    4: {
      id: 4,
      title: t.newsArticles?.articles?.article3?.title || "We Express Our Gratitude",
      image: "/images/news-articles/We express.jpg",
      date: "May 15, 2024",
      category: "Announcements",
      author: "Leadership Team",
      readTime: "2 min read",
      content: `
        <p>On behalf of the entire Happy MPM family, we would like to express our heartfelt gratitude to all our members for their unwavering support and dedication.</p>
        
        <h3>Our Appreciation</h3>
        <p>Your trust, loyalty, and commitment have been instrumental in our continued growth and success. Every milestone we reach is a testament to your hard work and belief in our mission.</p>
        
        <h3>Together We Grow</h3>
        <p>We are committed to continuously improving our services, offering better products, and creating more opportunities for your success. Your feedback and suggestions help us evolve and serve you better.</p>
        
        <p>As we move forward, we remain dedicated to building a stronger, more vibrant community where everyone can thrive and achieve their business goals.</p>
        
        <p>Thank you for being part of the Happy MPM family. Here's to many more years of mutual success and prosperity!</p>
      `,
      summary: "Leadership expresses gratitude and reaffirms commitment to member success.",
      tags: ["Announcements", "Company Message", "Appreciation"]
    },
    5: {
      id: 5,
      title: t.newsArticles?.articles?.article4?.title || "Happy MPM Community Event",
      image: "/images/news-articles/Happy MPM.jpg",
      date: "May 10, 2024",
      category: "Events",
      author: "Community Team",
      readTime: "3 min read",
      content: `
        <p>Last week, we hosted an incredible community gathering that brought together members from across the region for networking, learning, and celebration.</p>
        
        <h3>Event Highlights</h3>
        <ul>
          <li>250+ members participated from 5 countries</li>
          <li>Interactive workshops on personal development and business skills</li>
          <li>Networking sessions with successful entrepreneurs</li>
          <li>Cultural performances and entertainment</li>
          <li>Awards ceremony celebrating member achievements</li>
        </ul>
        
        <h3>Key Takeaways</h3>
        <p>Participants gained valuable insights into business growth strategies, personal development, and the importance of community support. The positive energy and enthusiasm demonstrated by all attendees were truly inspiring.</p>
        
        <p>We're already planning our next event! Stay tuned for announcements and mark your calendars.</p>
      `,
      summary: "Community gathering bringing together 250+ members for networking and celebration.",
      tags: ["Events", "Community", "Networking"]
    },
    6: {
      id: 6,
      title: t.newsArticles?.articles?.article5?.title || "New Training Program Launched",
      image: "/images/news-articles/Happy MPM.jpg",
      date: "May 5, 2024",
      category: "Training",
      author: "Training Department",
      readTime: "4 min read",
      content: `
        <p>We're excited to announce the launch of our comprehensive new training program designed to help members at all levels achieve their business goals.</p>
        
        <h3>Program Overview</h3>
        <p>The "Excellence Pathway" is a structured training program that guides members through all aspects of building a successful Happy MPM business.</p>
        
        <h3>Program Modules</h3>
        <ul>
          <li><strong>Foundation Level:</strong> Basic business principles and product knowledge</li>
          <li><strong>Intermediate Level:</strong> Sales techniques and team building</li>
          <li><strong>Advanced Level:</strong> Leadership development and strategic growth</li>
          <li><strong>Master Level:</strong> Mentoring and creating lasting legacy</li>
        </ul>
        
        <h3>Features</h3>
        <p>The program includes online courses, live webinars, one-on-one coaching sessions, and exclusive resources. All training is available in multiple languages to serve our diverse community.</p>
        
        <p>Enrollment is now open! Visit our training portal to register and begin your journey to success.</p>
      `,
      summary: "New comprehensive training program for member development at all levels.",
      tags: ["Training", "Development", "Education"]
    },
    7: {
      id: 7,
      title: t.newsArticles?.articles?.article6?.title || "Awards Ceremony 2024",
      image: "/images/news-articles/26 years.jpg",
      date: "April 30, 2024",
      category: "Events",
      author: "Events Team",
      readTime: "5 min read",
      content: `
        <p>The Annual Awards Ceremony 2024 was a spectacular event celebrating the outstanding achievements of our members throughout the past year.</p>
        
        <h3>Award Categories</h3>
        <ul>
          <li>Excellence in Sales</li>
          <li>Top Team Builder</li>
          <li>Most Improved Member</li>
          <li>Customer Service Star</li>
          <li>Leadership Excellence</li>
          <li>Community Impact Award</li>
        </ul>
        
        <h3>Event Highlights</h3>
        <p>Attended by company leadership, award recipients, and members from across our network, the ceremony recognized excellence and celebrated success stories that inspire our entire community.</p>
        
        <p>Special performances and entertainment added to the festive atmosphere, making it a memorable evening for all attendees.</p>
      `,
      summary: "Annual Awards Ceremony celebrating member achievements and recognizing excellence.",
      tags: ["Events", "Awards", "Recognition"]
    },
    8: {
      id: 8,
      title: t.newsArticles?.articles?.article7?.title || "Product Innovation Update",
      image: "/images/news-articles/Open House.jpg",
      date: "April 25, 2024",
      category: "Business",
      author: "Product Team",
      readTime: "3 min read",
      content: `
        <p>We're committed to continuous innovation in our product line. This quarter, we've launched several new products designed based on member feedback and market research.</p>
        
        <h3>New Product Launches</h3>
        <ul>
          <li><strong>Premium Wellness Series:</strong> Advanced nutritional supplements for health-conscious consumers</li>
          <li><strong>Beauty Innovation Line:</strong> Natural skincare products with sustainable packaging</li>
          <li><strong>Smart Health Monitor:</strong> IoT-enabled device for personal health tracking</li>
        </ul>
        
        <h3>Member Benefits</h3>
        <p>All members receive exclusive access to new products before public launch, special pricing, and comprehensive training materials.</p>
        
        <p>We believe these new products will open exciting sales opportunities and help our members grow their businesses.</p>
      `,
      summary: "Launch of innovative products based on member feedback and market research.",
      tags: ["Products", "Innovation", "Business"]
    }
  };

  const article = articlesData[articleId] || articlesData[1];

  // Get related articles (exclude current one)
  const relatedArticles = useMemo(() => {
    return Object.values(articlesData)
      .filter(a => a.id !== articleId && a.category === article.category)
      .slice(0, 3);
  }, [articleId, article.category]);

  return (
    <div className="news-article-detail-page">
      <NavBar language={language} t={t} setCurrentPage={setCurrentPage} setLanguage={setLanguage} setBusinessToolId={setBusinessToolId} />

      <main className="news-article-detail-main">
        {/* Hero Section */}
        <div className="article-hero">
          <img src={article.image} alt={article.title} className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-content">
              <button 
                className="back-button"
                onClick={() => setCurrentPage("home")}
              >
                ← {language === "th" ? "กลับ" : "Back"}
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="article-container">
          <article className="article-main">
            {/* Article Header */}
            <div className="article-header">
              <div className="article-meta">
                <span className="category-badge">{article.category}</span>
                <span className="article-date">{article.date}</span>
                <span className="read-time">📖 {article.readTime}</span>
              </div>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-author">
                <span className="author-name">By {article.author}</span>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Tags */}
            <div className="article-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            {/* Share Section */}
            <div className="article-share">
              <h4>{language === "th" ? "แชร์บทความนี้" : "Share This Article"}</h4>
              <div className="share-buttons">
                <button className="share-btn facebook" title="Share on Facebook">f</button>
                <button className="share-btn twitter" title="Share on Twitter">𝕏</button>
                <button className="share-btn linkedin" title="Share on LinkedIn">in</button>
                <button className="share-btn copy" title="Copy Link">🔗</button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Article Summary */}
            <div className="sidebar-widget">
              <h3>{language === "th" ? "สรุป" : "Summary"}</h3>
              <p>{article.summary}</p>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="sidebar-widget">
                <h3>{language === "th" ? "บทความที่เกี่ยวข้อง" : "Related Articles"}</h3>
                <div className="related-articles">
                  {relatedArticles.map(related => (
                    <div 
                      key={related.id} 
                      className="related-article-item"
                      onClick={() => {
                        setCurrentPage("newsArticleDetail");
                        // In real implementation, would need to pass articleId
                      }}
                    >
                      <img src={related.image} alt={related.title} />
                      <h4>{related.title}</h4>
                      <p className="related-date">{related.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default NewsArticleDetail;
