import { useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])

  return (
    <div>
      <h1>Carnet de contacts</h1>
      <ContactForm contacts={contacts} setContacts={setContacts} />
      <ContactList contacts={contacts} setContacts={setContacts} />
    </div>
  )
}

export default App