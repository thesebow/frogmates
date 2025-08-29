'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

const TonConnectUI = () => {
  // Define manifest URL
  const manifestUrl = 'https://cdn.frogmates.suno.uz/manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="flex justify-center">
        <div className="bg-[#2C2C2E] rounded-full py-2 px-4 text-white font-medium flex items-center space-x-2 cursor-pointer">
          <div
            className="w-5 h-5 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/20uLOpoLtvCI0SnvuyxpybFUVds8uYLeg7874RSiUXBTvqIMO3.svg)' }}
          />
          <TonConnectButton />
        </div>
      </div>
    </TonConnectUIProvider>
  );
};

export default TonConnectUI;