# CallSheet

A simple CRM: know who to call today, and what you promised them.

Built with Next.js + Supabase.

## Structure

- `app/` — Today view, Contacts view, Login
- `components/` — Sidebar, ContactCard, AddContactModal
- `lib/` — Supabase client, date helpers, data fetching
- `sql/schema.sql` — database schema with row-level security

## Environment variables (set in Vercel, not committed here)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
