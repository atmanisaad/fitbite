import React from "react";

const Header = ({ isAuthenticated, handleLogout }) => {
  return (
    <header className="fixed top-0 w-full bg-[#5f6caf] text-white shadow-lg z-50 transition-all duration-300">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">💪 FitBite</div>
        <ul className="hidden md:flex space-x-8">
          <li>
            <a
              href="#home"
              className="hover:text-[#ffb677] transition-colors duration-300"
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-[#ffb677] transition-colors duration-300"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="#blog"
              className="hover:text-[#ffb677] transition-colors duration-300"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-[#ffb677] transition-colors duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-[#ff8364] px-4 py-2 rounded-lg hover:bg-[#ffb677] transition-colors duration-300"
              >
                Déconnexion
              </button>
            ) : (
              <a
                href="#auth"
                className="bg-[#ff8364] px-4 py-2 rounded-lg hover:bg-[#ffb677] transition-colors duration-300"
              >
                Connexion
              </a>
            )}
          </li>
        </ul>
        {/* Menu mobile */}
        <div className="md:hidden">
          <button className="text-white">☰</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
