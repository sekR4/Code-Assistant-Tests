'use client';

import { useState } from 'react';

interface ResultDisplayProps {
  description: string | null;
  error: string | null;
  imageUrl: string | null;
}

export default function ResultDisplay({ description, error, imageUrl }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!description) return;
    
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!description && !error && !imageUrl) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4">
      {error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {imageUrl && (
            <div className="relative w-full aspect-video rounded-t-lg overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="object-contain w-full h-full"
              />
            </div>
          )}
          {description && (
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">Image Description</h3>
                <button
                  onClick={handleCopy}
                  className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md px-2 py-1"
                >
                  {copied ? (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </span>
                  )}
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
