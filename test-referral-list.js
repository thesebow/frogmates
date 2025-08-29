const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testReferralList() {
  try {
    console.log('Testing referral list functionality...');

    // Get a user with referrals and include referred users
    const userWithReferrals = await prisma.user.findFirst({
      where: {
        referrals: { gt: 0 }
      },
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

    if (userWithReferrals) {
      console.log('User with referrals found:', {
        id: userWithReferrals.id,
        firstName: userWithReferrals.firstName,
        referrals: userWithReferrals.referrals,
        referredUsersCount: userWithReferrals.referredUsers.length
      });

      console.log('Referred users:');
      userWithReferrals.referredUsers.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName || ''} (${user.specialId}) - Stars: ${user.stars}`);
      });

      // Test the data structure that would be sent to the frontend
      const userDataForFrontend = {
        id: userWithReferrals.id,
        telegramId: userWithReferrals.telegramId,
        firstName: userWithReferrals.firstName,
        lastName: userWithReferrals.lastName,
        username: userWithReferrals.username,
        photoUrl: userWithReferrals.photoUrl,
        specialId: userWithReferrals.specialId,
        referrals: userWithReferrals.referrals,
        stars: userWithReferrals.stars,
        isVerified: userWithReferrals.isVerified,
        isAdmin: userWithReferrals.isAdmin,
        isCheater: userWithReferrals.isCheater,
        isBot: userWithReferrals.isBot,
        isBlocked: userWithReferrals.isBlocked,
        joinedChannel: userWithReferrals.joinedChannel,
        isPremium: userWithReferrals.isPremium,
        referredUsers: userWithReferrals.referredUsers
      };

      console.log('User data structure for frontend:', JSON.stringify(userDataForFrontend, null, 2));
    } else {
      console.log('No users with referrals found');
    }
  } catch (error) {
    console.error('Error testing referral list:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReferralList();