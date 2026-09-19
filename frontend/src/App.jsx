import { useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [contactEnEdition, setContactEnEdition] = useState(null)

  return (
    <div>
      <h1>Carnet de contacts</h1>
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
  )
}

export default App