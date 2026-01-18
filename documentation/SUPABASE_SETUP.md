# 🔐 Supabase Setup Documentation

## 📁 File Structure

```
lib/supabase/
├── client.ts      # Browser client (Client Components)
├── server.ts      # Server client (Server Components, API Routes)
└── middleware.ts  # Session management & auth logic

middleware.ts      # Root middleware (integrates Supabase)

app/
├── login/
│   └── page.tsx   # Login page
├── admin/
│   ├── layout.tsx # Protected admin layout
│   └── page.tsx   # Admin dashboard
└── api/auth/signout/
    └── route.ts   # Sign out API
```

## ✅ Setup Checklist

- [x] Install Supabase packages
- [x] Create Supabase client files
- [x] Setup middleware for session management
- [x] Create login page
- [x] Create protected admin routes
- [x] Add sign out functionality

## 🔧 Configuration

### Environment Variables

Make sure your `.env.local` or `.env` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 How It Works

### 1. **Client-Side Authentication** (`lib/supabase/client.ts`)

Use in Client Components:

```tsx
'use client'
import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  // Use supabase client...
}
```

### 2. **Server-Side Authentication** (`lib/supabase/server.ts`)

Use in Server Components, Server Actions, and API Routes:

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function MyServerComponent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Use supabase client...
}
```

### 3. **Middleware Protection**

The middleware automatically:
- ✅ Protects `/admin/*` routes (requires authentication)
- ✅ Allows public routes (`/`, `/public/*`, etc.)
- ✅ Redirects unauthenticated users trying to access `/admin` to `/login`
- ✅ Redirects authenticated users away from `/login` to `/admin`
- ✅ Maintains session cookies across requests

### 4. **Route Protection Levels**

| Route Pattern | Protection | Behavior |
|--------------|------------|----------|
| `/` | Public | Anyone can access |
| `/public/*` | Public | Anyone can access |
| `/login` | Public | Redirects to `/admin` if already logged in |
| `/admin/*` | Protected | Requires authentication, redirects to `/login` if not |

## 📝 Usage Examples

### Login Flow

1. User visits `/admin` without being logged in
2. Middleware redirects to `/login?redirect=/admin`
3. User enters credentials
4. On success, redirects to `/admin` (or original destination)

### Logout Flow

1. User clicks "Sign Out" button in admin layout
2. POST request to `/api/auth/signout`
3. Session cleared
4. Redirects to `/login`

### Checking Authentication in Components

**Server Component:**
```tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <div>Welcome {user.email}</div>
}
```

**Client Component:**
```tsx
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [user, setUser] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])
  
  return <div>{user?.email}</div>
}
```

## 🔒 Security Best Practices

1. **Never expose service_role key** - Only use `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Use Row Level Security (RLS)** - Enable RLS on all Supabase tables
3. **Validate on server** - Always verify permissions server-side
4. **Secure cookies** - Middleware handles this automatically

## 🐛 Troubleshooting

### Issue: "User is null even after login"

**Solution:** Make sure you're using the correct client:
- Client Components → `lib/supabase/client.ts`
- Server Components → `lib/supabase/server.ts`

### Issue: "Infinite redirect loop"

**Solution:** Check that:
1. Environment variables are set correctly
2. Middleware matcher doesn't conflict with auth routes
3. Login page is accessible without authentication

### Issue: "Session not persisting"

**Solution:** 
1. Clear browser cookies
2. Check that middleware is properly updating cookies
3. Verify Supabase project URL is correct

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase SSR Package](https://supabase.com/docs/guides/auth/server-side/nextjs)

## 🎯 Next Steps

1. **Setup Supabase Database:**
   - Create tables in Supabase dashboard
   - Enable Row Level Security (RLS)
   - Create policies for data access

2. **Add More Auth Features:**
   - Password reset
   - Email verification
   - OAuth providers (Google, GitHub, etc.)
   - Magic link login

3. **Extend Admin Panel:**
   - Add CRUD operations
   - Create admin-only API routes
   - Build data management interfaces

---

**Last Updated:** 2026-01-10
**Version:** 1.0.0
