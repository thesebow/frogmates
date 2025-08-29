import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { TelegramInitData, TelegramUser } from '../types';

// Generate a 6-digit special ID
export function generateSpecialId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate Telegram WebApp data
export function validateTelegramWebAppData(initDataString: string): boolean {
  try {
    const urlParams = new URLSearchParams(initDataString);
    const hash = urlParams.get('hash');

    if (!hash) return false;

    // Remove hash from data before checking
    urlParams.delete('hash');

    // Sort params alphabetically
    const params: [string, string][] = [];
    urlParams.forEach((value, key) => {
      params.push([key, value]);
    });
    params.sort(([a], [b]) => a.localeCompare(b));

    // Create data check string
    const dataCheckString = params.map(([key, value]) => `${key}=${value}`).join('\n');

    // Calculate hash
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN || '').digest();
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram WebApp data:', error);
    return false;
  }
}

// Parse Telegram WebApp init data
export function parseTelegramInitData(initDataString: string): TelegramInitData {
  try {
    const data: TelegramInitData = {};
    const params = new URLSearchParams(initDataString);

    data.query_id = params.get('query_id') || undefined;
    data.auth_date = params.get('auth_date') || undefined;
    data.hash = params.get('hash') || undefined;

    const userStr = params.get('user');
    if (userStr) {
      data.user = JSON.parse(userStr) as TelegramUser;
    }

    return data;
  } catch (error) {
    console.error('Error parsing Telegram init data:', error);
    return {};
  }
}

// Generate JWT token
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
  } catch (error) {
    return null;
  }
}

// Check if user is a cheater (multiple accounts from same IP)
export async function checkIfCheater(ipAddress: string, prisma: any): Promise<boolean> {
  if (!ipAddress) return false;

  const accountsFromSameIp = await prisma.user.count({
    where: { ipAddress }
  });

  return accountsFromSameIp >= 3;
}

// Get referral link
export function getReferralLink(specialId: string): string {
  return `https://t.me/frogmates_bot/app?startapp=${specialId}`;
}

// Check if string is a valid telegram ID
export function isValidTelegramId(id: string): boolean {
  return /^\d+$/.test(id);
}
