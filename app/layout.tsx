import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { renderSnippet } from '@/lib/analytics/renderSnippet'
import Navbar from '@/components/navbar'
import { cn } from '@/lib/utils'
import SessionManager from '@/lib/sessionManager'
import { cookies } from 'next/headers'
import { Toaster } from '@/components/ui/toaster'
import UserAPI from '@/lib/api/userAPI'
import { ssrWrapper } from '@/lib/api/ssrWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Nextjs App Router Tailwind with Auth Boilerplate.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sm = new SessionManager(true)
  const validSession = await sm.isSessionValid();

  let user = null
  
  if (validSession) {
    const api = ssrWrapper(UserAPI)
    try {
      const res = await api.getUser()
      console.log(res)
      user = res.user
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(
        'text-gray-800 w-screen',
        inter.className
      )}>
        <Navbar user={user}/>
        {children}
        <Toaster />
      </body>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      />
    </html>
  )
}
