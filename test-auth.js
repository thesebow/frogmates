const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function testAuthFlow() {
  try {
    console.log('Testing authentication flow...');

    // Get the admin user
    const adminUser = await prisma.user.findUnique({
      where: { telegramId: '5692090670' }
    });

    if (!adminUser) {
      console.log('Admin user not found');
      return;
    }

    console.log('Admin user found:', {
      id: adminUser.id,
      telegramId: adminUser.telegramId,
      firstName: adminUser.firstName,
      isAdmin: adminUser.isAdmin
    });

    // Generate a token for the admin user
    const token = jwt.sign({ userId: adminUser.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    console.log('Generated token:', token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    console.log('Decoded token:', decoded);

    // Test admin API access
    console.log('Testing admin API access...');

    // Simulate what the admin panel does
    const adminCheck = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (adminCheck && adminCheck.isAdmin) {
      console.log('Admin access verified successfully');

      // Get stats
      const totalUsers = await prisma.user.count();
      const verifiedUsers = await prisma.user.count({ where: { isVerified: true } });
      const premiumUsers = await prisma.user.count({ where: { isPremium: true } });
      const blockedUsers = await prisma.user.count({ where: { isBlocked: true } });
      const cheaters = await prisma.user.count({ where: { isCheater: true } });
      const bots = await prisma.user.count({ where: { isBot: true } });

      console.log('Admin stats:', {
        totalUsers,
        verifiedUsers,
        premiumUsers,
        blockedUsers,
        cheaters,
        bots
      });
    } else {
      console.log('Admin access failed');
    }
  } catch (error) {
    console.error('Error in auth flow test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthFlow();