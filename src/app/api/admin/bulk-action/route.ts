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
    
    const { action } = await req.json();
    
    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }
    
    // Perform bulk actions
    let result;
    
    switch (action) {
      case 'block-all-cheaters':
        result = await prisma.user.updateMany({
          where: { isCheater: true },
          data: { isBlocked: true }
        });
        break;
      case 'unblock-all':
        result = await prisma.user.updateMany({
          where: { isBlocked: true },
          data: { isBlocked: false }
        });
        break;
      case 'mark-multiple-ips-as-cheaters':
        // Find IPs with 3+ accounts
        const ipsWithMultipleAccounts = await prisma.$queryRaw`
          SELECT "ipAddress"
          FROM "User"
          WHERE "ipAddress" IS NOT NULL
          GROUP BY "ipAddress"
          HAVING COUNT(*) >= 3
        `;
        
        // Mark all users with these IPs as cheaters
        for (const row of ipsWithMultipleAccounts as any[]) {
          await prisma.user.updateMany({
            where: { ipAddress: row.ipAddress },
            data: { isCheater: true, isBot: true }
          });
        }
        
        result = { count: ipsWithMultipleAccounts.length };
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Admin bulk action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}