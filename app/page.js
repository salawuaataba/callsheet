'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ContactCard from '@/components/ContactCard'
import AddContactModal from '@/components/AddContactModal'
import { useContacts } from '@/lib/useContacts'
import { daysUntil } from '@/lib/dateUtils'

export default function TodayPage() {
  const { contacts, loading, authChecked, refresh } = useContacts()
  const [expandedId, setExpandedId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  if (!authChecked || loading) return null

  const dueToday = contacts
    .filter((c) => daysUntil(c.follow_up) <= 0)
    .sort((a, b) => new Date(a.follow_up) - new Date(b.follow_up))

  return (
    <div className="app">
      <Sidebar todayCount={dueToday.length} contactsCount={contacts.length} />
      <main className="main">
        <div className="topbar">
          <h2>Today</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="date">
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}
            </span>
            <button className="btn" onClick={() => setShowModal(true)}>+ Add contact</button>
          </div>
        </div>

        {dueToday.length === 0 ? (
          <div className="empty">
            <strong>Nothing due today</strong>
            Nice — you're caught up. Check Contacts for what's coming next.
          </div>
        ) : (
          <div className="cards">
            {dueToday.map((c) => (
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
