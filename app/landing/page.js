export const metadata = {
  title: 'CallSheet — Know who to call.',
  description: 'The simple CRM that only shows you who to call today. Built for solo agents, not enterprise sales teams.',
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px', maxWidth: 1000, margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="stamp-logo" style={{ color: 'var(--ink)', borderColor: 'var(--ink)', width: 30, height: 30, fontSize: 12 }}>CS</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17 }}>CallSheet</span>
        </div>
        <a href="/login" className="btn ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Log in</a>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 640, margin: '40px auto 0', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 38,
          lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.02em'
        }}>
          Know who to call.<br />Keep your word.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 28px' }}>
          CallSheet is the CRM for agents who don't need pipelines, custom fields,
          or a training manual — just a simple list of who to call today and what you promised them.
        </p>
        <a href="/login" className="btn" style={{ fontSize: 15, padding: '13px 28px', display: 'inline-block' }}>
          Get started free
        </a>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 10 }}>
          Free during early access. No card required.
        </p>
      </section>

      {/* Product mockup */}
      <section style={{ maxWidth: 520, margin: '48px auto 0', padding: '0 24px' }}>
        <div style={{
          background: 'var(--card)', border: '1.5px solid var(--line)', borderRadius: 10,
          boxShadow: 'var(--shadow)', overflow: 'hidden'
        }}>
          <div style={{
            background: 'var(--ink)', color: 'var(--paper)', padding: '10px 16px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, display: 'flex',
            alignItems: 'center', gap: 6
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B23A2E', display: 'inline-block' }} />
            Today · Tue 07 Jul
          </div>
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: 'Amaka Obi', note: '"Interested in 2-bed near Wuse."', stamp: 'TODAY', cls: '' },
              { n: 'Bello Yusuf', note: '"Confirm Saturday 10am viewing."', stamp: 'TODAY', cls: '' },
              { n: 'Chidinma Eze', note: '"Waiting on landlord response."', stamp: 'OVERDUE', cls: 'overdue' },
            ].map((c) => (
              <div key={c.n} className="card" style={{ cursor: 'default' }}>
                <div className="tab">{c.n.charAt(0)}</div>
                <div className="card-body">
                  <div className="card-row">
                    <div>
                      <div className="card-name">{c.n}</div>
                      <div className="card-note" style={{ marginTop: 4 }}>{c.note}</div>
                    </div>
                    <div className={`stamp ${c.cls}`}>{c.stamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 720, margin: '64px auto 0', padding: '0 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24
        }}>
          {[
            { title: 'One list. No noise.', body: 'No pipelines, no stages, no custom fields to configure. Just who to call and why.' },
            { title: 'Every promise tracked.', body: 'Log what you said, set the next follow-up date, and it shows up right when it\u2019s due.' },
            { title: 'Built for your phone.', body: 'Fast on a budget Android device, works from anywhere, no bloated app to install.' },
          ].map((f) => (
            <div key={f.title}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, margin: '0 0 6px' }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ maxWidth: 520, margin: '64px auto 0', padding: '32px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, margin: '0 0 10px' }}>
          Stop losing track of who you promised what.
        </h2>
        <a href="/login" className="btn" style={{ fontSize: 15, padding: '13px 28px', display: 'inline-block', marginTop: 6 }}>
          Get started free
        </a>
      </section>

      <footer style={{ textAlign: 'center', padding: '32px 24px 48px', fontSize: 12, color: 'var(--ink-soft)' }}>
        CallSheet — CRM Lite, built for solo agents.
      </footer>
    </div>
  )
}
