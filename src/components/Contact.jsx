import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Le nom est requis";
    if (!form.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email invalide";
    if (!form.message.trim()) newErrors.message = "Le message est requis";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
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

  return (
    <section id="contact" className="py-20 bg-[#edf7fa]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5f6caf] mb-6">
            Contactez-Nous
          </h2>
          <div className="w-24 h-1 bg-[#ffb677] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question ? Une suggestion ? N'hésitez pas à nous écrire !
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">
                Message envoyé avec succès !
              </h3>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
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
              </div>
              <div>
                <label className="block text-[#5f6caf] font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ffb677] focus:border-transparent ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Votre message..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#ff8364] text-white py-4 rounded-lg hover:bg-[#ffb677] transition-colors duration-300 font-semibold text-lg"
              >
                Envoyer le Message 📧
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
