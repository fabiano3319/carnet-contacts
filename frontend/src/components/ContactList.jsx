import { useEffect } from 'react'
import axios from 'axios'
import '/src/App.css'

function ContactList({ contacts, setContacts, setContactEnEdition }) {
  useEffect(() => {
    axios.get('http://localhost:8000/api/contacts/')
      .then(response => setContacts(response.data))
      .catch(error => console.error('Erreur lors du chargement des contacts :', error))
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ce contact ?")) return

    axios.delete(`http://localhost:8000/api/contacts/${id}/`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id))
      })
      .catch(error => console.error('Erreur lors de la suppression :', error))
  }

  const handleEdit = (contact) => {
    setContactEnEdition(contact)
  }

  return (
    <div>
      <h2>Liste des contacts</h2>
      {contacts.length === 0 ? (
        <p>Aucun contact pour le moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.prenom}</td>
                <td>{contact.nom}</td>
                <td>{contact.telephone}</td>
                <td>{contact.email}</td>
                <td>
                  <button onClick={() => handleEdit(contact)}>Modifier</button>
                  <button onClick={() => handleDelete(contact.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ContactList