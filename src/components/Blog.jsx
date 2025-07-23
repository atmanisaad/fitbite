import React, { useState, useEffect } from "react";

const Blog = ({ isAuthenticated }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    category: "Entraînement",
    image: "🏋️",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const API_BASE_URL = "http://localhost:3000";

  // Fetch articles from API
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Debug: Check the structure of your data
      console.log("Fetched articles:", data);
      console.log("First article:", data[0]);
      console.log("First article ID:", data[0]?.id);
      console.log("First article _id:", data[0]?._id);

      setArticles(data);
      setError(null);
    } catch (err) {
      setError(`Erreur lors du chargement: ${err.message}`);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Add new article via API
  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (newArticle.title && newArticle.summary) {
      try {
        const articleData = {
          ...newArticle,
          date: new Date().toISOString().split("T")[0],
        };

        const response = await fetch(`${API_BASE_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdArticle = await response.json();

        // Add the new article to the beginning of the list
        setArticles([createdArticle, ...articles]);

        // Reset form
        setNewArticle({
          title: "",
          summary: "",
          category: "Entraînement",
          image: "🏋️",
        });
        setShowAddForm(false);
        setError(null);
      } catch (err) {
        setError(`Erreur lors de l'ajout: ${err.message}`);
        console.error("Add error:", err);
      }
    }
  };

  // Delete article via API - FIXED
  const handleDeleteArticle = async (id) => {
    try {
      console.log("Deleting post with ID:", id); // Debug log

      // Validate that we have an ID
      if (!id) {
        throw new Error("No ID provided for deletion");
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Delete result:", result);

      // Remove article from local state - FIXED
      setArticles(
        articles.filter((article) => (article._id || article.id) !== id)
      );
      setError(null);
    } catch (err) {
      setError(`Erreur lors de la suppression: ${err.message}`);
      console.error("Delete error:", err);
    }
  };

  const categoryColors = {
    Entraînement: "bg-[#ff8364]",
    Nutrition: "bg-[#ffb677]",
    Motivation: "bg-[#5f6caf]",
  };

  // Loading state
  if (loading) {
    return (
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5f6caf] mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">
              Chargement des articles...
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Error message */}
        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
            <button
              onClick={fetchArticles}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Réessayer
            </button>
          </div>
        )}

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

        {/* Grille des articles - FIXED */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">Aucun article disponible</p>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article._id || article.id} // FIXED: Use _id as key
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`${
                        categoryColors[article.category] || "bg-gray-500"
                      } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {article.category}
                    </span>
                    <div className="text-4xl">{article.image || "📝"}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#5f6caf] mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                    {isAuthenticated && (
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            handleDeleteArticle(article._id || article.id)
                          } // FIXED: Use _id
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors duration-300"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
