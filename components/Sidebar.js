'use client'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Sidebar({ todayCount = 0, contactsCount = 0 }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="stamp-logo">CS</div>
        <h1>CallSheet</h1>
        <p>Know who to call.<br />Keep your word.</p>
      </div>
      <nav className="nav">
        <a href="/">
          <div className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
            Today <span className="count">{todayCount}</span>
          </div>
        </a>
        <a href="/contacts">
          <div className={`nav-item ${pathname === '/contacts' ? 'active' : ''}`}>
            Contacts <span className="count">{contactsCount}</span>
          </div>
        </a>
      </nav>
      <div className="sidebar-foot" onClick={handleSignOut}>
        Sign out<br />CRM Lite — v1
      </div>
    </aside>
  )
}
