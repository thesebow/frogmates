'use client';

// Helper functions for Telegram WebApp

/**
 * Informs the Telegram app that the Mini App is ready to be displayed
 * Call this as early as possible to hide the loading placeholder
 */
export function telegramReady(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
  }
}

/**
 * Expands the Mini App to the maximum available height
 */
export function telegramExpand(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand();
  }
}

/**
 * Requests opening the Mini App in fullscreen mode
 * Available in Bot API 8.0+
 */
export function telegramRequestFullscreen(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    if (window.Telegram.WebApp.requestFullscreen) {
      window.Telegram.WebApp.requestFullscreen();
    }
  }
}

/**
 * Disables vertical swipes to close or minimize the Mini App
 * Available in Bot API 7.7+
 */
export function telegramDisableVerticalSwipes(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    if (window.Telegram.WebApp.disableVerticalSwipes) {
      window.Telegram.WebApp.disableVerticalSwipes();
    }
  }
}

/**
 * Enables a confirmation dialog while the user is trying to close the Mini App
 * Available in Bot API 6.2+
 */
export function telegramEnableClosingConfirmation(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    if (window.Telegram.WebApp.enableClosingConfirmation) {
      window.Telegram.WebApp.enableClosingConfirmation();
    }
  }
}

/**
 * Disable text selection and copying
 */
export function disableTextSelection(): void {
  if (typeof window !== 'undefined') {
    // Add a style tag to disable selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      
      img {
        -webkit-touch-callout: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Prevent context menu in Telegram WebApp, but allow in browser
    document.addEventListener('contextmenu', (e) => {
      // Allow context menu only in browser, not in Telegram WebApp
      if (window.Telegram?.WebApp) {
        e.preventDefault();
      }
    });
  }
}

/**
 * Sets the header color of the Mini App
 * @param color Color in #RRGGBB format
 */
export function telegramSetHeaderColor(color: string): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.headerColor = color;
  }
}

/**
 * Initialize all Telegram WebApp settings at once
 */
export function initializeTelegramWebApp(): void {
  if (typeof window !== 'undefined') {
    // Disable text selection
    disableTextSelection();

    if (window.Telegram?.WebApp) {
      // Tell Telegram the app is ready
      telegramReady();

      // Expand to maximum height
      telegramExpand();

      // Request fullscreen mode if available
      telegramRequestFullscreen();

      // Disable vertical swipes if available
      telegramDisableVerticalSwipes();

      // Enable closing confirmation
      telegramEnableClosingConfirmation();

      // Set header color
      telegramSetHeaderColor('#000000');
    }
  }
}