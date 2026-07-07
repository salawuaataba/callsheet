'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/')
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setInfo('Account created. Check your email to confirm, then log in.')
        setMode('login')
      }
    }
    setLoading(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="stamp-logo">CS</div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, margin: '6px 0 4px' }}>CallSheet</h1>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
          {mode === 'login' ? 'Log in to your call sheet.' : 'Set up your call sheet.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="auth-error">{error}</div>}
          {info && <div style={{ color: 'var(--teal)', fontSize: 13, marginTop: 8 }}>{info}</div>}
          <button className="btn" type="submit" style={{ width: '100%', marginTop: 6 }} disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? (
            <>New here? <span onClick={() => setMode('signup')}>Create an account</span></>
          ) : (
            <>Already have one? <span onClick={() => setMode('login')}>Log in</span></>
          )}
        </div>
      </div>
    </div>
  )
}
