import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "El email es obligatorio.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Ingresa un email válido.";
    }

    if (!form.password) {
      errs.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      errs.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length === 0) {
      setErrors({});
      const success = await login(form.email, form.password);

      if (success) {
        setStatus({ type: "success", text: "¡Inicio de sesión exitoso!" });
      } else {
        setStatus({ type: "error", text: "Error al iniciar sesión." });
      }
    } else {
      setErrors(v);
      setStatus({ type: "error", text: "Revisa los campos marcados." });
    }
  };

  const canSubmit = form.email && form.password.length >= 6;

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 24 }}>
      <h2 className="mb-3">Iniciar sesión</h2>

      {status && (
        <div
          className={`alert ${
            status.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={form.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={!canSubmit}
        >
          pide tu pizza 🍕
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
