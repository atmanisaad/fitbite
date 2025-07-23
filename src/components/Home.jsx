import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-[#ff8364] to-[#ffb677] flex items-center justify-center text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transformez Votre Vie
            <span className="block text-[#edf7fa]">Avec Le Fitness</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Découvrez nos conseils experts en nutrition, entraînement et
            motivation pour atteindre vos objectifs de forme physique
          </p>
          <a
            href="#blog"
            className="inline-block bg-white text-[#ff8364] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#edf7fa] transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Voir le Blog 🚀
          </a>
        </div>
      </div>
      {/* Éléments décoratifs */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
    </section>
  );
};

export default Home;
