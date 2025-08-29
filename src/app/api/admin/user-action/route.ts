import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/utils';

export async function POST(req: NextRequest) {
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
    
    const { userId, action } = await req.json();
    
    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Perform the action
    let user;
    
    switch (action) {
      case 'block':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isBlocked: true }
        });
        break;
      case 'unblock':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isBlocked: false }
        });
        break;
      case 'verify':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isVerified: true }
        });
        break;
      case 'unverify':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isVerified: false }
        });
        break;
      case 'reset-referrals':
        user = await prisma.user.update({
          where: { id: userId },
          data: { referrals: 0 }
        });
        break;
      case 'reset-stars':
        user = await prisma.user.update({
          where: { id: userId },
          data: { stars: 5 }
        });
        break;
      case 'mark-as-cheater':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isCheater: true, isBot: true }
        });
        break;
      case 'unmark-as-cheater':
        user = await prisma.user.update({
          where: { id: userId },
          data: { isCheater: false, isBot: false }
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
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
        isPremium: user.isPremium
      }
    });
  } catch (error) {
    console.error('Admin user action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}