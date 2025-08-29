const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdminUser() {
  try {
    console.log('Checking for admin user...');

    // Get the admin telegram ID from environment variables
    const adminTelegramId = process.env.ADMIN_TELEGRAM_ID;
    console.log('Admin Telegram ID from env:', adminTelegramId);

    if (!adminTelegramId) {
      console.log('ADMIN_TELEGRAM_ID not found in environment variables');
      return;
    }

    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { telegramId: adminTelegramId }
    });

    if (adminUser) {
      console.log('Admin user found:', {
        id: adminUser.id,
        telegramId: adminUser.telegramId,
        firstName: adminUser.firstName,
        isAdmin: adminUser.isAdmin
      });
    } else {
      console.log('Admin user not found in database');
    }
  } catch (error) {
    console.error('Error checking admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminUser();