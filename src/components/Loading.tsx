'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  onLoadComplete: () => void;
}

const Loading = ({ onLoadComplete }: LoadingProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Simulate loading dots animation
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    // Simulate loading completion after 3 seconds
    const timeout = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div
        className="w-32 h-32 bg-no-repeat bg-center bg-contain mb-12"
        style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/m3MX2OyKox82JeqibeTpBzjkC76CPpHJxkwrBBybTR5Yuxcpch.svg)' }}
      />
      <div className="mt-4 flex space-x-2">
        <div className={`w-3 h-3 bg-white rounded-full ${dots.length === 0 ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}></div>
        <div className={`w-3 h-3 bg-white rounded-full ${dots.length === 1 ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}></div>
        <div className={`w-3 h-3 bg-white rounded-full ${dots.length === 2 ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}></div>
      </div>
    </div>
  );
};

export default Loading;