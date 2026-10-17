import { useState } from "react";
import Logo from "./Logo";
import api from "../api";
import PasswordInput from "./PasswordInput";

function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login"); // 'login' ou 'register'
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const estConnexion = mode === "login";

  const changerMode = () => {
    setMode(estConnexion ? "register" : "login");
    setErreur("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErreur("");
    setChargement(true);

    const url = estConnexion ? "/api/auth/login/" : "/api/auth/register/";
    const donnees = estConnexion
      ? { username, password }
      : { username, email, password };

    api
      .post(url, donnees)
      .then((response) => {
        onAuth(response.data.token, response.data.username || username);
      })
      .catch((error) => {
        if (!error.response) {
          setErreur("Impossible de joindre le serveur.");
        } else if (error.response.status === 400 && estConnexion) {
          setErreur("Identifiants incorrects.");
        } else if (error.response.status === 400) {
          // Django renvoie par exemple {"email": ["Cet email est déjà utilisé."]}
          setErreur(Object.values(error.response.data).flat().join(" "));
        } else {
          setErreur("Une erreur est survenue, réessaie plus tard.");
        }
      })
      .finally(() => setChargement(false));
  };

  return (
    <div className="auth-wrapper">
      <section className="card auth-card">
        <div className="auth-brand">
          <Logo size={56} />
          <h1>Carnet de contacts</h1>
          <p className="subtitle">
            {estConnexion
              ? "Connecte-toi pour accéder à tes contacts"
              : "Crée ton compte"}
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            Nom d'utilisateur
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          {!estConnexion && (
            <label className="field">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          )}

          <PasswordInput
            key={mode}
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {erreur && (
            <p className="error" role="alert">
              {erreur}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={chargement}
          >
            {chargement
              ? "Veuillez patienter..."
              : estConnexion
                ? "Se connecter"
                : "Créer mon compte"}
          </button>
        </form>

        <p className="auth-switch">
          {estConnexion ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <button type="button" className="link-btn" onClick={changerMode}>
            {estConnexion ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default AuthForm;
