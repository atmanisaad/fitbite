import React from "react";

const Header = ({ isnAuthenticated, handleLogout }) => {
  return (
    <header className="sticky top-0 bg-second-color text-white shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">FitBite</h1>
        <ul className="flex space-x-6">
          <li><a href="#home" className="hover:text-third-color">Accueil</a></li>
          <li><a href="#about" className="hover:text-third-color">À propos</a></li>
          <li><a href="#blog" className="hover:text-third-color">Blog</a></li>
          <li><a href="#contact" className="hover:text-third-color">Contact</a></li>
          <li><a href="#auth" className="hover:text-third-color">
            {isAuthenticated ? (
              <button onClick={handleLogout}>Déconnexion</button>
            ) : (
              "Connexion"
            )}
          </a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;