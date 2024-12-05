'use server';

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth';
 
// 1. Specify protected and public routes
const protectedRoutes = '/page/admin'
 
export async function middleware(req: NextRequest) {
 
  // 3. Decrypt the session from the cookie
  const session = await getSession()
 
  // 5. Redirect to /login if the user is not authenticated
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && !session?.data) {
    return NextResponse.redirect(new URL('/page/form', req.nextUrl))
  }
  // Redirect to /login if the user is not admin
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && (session?.data.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/page/form', req.nextUrl))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/','/page/admin/:path*'],
}