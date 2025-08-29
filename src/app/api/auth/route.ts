import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { 
  validateTelegramWebAppData, 
  parseTelegramInitData, 
  generateSpecialId, 
  generateToken,
  checkIfCheater
} from '@/utils';

export async function POST(req: NextRequest) {
  try {
    const { initData, ipAddress } = await req.json();
    
    // Validate Telegram WebApp data
    if (!validateTelegramWebAppData(initData)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    // Parse the init data
    const telegramData = parseTelegramInitData(initData);
    
    if (!telegramData.user) {
      return NextResponse.json({ error: 'User data not found' }, { status: 400 });
    }
    
    const { id, first_name, last_name, username, photo_url, is_premium } = telegramData.user;
    
    // Check for referral
    const startParam = new URLSearchParams(initData).get('start_param');
    let referrer = null;
    
    if (startParam) {
      referrer = await prisma.user.findUnique({
        where: { specialId: startParam }
      });
    }
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { telegramId: id.toString() }
    });
    
    if (!user) {
      // Create new user
      const specialId = generateSpecialId();
      
      user = await prisma.user.create({
        data: {
          telegramId: id.toString(),
          firstName: first_name,
          lastName: last_name || null,
          username: username || null,
          photoUrl: photo_url || null,
          specialId,
          referrerId: referrer?.id || null,
          ipAddress,
          isPremium: is_premium || false
        }
      });
      
      // Update referrer's stats if user is referred
      if (referrer) {
        await prisma.user.update({
          where: { id: referrer.id },
          data: { 
            referrals: { increment: 1 },
            stars: { increment: 5 }
          }
        });
      }
      
      // Check if user is a potential cheater (multiple accounts from same IP)
      if (ipAddress) {
        const isCheater = await checkIfCheater(ipAddress, prisma);
        
        if (isCheater) {
          // Mark all accounts from this IP as cheaters
          await prisma.user.updateMany({
            where: { ipAddress },
            data: { isCheater: true, isBot: true }
          });
          
          // Update the current user as well
          user = await prisma.user.update({
            where: { id: user.id },
            data: { isCheater: true, isBot: true }
          });
        }
      }
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: first_name,
          lastName: last_name || null,
          username: username || null,
          photoUrl: photo_url || null,
          isPremium: is_premium || false,
          lastActive: new Date(),
          ipAddress: ipAddress || user.ipAddress
        }
      });
    }
    
    // Check if user is admin
    const isAdmin = user.telegramId === process.env.ADMIN_TELEGRAM_ID;
    
    if (isAdmin && !user.isAdmin) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { 
          isAdmin: true,
          isVerified: true
        }
      });
    }
    
    // Generate auth token
    const token = generateToken(user.id);
    
    return NextResponse.json({
      token,
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
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}