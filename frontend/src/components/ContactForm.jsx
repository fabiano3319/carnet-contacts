import { useState, useEffect } from 'react'
import axios from 'axios'
import '/src/App.css'

function ContactForm({ contacts, setContacts, contactEnEdition, setContactEnEdition }) {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [mess, setMess] = useState(false)

  // Quand on clique sur "Modifier", on pré-remplit le formulaire
  useEffect(() => {
    if (contactEnEdition) {
      setNom(contactEnEdition.nom)
      setPrenom(contactEnEdition.prenom)
      setTelephone(contactEnEdition.telephone)
      setEmail(contactEnEdition.email)
    }
  }, [contactEnEdition])

  const resetForm = () => {
    setNom("")
    setPrenom("")
    setTelephone("")
    setEmail("")
  }

  const handleSubmitAdd = (event) => {
    event.preventDefault()

    if (contactEnEdition) {
      // Mode modification → PUT
      axios.put(`http://localhost:8000/api/contacts/${contactEnEdition.id}/`, {
        nom, prenom, telephone, email
      })
      .then(response => {
        setContacts(contacts.map(c => c.id === response.data.id ? response.data : c))
        setContactEnEdition(null)
        resetForm()
        setMess(true)
        setTimeout(() => setMess(false), 2000)
      })
      .catch(error => console.error("Erreur lors de la modification :", error))

    } else {
      // Mode ajout → POST
      axios.post('http://localhost:8000/api/contacts/', {
        nom, prenom, telephone, email
      })
      .then(response => {
        setContacts([...contacts, response.data])
        resetForm()
        setMess(true)
        setTimeout(() => setMess(false), 2000)
      })
      .catch(error => console.error("Erreur lors de l'ajout du contact :", error))
    }
  }

  const handleCancelEdit = () => {
    setContactEnEdition(null)
    resetForm()
  }

  const handleChangeNom = (event) => setNom(event.target.value)
  const handleChangePrenom = (event) => setPrenom(event.target.value)
  const handleChangeTelephone = (event) => setTelephone(event.target.value)
  const handleChangeEmail = (event) => setEmail(event.target.value)

  return (
    <div>
      <form onSubmit={handleSubmitAdd}>
        <input type="text" placeholder='Nom' onChange={handleChangeNom} value={nom} required />
        <input type="text" placeholder='Prénom' onChange={handleChangePrenom} value={prenom} required />
        <input type="text" placeholder='Numéro téléphone' onChange={handleChangeTelephone} value={telephone} required />
        <input type="text" placeholder='Email' onChange={handleChangeEmail} value={email} required />
        <button type='submit'>{contactEnEdition ? "Modifier" : "Ajouter"}</button>
        {contactEnEdition && (
          <button type="button" onClick={handleCancelEdit}>Annuler</button>
        )}
        {mess && (
          <p className='mess'>
            {contactEnEdition ? "Contact modifié avec succès" : "Contact ajouté avec succès"}
          </p>
        )}
      </form>
    </div>
  )
}

export default ContactForm