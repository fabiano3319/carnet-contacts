import { useState, useEffect } from 'react'
import axios from 'axios'

function ContactForm({ contacts, setContacts, contactEnEdition, setContactEnEdition }) {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [categorie, setCategorie] = useState("Ami")
  const [mess, setMess] = useState(false)

  useEffect(() => {
    if (contactEnEdition) {
      setNom(contactEnEdition.nom)
      setPrenom(contactEnEdition.prenom)
      setTelephone(contactEnEdition.telephone)
      setEmail(contactEnEdition.email)
      setCategorie(contactEnEdition.categorie || "Ami")
    }
  }, [contactEnEdition])

  const resetForm = () => {
    setNom("")
    setPrenom("")
    setTelephone("")
    setEmail("")
    setCategorie("Ami")
  }

  const afficherMessage = () => {
    setMess(true)
    setTimeout(() => setMess(false), 2000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const donnees = { nom, prenom, telephone, email, categorie }

    if (contactEnEdition) {
      axios.put(`http://localhost:8000/api/contacts/${contactEnEdition.id}/`, donnees)
        .then(response => {
          setContacts(contacts.map(c => c.id === response.data.id ? response.data : c))
          setContactEnEdition(null)
          resetForm()
          afficherMessage()
        })
        .catch(error => console.error("Erreur lors de la modification :", error))
    } else {
      axios.post('http://localhost:8000/api/contacts/', donnees)
        .then(response => {
          setContacts([...contacts, response.data])
          resetForm()
          afficherMessage()
        })
        .catch(error => console.error("Erreur lors de l'ajout du contact :", error))
    }
  }

  const handleCancelEdit = () => {
    setContactEnEdition(null)
    resetForm()
  }

  return (
    <section className="card form-card">
      <h2>{contactEnEdition ? "Modifier un contact" : "Ajouter un contact"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="field">Prénom
            <input type="text" placeholder="Marta" value={prenom}
              onChange={e => setPrenom(e.target.value)} required />
          </label>
          <label className="field">Nom
            <input type="text" placeholder="Mendrika" value={nom}
              onChange={e => setNom(e.target.value)} required />
          </label>
        </div>
        <label className="field">Téléphone
          <input type="text" placeholder="033 11 923 89" value={telephone}
            onChange={e => setTelephone(e.target.value)} required />
        </label>
        <label className="field">Email
          <input type="email" placeholder="nom@exemple.com" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </label>
        <label className="field">Catégorie
          <select value={categorie} onChange={e => setCategorie(e.target.value)}>
            <option>Ami</option>
            <option>Famille</option>
            <option>Travail</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {contactEnEdition ? "Modifier" : "Ajouter"}
          </button>
          {contactEnEdition && (
            <button type="button" className="btn btn-ghost" onClick={handleCancelEdit}>
              Annuler
            </button>
          )}
        </div>
        {mess && (
          <p className="mess">
            {contactEnEdition ? "Contact modifié avec succès" : "Contact ajouté avec succès"}
          </p>
        )}
      </form>
    </section>
  )
}

export default ContactForm