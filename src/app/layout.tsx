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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
