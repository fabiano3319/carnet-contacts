import { useState } from 'react'
import axios from 'axios'
import '/src/App.css'

function ContactForm({ contacts, setContacts }) {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [mess, setMess] = useState(false)

  const handleSubmitAdd = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8000/api/contacts/', {
      nom, prenom, telephone, email
    })
    .then(response => {
      setContacts([...contacts, response.data])
      setNom("")
      setPrenom("")
      setTelephone("")
      setEmail("")
      setMess(true)
      setTimeout(() => setMess(false), 2000)
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du contact :", error)
    })
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
        <button type='submit'>Ajouter</button>
        {mess && (<p className='mess'>Contact ajouté avec succès</p>)}
      </form>
    </div>
  )
}

export default ContactForm