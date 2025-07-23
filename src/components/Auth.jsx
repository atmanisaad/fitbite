import React, { useState } from "react";

const Auth = ({ isAuthenticated, handleLogin, handleLogout }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      handleLogin(form.email, form.password);
      setForm({ email: "", password: "", confirmPassword: "", name: "" });
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

  if (isAuthenticated) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
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
            <p className="text-lg font-semibold text-[#ff8364] mb-8">
              {user.email}
            </p>
            <button
              onClick={handleLogout}
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
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 px-4 rounded-l-lg font-semibold transition-colors duration-300 ${
                  isLoginMode
                    ? "bg-[#5f6caf] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 px-4 rounded-r-lg font-semibold transition-colors duration-300 ${
                  !isLoginMode
                    ? "bg-[#5f6caf] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Inscription
              </button>
            </div>

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
                className="w-full bg-[#ff8364] text-white py-3 rounded-lg hover:bg-[#ffb677] transition-colors duration-300 font-semibold"
              >
                {isLoginMode ? "Se Connecter" : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Auth;
