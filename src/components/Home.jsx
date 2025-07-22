import React from "react";

const Home = () => {
  return (
    <section id="home" className="h-screen bg-fourth-color text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Transformez votre vie avec le fitness</h1>
        <p className="text-lg mb-6">Motivation, nutrition et entraînement pour une meilleure santé.</p>
        <a href="#blog" className="bg-third-color text-white px-6 py-3 rounded-lg hover:bg-white hover:text-fourth-color transition">
          Voir le blog
        </a>
      </div>
    </section>
  );
};

export default Home;