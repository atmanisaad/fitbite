import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#edf7fa]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5f6caf] mb-6">
            À Propos de Notre Blog
          </h2>
          <div className="w-24 h-1 bg-[#ffb677] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#5f6caf] mb-4">
              Notre Mission
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bienvenue sur FitBite, votre destination ultime pour tout ce qui
              concerne la forme physique, la nutrition et la motivation. Notre
              mission est de vous accompagner dans votre parcours vers une vie
              plus saine et plus épanouie.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">🏋️</div>
                <h4 className="font-bold text-[#5f6caf] mb-2">
                  Forme Physique
                </h4>
                <p className="text-sm text-gray-600">
                  Exercices et programmes adaptés
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">🥗</div>
                <h4 className="font-bold text-[#5f6caf] mb-2">Nutrition</h4>
                <p className="text-sm text-gray-600">
                  Conseils alimentaires équilibrés
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">💪</div>
                <h4 className="font-bold text-[#5f6caf] mb-2">Motivation</h4>
                <p className="text-sm text-gray-600">
                  Inspiration et encouragement
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#ffb677] to-[#ff8364] p-8 rounded-2xl shadow-xl">
              <div className="bg-white p-6 rounded-xl">
                <div className="text-6xl text-center mb-4">🏃‍♀️</div>
                <h4 className="text-xl font-bold text-[#5f6caf] text-center mb-4">
                  Votre Parcours Commence Ici
                </h4>
                <p className="text-gray-700 text-center">
                  Rejoignez notre communauté de passionnés de fitness et
                  découvrez comment transformer votre style de vie étape par
                  étape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
