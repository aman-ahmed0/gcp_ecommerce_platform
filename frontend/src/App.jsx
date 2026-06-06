import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    alert(`${product.name} added to cart!`);
  };

  const renderPage = () => {
    switch(currentPage) {
      case "home":
        return <HomePage products={products} loading={loading} addToCart={addToCart} />;
      case "products":
        return <ProductsPage products={products} loading={loading} addToCart={addToCart} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage products={products} loading={loading} addToCart={addToCart} />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} />
      {renderPage()}
      <Footer />
    </div>
  );
}

// Header Component
function Header({ currentPage, setCurrentPage, cartCount }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => setCurrentPage("home")} style={{cursor: "pointer"}}>
          <span className="logo-icon">⚡</span>
          <h1>TechGear Hub</h1>
        </div>
        <nav className="nav">
          <button 
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === "products" ? "active" : ""}`}
            onClick={() => setCurrentPage("products")}
          >
            Products
          </button>
          <button 
            className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            onClick={() => setCurrentPage("about")}
          >
            About
          </button>
          <button 
            className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
            onClick={() => setCurrentPage("contact")}
          >
            Contact
          </button>
        </nav>
        <div className="cart">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 TechGear Hub. Demo Project by Ahmed Fawzy</p>
        <p className="footer-note">Built with React + FastAPI + MongoDB • DevOps Portfolio Project</p>
      </div>
    </footer>
  );
}

// Home Page
function HomePage({ products, loading, addToCart }) {
  const featuredProducts = products.slice(0, 3);

  if (loading) return <LoadingScreen />;

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Premium Tech Accessories</h1>
          <p>Quality gear for developers, creators, and tech enthusiasts</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// Products Page
function ProductsPage({ products, loading, addToCart }) {
  if (loading) return <LoadingScreen />;

  return (
    <main className="container section">
      <h2 className="section-title">All Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}

// About Page
function AboutPage() {
  return (
    <main className="container section">
      <div className="about-content">
        <h2 className="section-title">About This Project</h2>
        <div className="about-card">
          <p className="about-intro">
            This is a demo ecommerce app for end-to-end DevOps practices.
          </p>
          
          <div className="tech-stack">
            <h3>Technology Stack</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-icon">⚛️</span>
                <span>React + Vite</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🐍</span>
                <span>FastAPI</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🍃</span>
                <span>MongoDB</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🐳</span>
                <span>Docker</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">☸️</span>
                <span>Kubernetes</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🔄</span>
                <span>GitHub Actions</span>
              </div>
            </div>
          </div>

          <div className="project-goals">
            <h3>Learning Objectives</h3>
            <ul>
              <li>✅ Container orchestration with Kubernetes</li>
              <li>✅ CI/CD pipeline automation</li>
              <li>✅ Infrastructure as Code with Terraform</li>
              <li>✅ GitOps practices with ArgoCD</li>
              <li>✅ Cloud deployment on GCP</li>
              <li>✅ Monitoring and observability</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

// Contact Page
function ContactPage() {
  return (
    <main className="container section">
      <div className="contact-wrapper">
        <h2 className="section-title">Contact & Portfolio</h2>
        
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Developer</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">👤</span>
                <div>
                  <strong>Name</strong>
                  <p>Ahmed Fawzy</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>ahmad.fawzzi@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <div>
                  <strong>LinkedIn</strong>
                  <a href="https://www.linkedin.com/in/ahmed-abdelsamad-2825851b0/" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/ahmed-abdelsamad
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🐙</span>
                <div>
                  <strong>GitHub</strong>
                  <a href="https://github.com/AhmeFawzy/gcp_ecommerce_platform" target="_blank" rel="noopener noreferrer">
                    github.com/AhmeFawzy/gcp_ecommerce_platform
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h3>Project Repository</h3>
            <div className="repo-info">
              <p>This project demonstrates end-to-end DevOps practices including:</p>
              <ul>
                <li>🔧 Infrastructure as Code (Terraform)</li>
                <li>🚀 CI/CD Pipelines (GitHub Actions)</li>
                <li>☸️ Container Orchestration (Kubernetes/GKE)</li>
                <li>🔄 GitOps (ArgoCD)</li>
                <li>📊 Monitoring (Prometheus + Grafana)</li>
                <li>🐳 Containerization (Docker)</li>
              </ul>
              <a 
                href="https://github.com/AhmeFawzy/gcp_ecommerce_platform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-button"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Loading Screen
function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Empty State
function EmptyState() {
  const seedDatabase = () => {
    fetch(`${API_URL}/seed`, { method: "POST" })
      .then(() => window.location.reload());
  };

  return (
    <div className="empty-state">
      <p>No products available.</p>
      <button className="seed-button" onClick={seedDatabase}>
        🌱 Seed Sample Products
      </button>
    </div>
  );
}

export default App;