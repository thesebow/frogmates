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
    
    const { referralBonus, premiumReferralBonus } = await req.json();
    
    if (typeof referralBonus !== 'number' || typeof premiumReferralBonus !== 'number') {
      return NextResponse.json({ error: 'Invalid bonus values' }, { status: 400 });
    }
    
    // In a real application, you would store these values in a configuration table
    // For simplicity, we'll just return success here
    
    return NextResponse.json({
      success: true,
      config: {
        referralBonus,
        premiumReferralBonus
      }
    });
  } catch (error) {
    console.error('Admin config error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}