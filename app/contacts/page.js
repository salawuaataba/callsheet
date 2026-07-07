'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ContactCard from '@/components/ContactCard'
import AddContactModal from '@/components/AddContactModal'
import { useContacts } from '@/lib/useContacts'
import { daysUntil } from '@/lib/dateUtils'

export default function ContactsPage() {
  const { contacts, loading, authChecked, refresh } = useContacts()
  const [expandedId, setExpandedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')

  if (!authChecked || loading) return null

  const dueToday = contacts.filter((c) => daysUntil(c.follow_up) <= 0).length

  const filtered = contacts
    .filter((c) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return c.name.toLowerCase().includes(q) || c.phone.includes(q)
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="app">
      <Sidebar todayCount={dueToday} contactsCount={contacts.length} />
      <main className="main">
        <div className="topbar">
          <h2>Contacts</h2>
          <button className="btn" onClick={() => setShowModal(true)}>+ Add contact</button>
        </div>

        <input
          type="text"
          className="search"
          placeholder="Search name or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className="empty">
            <strong>Nothing here yet</strong>
            Add your first contact to start your call sheet.
          </div>
        ) : (
          <div className="cards">
            {filtered.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                expanded={expandedId === c.id}
                onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
                onUpdated={refresh}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onAdded={() => { setShowModal(false); refresh() }}
        />
      )}
    </div>
  )
}
