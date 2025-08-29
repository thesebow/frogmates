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
    
    // Update user's channel join status
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { joinedChannel: true }
    });
    
    return NextResponse.json({
      success: true,
      joinedChannel: user.joinedChannel
    });
  } catch (error) {
    console.error('Channel join error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}