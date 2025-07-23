import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Auth from "./components/Auth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="pt-16">
        <Home />
        <About />
        <Blog isAuthenticated={isAuthenticated} />
        <Contact />
        <Auth
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </main>

      {/* Footer */}
      <footer className="bg-[#5f6caf] text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-semibold mb-2">💪 FitnessBlog</p>
          <p className="text-sm opacity-80">
            © 2025 - Votre partenaire fitness de confiance
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
