import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-first-color">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-second-color mb-6">À propos</h2>
        <p className="text-lg mb-6">
          Bienvenue sur notre blog de fitness ! Nous partageons des conseils sur la forme physique, la nutrition et la motivation pour vous aider à atteindre vos objectifs.
        </p>
        <img
          src="https://via.placeholder.com/600x400"
          alt="Fitness"
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default About;