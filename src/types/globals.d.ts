interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
      is_premium?: boolean;
    };
    auth_date: string;
    hash: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  ready(): void;
  expand(): void;
  close(): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void): void;
  openLink(url: string): void;
  openTelegramLink(url: string): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;

  // Bot API 8.0+
  requestFullscreen?: () => void;
  // Bot API 7.7+
  disableVerticalSwipes?: () => void;
  // Bot API 6.2+
  enableClosingConfirmation?: () => void;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}