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
    
    // Get statistics
    const totalUsers = await prisma.user.count();
    const verifiedUsers = await prisma.user.count({ where: { isVerified: true } });
    const premiumUsers = await prisma.user.count({ where: { isPremium: true } });
    const blockedUsers = await prisma.user.count({ where: { isBlocked: true } });
    const cheaters = await prisma.user.count({ where: { isCheater: true } });
    const bots = await prisma.user.count({ where: { isBot: true } });
    
    // Calculate active users (active in the last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const activeUsers = await prisma.user.count({
      where: { lastActive: { gte: yesterday } }
    });
    
    // Get latest users
    const latestUsers = await prisma.user.findMany({
      take: 10,
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
      statistics: {
        totalUsers,
        verifiedUsers,
        premiumUsers,
        blockedUsers,
        cheaters,
        bots,
        activeUsers,
        honestUsers: totalUsers - cheaters - bots
      },
      latestUsers
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}