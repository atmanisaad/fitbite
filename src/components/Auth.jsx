import React, { useState, useEffect } from "react";

const Auth = ({ isAuthenticated, handleLogin, handleLogout }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const API_BASE_URL = "https://backfitbite-production.up.railway.app/";

  // Fetch user data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    try {
      // Get user ID from localStorage or wherever you store it
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser.id || storedUser._id;

      if (userId) {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.error("Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email invalide";
    if (!form.password) newErrors.password = "Le mot de passe est requis";
    else if (form.password.length < 6)
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";

    if (!isLoginMode) {
      if (!form.name.trim()) newErrors.name = "Le nom est requis";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setErrors({});

      try {
        if (isLoginMode) {
          // Login API call
          const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            handleLogin(data.user.email, form.password);
            setForm({ email: "", password: "", confirmPassword: "", name: "" });
          } else {
            const errorData = await response.json();
            setErrors({ general: errorData.error || "Erreur de connexion" });
          }
        } else {
          // Register API call
          const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              password: form.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            handleLogin(data.user.email, form.password);
            setForm({ email: "", password: "", confirmPassword: "", name: "" });
          } else {
            const errorData = await response.json();
            setErrors({ general: errorData.error || "Erreur d'inscription" });
          }
        }
      } catch (error) {
        setErrors({ general: "Erreur de connexion au serveur" });
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogoutClick = () => {
    // Clear user data
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    handleLogout();
  };

  if (isAuthenticated) {
    const displayUser =
      user || JSON.parse(localStorage.getItem("user") || "{}");

    return (
      <section id="auth" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto bg-[#edf7fa] p-8 rounded-xl shadow-lg">
            <div className="text-6xl mb-6">👋</div>
            <h2 className="text-3xl font-bold text-[#5f6caf] mb-4">
              Bienvenue !
            </h2>
            <p className="text-gray-600 mb-6">
              Vous êtes connecté en tant que :
            </p>

            {/* Display user information */}
            <div className="mb-6 p-4 bg-white rounded-lg">
              {displayUser.name && (
                <p className="text-lg font-semibold text-[#5f6caf] mb-2">
                  {displayUser.name}
                </p>
              )}
              <p className="text-md text-[#ff8364] mb-2">{displayUser.email}</p>
              {displayUser._id && (
                <p className="text-sm text-gray-500">ID: {displayUser._id}</p>
              )}
            </div>

            <button
              onClick={handleLogoutClick}
              className="bg-[#ff8364] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-semibold"
            >
              Se Déconnecter
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auth" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5f6caf] mb-6">
            {isLoginMode ? "Connexion" : "Inscription"}
          </h2>
          <div className="w-24 h-1 bg-[#ffb677] mx-auto"></div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-[#edf7fa] p-8 rounded-xl shadow-lg">
            <div className="flex mb-6">
              <button
                onClick={() => {
                  setIsLoginMode(true);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-l-lg font-semibold transition-colors duration-300 ${
                  isLoginMode
                    ? "bg-[#5f6caf] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  setIsLoginMode(false);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-r-lg font-semibold transition-colors duration-300 ${
                  !isLoginMode
                    ? "bg-[#5f6caf] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Inscription
              </button>
            </div>

            {/* General error message */}
            {errors.general && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label className="block text-[#5f6caf] font-semibold mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Votre nom"
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-[#5f6caf] font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="votre@email.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[#5f6caf] font-semibold mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-[#5f6caf] font-semibold mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ff8364] hover:bg-[#ffb677]"
                } text-white`}
              >
                {loading
                  ? "Chargement..."
                  : isLoginMode
                  ? "Se Connecter"
                  : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
