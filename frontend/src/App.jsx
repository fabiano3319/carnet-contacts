import { useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import AuthForm from './components/AuthForm'
import api from './api'
import '/src/App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [contactEnEdition, setContactEnEdition] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [username, setUsername] = useState(localStorage.getItem('username'))

  const handleAuth = (newToken, name) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('username', name)
    setToken(newToken)
    setUsername(name)
  }
  const handleLogout = () => {
    const nettoyer = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      setContacts([])
      setContactEnEdition(null)
      setToken(null)
      setUsername(null)
    }

    // On prévient le serveur pour qu'il supprime le token, puis on nettoie
    // dans tous les cas, même si la requête échoue.
    api.post('/api/auth/logout/').finally(nettoyer)
  }

  if (!token) {
    return <AuthForm onAuth={handleAuth} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121316"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z" />
              <circle cx="11" cy="10" r="2.5" />
              <path d="M7 17c.6-2 2-3 4-3s3.4 1 4 3" />
              <path d="M20 8v8" />
            </svg>
          </div>
          <div>
            <h1>Carnet de contacts</h1>
            <p>Gérez vos contacts en un seul endroit</p>
          </div>
        </div>
        <div className="header-right">
          <div className="count-badge">
            <span>{contacts.length}</span> contact{contacts.length > 1 ? 's' : ''}
          </div>
          <div className="user-box">
            <span className="user-name">{username}</span>
            <button type="button" className="btn btn-ghost btn-logout" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="layout">
        <ContactForm
          contacts={contacts}
          setContacts={setContacts}
          contactEnEdition={contactEnEdition}
          setContactEnEdition={setContactEnEdition}
        />
        <ContactList
          contacts={contacts}
          setContacts={setContacts}
          setContactEnEdition={setContactEnEdition}
        />
      </div>
    </div>
  )
}

export default App