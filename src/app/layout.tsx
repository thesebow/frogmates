import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frogmates Telegram Web App",
  description: "A Telegram Web App for Frogmates community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://telegram.org/js/telegram-web-app.js"
          async
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased bg-black">
        {children}
      </body>
    </html>
  );
}