import React, { useState } from "react";

const Auth = ({ isAuthenticated, handleLogin, handleLogout }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(form.email, form.password);
    setForm({ email: "", password: "" });
  };

  return (
    <section id="auth" className="py-16 bg-first-color">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-second-color mb-6">
          {isAuthenticated ? "Bienvenue !" : "Connexion / Inscription"}
        </h2>
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-third-color text-white px-6 py-3 rounded-lg hover:bg-fourth-color"
            >
              Se connecter
            </button>
          </form>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-fourth-color text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Déconnexion
          </button>
        )}
      </div>
    </section>
  );
};

export default Auth;