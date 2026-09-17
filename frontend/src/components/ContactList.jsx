import { useState, useEffect } from 'react'
import axios from 'axios'

function ContactList() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/contacts/')
      .then(response => {
        setContacts(response.data)
      })
      .catch(error => {
        console.error('Erreur lors du chargement des contacts :', error)
      })
  }, [])

  return (
    <div>
      <h2>Liste des contacts</h2>
      {contacts.length === 0 ? (
        <p>Aucun contact pour le moment.</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.prenom} {contact.nom} — {contact.telephone}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ContactList