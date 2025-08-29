import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Simple token verification that works in Edge Runtime (without crypto)
function simpleVerifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
  } catch (error) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  // Skip authentication for certain routes
  if (
    req.nextUrl.pathname.startsWith('/api/auth') ||
    req.nextUrl.pathname === '/api/webhook'
  ) {
    return NextResponse.next();
  }

  // Check for auth token
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Invalid authentication header' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const decoded = simpleVerifyToken(token);
  
  // Enhanced token validation for admin routes
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired admin token' },
        { status: 401 }
      );
    }
  }

  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};