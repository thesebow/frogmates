import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/utils';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is admin
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    
    if (!admin || !admin.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Get query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const search = url.searchParams.get('search') || '';
    const filter = url.searchParams.get('filter') || '';
    
    // Build where clause
    let where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { telegramId: { contains: search } },
        { specialId: { contains: search } }
      ];
    }
    
    // Apply filters
    switch (filter) {
      case 'premium':
        where.isPremium = true;
        break;
      case 'verified':
        where.isVerified = true;
        break;
      case 'blocked':
        where.isBlocked = true;
        break;
      case 'cheaters':
        where.isCheater = true;
        break;
      case 'bots':
        where.isBot = true;
        break;
      case 'honest':
        where.isCheater = false;
        where.isBot = false;
        break;
    }
    
    // Count total matching users
    const total = await prisma.user.count({ where });
    
    // Get users with pagination
    const users = await prisma.user.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        telegramId: true,
        firstName: true,
        lastName: true,
        username: true,
        photoUrl: true,
        specialId: true,
        referrals: true,
        stars: true,
        isVerified: true,
        isAdmin: true,
        isCheater: true,
        isBot: true,
        isBlocked: true,
        joinedChannel: true,
        isPremium: true,
        ipAddress: true,
        createdAt: true,
        lastActive: true
      }
    });
    
    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}