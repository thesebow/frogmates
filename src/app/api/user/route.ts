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
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        referredUsers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            photoUrl: true,
            specialId: true,
            stars: true,
            isPremium: true,
            isVerified: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json({ error: 'Account is blocked' }, { status: 403 });
    }
    
    // Update last active timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });
    
    return NextResponse.json({
      user: {
        id: user.id,
        telegramId: user.telegramId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photoUrl: user.photoUrl,
        specialId: user.specialId,
        referrals: user.referrals,
        stars: user.stars,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
        isCheater: user.isCheater,
        isBot: user.isBot,
        isBlocked: user.isBlocked,
        joinedChannel: user.joinedChannel,
        isPremium: user.isPremium,
        referredUsers: user.referredUsers
      }
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}