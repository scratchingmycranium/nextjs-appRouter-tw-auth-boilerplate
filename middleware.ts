import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import SessionManager from './lib/sessionManager';
import { RouteKeys, routeManager } from './lib/routeManager';

/**
 * Middleware function that handles session validation and redirection.
 * 
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to be sent.
 */
export async function middleware(request: NextRequest) {

  // Extract cookies from the request
  const cookies = request.cookies;

  const sessionManager = new SessionManager(cookies);

  // Check if the session is valid
  const isValid = await sessionManager.isSessionValid();

  // If the session is valid, continue to the next middleware
  if (isValid) {
    // if url is /login, redirect to /
    if (request.url.includes(routeManager.getRoutePath(RouteKeys.LOGIN))) {
     return NextResponse.redirect(new URL(routeManager.getRoutePath(RouteKeys.HOME), request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(routeManager.getRoutePath(RouteKeys.LOGIN), request.url))
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