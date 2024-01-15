import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import SessionManager from './lib/sessionManager';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  // Extract cookies from the request
  const cookies = request.cookies;

  const sessionManager = new SessionManager(cookies);

  // Check if the session is valid
  const isValid = await sessionManager.isSessionValid();

  // If the session is valid, continue to the next middleware
  if (isValid) {
    console.log(request.url.includes('/login'))
    // if url is /login, redirect to /
    if (request.url.includes('/login')) {
     return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/login'
  ],
}