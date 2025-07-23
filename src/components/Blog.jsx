import React, { useState } from "react";

const Blog = ({ isAuthenticated }) => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "5 Exercices pour Débutants",
      summary:
        "Commencez votre parcours fitness avec ces exercices simples mais efficaces, parfaits pour les débutants.",
      date: "2025-07-20",
      image: "🏋️‍♀️",
      category: "Entraînement",
    },
    {
      id: 2,
      title: "Guide Nutrition Complète",
      summary:
        "Apprenez les bases d'une alimentation équilibrée pour optimiser vos performances et votre santé.",
      date: "2025-07-18",
      image: "🥗",
      category: "Nutrition",
    },
    {
      id: 3,
      title: "Motivation : Rester Constant",
      summary:
        "Découvrez les secrets pour maintenir votre motivation sur le long terme et atteindre vos objectifs.",
      date: "2025-07-15",
      image: "💪",
      category: "Motivation",
    },
  ]);

  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    category: "Entraînement",
    image: "🏋️",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddArticle = (e) => {
    e.preventDefault();
    if (newArticle.title && newArticle.summary) {
      const article = {
        ...newArticle,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      };
      setArticles([article, ...articles]);
      setNewArticle({
        title: "",
        summary: "",
        category: "Entraînement",
        image: "🏋️",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const categoryColors = {
    Entraînement: "bg-[#ff8364]",
    Nutrition: "bg-[#ffb677]",
    Motivation: "bg-[#5f6caf]",
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5f6caf] mb-6">
            Notre Blog Fitness
          </h2>
          <div className="w-24 h-1 bg-[#ffb677] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos derniers articles sur le fitness, la nutrition et la
            motivation
          </p>
        </div>

        {/* Bouton Ajouter Article (visible si connecté) */}
        {isAuthenticated && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#ffb677] text-white px-6 py-3 rounded-lg hover:bg-[#ff8364] transition-colors duration-300 font-semibold"
            >
              {showAddForm ? "Annuler" : "➕ Ajouter un Article"}
            </button>
          </div>
        )}

        {/* Formulaire d'ajout d'article */}
        {isAuthenticated && showAddForm && (
          <div className="mb-12 bg-[#edf7fa] p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#5f6caf] mb-6">
              Nouvel Article
            </h3>
            <form onSubmit={handleAddArticle} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#5f6caf] font-semibold mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, title: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent"
                    placeholder="Titre de l'article"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f6caf] font-semibold mb-2">
                    Catégorie
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, category: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent"
                  >
                    <option value="Entraînement">Entraînement</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Motivation">Motivation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#5f6caf] font-semibold mb-2">
                  Résumé
                </label>
                <textarea
                  value={newArticle.summary}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, summary: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent h-32"
                  placeholder="Résumé de l'article"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#ff8364] text-white px-8 py-3 rounded-lg hover:bg-[#ffb677] transition-colors duration-300 font-semibold"
              >
                Publier l'Article
              </button>
            </form>
          </div>
        )}

        {/* Grille des articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`${
                      categoryColors[article.category]
                    } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {article.category}
                  </span>
                  <div className="text-4xl">{article.image}</div>
                </div>
                <h3 className="text-xl font-bold text-[#5f6caf] mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  {isAuthenticated && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors duration-300"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
