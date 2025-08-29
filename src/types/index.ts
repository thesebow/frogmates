export interface TelegramInitData {
  query_id?: string;
  user?: TelegramUser;
  auth_date?: string;
  hash?: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export interface UserData {
  id: string;
  telegramId: string;
  username: string | null;
  firstName: string;
  lastName: string | null;
  photoUrl: string | null;
  specialId: string;
  referrals: number;
  stars: number;
  isVerified: boolean;
  isAdmin: boolean;
  isCheater: boolean;
  isBot: boolean;
  isBlocked: boolean;
  joinedChannel: boolean;
  isPremium: boolean;
  ipAddress?: string | null;
  createdAt?: Date;
  lastActive?: Date;
  referredUsers?: UserData[];
}