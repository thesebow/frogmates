const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkReferrals() {
  try {
    console.log('Checking referral system...');

    // Get a user with referrals
    const userWithReferrals = await prisma.user.findFirst({
      where: {
        referrals: { gt: 0 }
      },
      include: {
        referredUsers: true
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
        console.log(`  ${index + 1}. ${user.firstName} (${user.specialId})`);
      });
    } else {
      console.log('No users with referrals found');
    }
  } catch (error) {
    console.error('Error checking referrals:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkReferrals();