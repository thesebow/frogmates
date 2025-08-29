'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  onLoadComplete: () => void;
}

const Loading = ({ onLoadComplete }: LoadingProps) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading dots animation
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate loading completion after 3 seconds
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onLoadComplete();
      }, 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frogmates
          </h1>
          <p className="text-gray-400 text-lg mt-2">Loading your experience</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center">
          <div className={`w-3 h-3 bg-blue-400 rounded-full transition-all duration-300 ${dots.length >= 1 ? 'scale-110 opacity-100' : 'scale-75 opacity-40'}`}></div>
          <div className={`w-3 h-3 bg-purple-400 rounded-full transition-all duration-300 ${dots.length >= 2 ? 'scale-110 opacity-100' : 'scale-75 opacity-40'}`}></div>
          <div className={`w-3 h-3 bg-pink-400 rounded-full transition-all duration-300 ${dots.length >= 3 ? 'scale-110 opacity-100' : 'scale-75 opacity-40'}`}></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm mt-6">
          Preparing your dashboard{dots}
        </p>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Loading;