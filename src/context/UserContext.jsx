import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  // 🔐 Login de usuario
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      // Guardar token y email
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      alert("✅ Sesión iniciada correctamente");
      return true;
    } catch (error) {
      alert("❌ " + error.message);
      return false;
    }
  };

  // 📝 Registro de usuario
  const register = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrarse");

      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      alert("✅ Usuario registrado correctamente");
      return true;
    } catch (error) {
      alert("❌ " + error.message);
      return false;
    }
  };


  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al obtener perfil");
      return data;
    } catch (error) {
      console.error("❌ Error en getProfile:", error.message);
      return null;
    }
  };

  //Cerrar sesión
  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    alert("👋 Sesión cerrada");
  };

  return (
    <UserContext.Provider
      value={{ token, email, login, register, getProfile, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
