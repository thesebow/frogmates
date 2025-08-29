'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

const TonConnectUI = () => {
  // Define manifest URL
  const manifestUrl = 'https://cdn.frogmates.suno.uz/uploads/manifest/8BROgKnGXdBXpnxEKO2W2myNJ2CC0EIFWiT6jUq2pqjAV3h4H6.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="flex justify-center">
        <div className="ton-connect-ui">
          <TonConnectButton />
        </div>
      </div>

      <style jsx global>{`
        .ton-connect-ui {
          width: 100%;
        }
        .ton-button {
          background: transparent !important;
          padding: 0 !important;
          font-family: 'SF Pro Rounded', system-ui, sans-serif !important;
          font-weight: 600 !important;
          color: #0098EA !important;
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
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