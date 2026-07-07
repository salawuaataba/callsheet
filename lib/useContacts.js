'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function useContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  const fetchContacts = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setAuthChecked(true)

    const { data, error } = await supabase
      .from('contacts')
      .select('*, logs:call_logs(*)')
      .order('name', { ascending: true })

    if (!error && data) {
      const sorted = data.map((c) => ({
        ...c,
        logs: (c.logs || []).sort((a, b) => new Date(a.logged_at) - new Date(b.logged_at)),
      }))
      setContacts(sorted)
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  return { contacts, loading, authChecked, refresh: fetchContacts }
}
