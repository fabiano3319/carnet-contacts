import { useState, useEffect } from "react";
import api from "../api";

function ContactForm({
  contacts,
  setContacts,
  contactEnEdition,
  setContactEnEdition,
}) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [categorie, setCategorie] = useState("Ami");
  const [mess, setMess] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (contactEnEdition) {
      setNom(contactEnEdition.nom);
      setPrenom(contactEnEdition.prenom);
      setTelephone(contactEnEdition.telephone);
      setEmail(contactEnEdition.email);
      setCategorie(contactEnEdition.categorie || "Ami");
    }
  }, [contactEnEdition]);

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setTelephone("");
    setEmail("");
    setCategorie("Ami");
  };

  const afficherMessage = () => {
    setMess(true);
    setTimeout(() => setMess(false), 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const donnees = { nom, prenom, telephone, email, categorie };

    if (contactEnEdition) {
      api
        .put(`/api/contacts/${contactEnEdition.id}/`, donnees)
        .then((response) => {
          setContacts(
            contacts.map((c) =>
              c.id === response.data.id ? response.data : c,
            ),
          );
          setContactEnEdition(null);
          resetForm();
          afficherMessage();
        })
        .catch((error) => {
          const data = error.response?.data;
          setErreur(
            data
              ? Object.values(data).flat().join(" ")
              : "Impossible de joindre le serveur.",
          );
        });
    } else {
      api
        .post("/api/contacts/", donnees)
        .then((response) => {
          setContacts([...contacts, response.data]);
          resetForm();
          afficherMessage();
        })
        .catch((error) => {
          const data = error.response?.data;
          setErreur(
            data
              ? Object.values(data).flat().join(" ")
              : "Impossible de joindre le serveur.",
          );
        });
    }
  };

  const handleCancelEdit = () => {
    setContactEnEdition(null);
    resetForm();
  };

  return (
    <section className="card form-card">
      <h2>{contactEnEdition ? "Modifier un contact" : "Ajouter un contact"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="field">
            Prénom
            <input
              type="text"
              placeholder="Votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </label>
          <label className="field">
            Nom (facultatif)
            <input
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
        </div>
        <label className="field">
          Téléphone
          <input
            type="tel"
            inputMode="tel"
            placeholder="033 33 333 33"
            value={telephone}
            onChange={(e) =>
              setTelephone(e.target.value.replace(/[^\d+ ]/g, ""))
            }
            pattern="\+?[0-9 ]{8,20}"
            title="8 à 15 chiffres, avec un + facultatif au début"
            required
          />
        </label>
        <label className="field">
          Email (facultatif)
          <input
            type="email"
            placeholder="nom@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          Catégorie
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option>Ami</option>
            <option>Famille</option>
            <option>Travail</option>
            <option>Autre</option>
          </select>
        </label>
        {erreur && (
          <p className="error" role="alert">
            {erreur}
          </p>
        )}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {contactEnEdition ? "Modifier" : "Ajouter"}
          </button>
          {contactEnEdition && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancelEdit}
            >
              Annuler
            </button>
          )}
        </div>
        {mess && (
          <p className="mess">
            {contactEnEdition
              ? "Contact modifié avec succès"
              : "Contact ajouté avec succès"}
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
