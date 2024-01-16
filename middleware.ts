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

  const publicRoutes = [
    routeManager.getRoutePath(RouteKeys.LOGIN),
  ]

  const sessionManager = new SessionManager(true);

  // Check if the session is valid
  const isValid = await sessionManager.isSessionValid();

  // If the session is valid, continue to the next middleware
  if (isValid) {
    // If the user is trying to access a public route, redirect to the home page
    if (publicRoutes.includes(request.nextUrl.pathname)) {
     return NextResponse.redirect(new URL(routeManager.getRoutePath(RouteKeys.HOME), request.url))
    }
    return NextResponse.next()
  }

  // If the route is the login page, continue to the next middleware
  if (request.nextUrl.pathname === routeManager.getRoutePath(RouteKeys.LOGIN)) {
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
  ],
}