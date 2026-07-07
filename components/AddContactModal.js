'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { todayStr } from '@/lib/dateUtils'

export default function AddContactModal({ onClose, onAdded }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayStr())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone are required.')
      return
    }
    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    const { data: contact, error: insertErr } = await supabase
      .from('contacts')
      .insert({ user_id: user.id, name: name.trim(), phone: phone.trim(), follow_up: date })
      .select()
      .single()

    if (insertErr) {
      setError(insertErr.message)
      setSaving(false)
      return
    }

    if (note.trim()) {
      await supabase.from('call_logs').insert({
        contact_id: contact.id,
        user_id: user.id,
        note: note.trim(),
        logged_at: todayStr(),
      })
    }

    setSaving(false)
    onAdded()
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>New contact</h3>
        <div className="field">
          <label>Name</label>
          <input type="text" placeholder="Amaka Obi" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Phone</label>
          <input type="text" placeholder="080X-XXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="field">
          <label>First note</label>
          <input
            type="text"
            placeholder="e.g. interested in 2-bed, call after Friday"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Follow up on</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save contact'}
          </button>
        </div>
      </div>
    </div>
  )
}
