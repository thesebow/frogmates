'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

const TonConnectUI = () => {
  // Define manifest URL
  const manifestUrl = 'https://cdn.frogmates.suno.uz/uploads/manifest/8BROgKnGXdBXpnxEKO2W2myNJ2CC0EIFWiT6jUq2pqjAV3h4H6.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="flex justify-center">
        <div className="bg-[#1C1C1E] rounded-full py-2 px-6 text-[#0098EA] font-semibold flex items-center space-x-2 cursor-pointer overflow-hidden">
          <div
            className="w-5 h-5 bg-no-repeat bg-center bg-contain mr-2"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/20uLOpoLtvCI0SnvuyxpybFUVds8uYLeg7874RSiUXBTvqIMO3.svg)' }}
          />
          <div className="ton-connect-ui">
            <TonConnectButton />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ton-button {
          background: transparent !important;
          padding: 0 !important;
          font-family: 'SF Pro Rounded', system-ui, sans-serif !important;
          font-weight: 600 !important;
          color: #0098EA !important;
        }
        .ton-button span {
          color: #0098EA !important;
        }
        .ton-button .tc-button__loader {
          margin: 0 !important;
        }
      `}</style>
    </TonConnectUIProvider>
  );
};

export default TonConnectUI;