'use client'
import { useState } from 'react'
import { stampLabel, todayStr } from '@/lib/dateUtils'
import { supabase } from '@/lib/supabaseClient'

export default function ContactCard({ contact, expanded, onToggle, onUpdated }) {
  const [note, setNote] = useState('')
  const [nextDate, setNextDate] = useState(contact.follow_up)
  const [saving, setSaving] = useState(false)

  const stamp = stampLabel(contact.follow_up)
  const lastLog = contact.logs && contact.logs.length ? contact.logs[contact.logs.length - 1] : null

  async function handleSave(e) {
    e.stopPropagation()
    if (!note.trim()) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('call_logs').insert({
      contact_id: contact.id,
      user_id: user.id,
      note: note.trim(),
      logged_at: todayStr(),
    })

    await supabase.from('contacts')
      .update({ follow_up: nextDate })
      .eq('id', contact.id)

    setNote('')
    setSaving(false)
    onUpdated()
  }

  return (
    <div className={`card ${expanded ? 'expanded' : ''}`} onClick={onToggle}>
      <div className="tab">{contact.name.charAt(0)}</div>
      <div className="card-body">
        <div className="card-row">
          <div>
            <div className="card-name">{contact.name}</div>
            <div className="card-phone">{contact.phone}</div>
            {lastLog && <div className="card-note">"{lastLog.note}"</div>}
          </div>
          <div className={`stamp ${stamp.cls}`}>{stamp.text}</div>
        </div>

        {expanded && (
          <div className="detail" onClick={(e) => e.stopPropagation()}>
            <h4>History</h4>
            {contact.logs && contact.logs.length > 0 ? (
              contact.logs.slice().reverse().map((l) => (
                <div className="log-item" key={l.id}>
                  <span>{l.note}</span>
                  <span className="log-date">
                    {new Date(l.logged_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--ink-soft)' }}>No notes yet.</div>
            )}
            <h4 style={{ marginTop: 14 }}>Log a call &amp; set next follow-up</h4>
            <div className="detail-form">
              <input
                type="text"
                placeholder="What happened / what you promised"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <input
                type="date"
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
              />
              <button className="btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
