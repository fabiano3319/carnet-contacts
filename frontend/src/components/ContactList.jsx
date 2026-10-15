import { useEffect, useState } from 'react'
import axios from 'axios'

function ContactList({ contacts, setContacts, setContactEnEdition }) {
  const [recherche, setRecherche] = useState("")

  useEffect(() => {
    axios.get('http://localhost:8000/api/contacts/')
      .then(response => setContacts(response.data))
      .catch(error => console.error('Erreur lors du chargement des contacts :', error))
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ce contact ?")) return
    axios.delete(`http://localhost:8000/api/contacts/${id}/`)
      .then(() => setContacts(contacts.filter(c => c.id !== id)))
      .catch(error => console.error('Erreur lors de la suppression :', error))
  }

  const resultats = contacts.filter(c =>
    `${c.prenom} ${c.nom}`.toLowerCase().includes(recherche.toLowerCase())
  )

  const initiales = (c) => `${c.prenom?.[0] ?? ''}${c.nom?.[0] ?? ''}`.toUpperCase()

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Liste des contacts</h2>
        <label className="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ea0ad"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <input type="text" aria-label="Rechercher un contact" placeholder="Rechercher un contact"
            value={recherche} onChange={e => setRecherche(e.target.value)} />
        </label>
      </div>

      {resultats.length === 0 ? (
        <p className="empty">Aucun contact à afficher.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resultats.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <div className="contact-cell">
                      <div className="avatar">{initiales(contact)}</div>
                      <span>{contact.prenom} {contact.nom}</span>
                    </div>
                  </td>
                  <td>{contact.telephone}</td>
                  <td>{contact.email}</td>
                  <td>
                    <span className={`badge badge-${(contact.categorie || 'aucune').toLowerCase()}`}>
                      {contact.categorie || 'Non classé'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" aria-label="Modifier"
                        onClick={() => setContactEnEdition(contact)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                        </svg>
                      </button>
                      <button className="icon-btn danger" aria-label="Supprimer"
                        onClick={() => handleDelete(contact.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ContactList