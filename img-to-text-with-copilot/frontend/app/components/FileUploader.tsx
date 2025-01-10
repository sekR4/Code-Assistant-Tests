"use client";
import React, { useEffect, useState } from "react";

interface FileUploaderProps {
  onUploadSuccess: (description: string) => void;
  onUploadError: (error: string) => void;
}

export default function FileUploader({ onUploadSuccess, onUploadError }: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'ready' | 'error'>('checking');

  useEffect(() => {
    // Check if backend is available
    fetch('http://localhost:8000/health')
      .then(res => res.ok ? setServerStatus('ready') : setServerStatus('error'))
      .catch(() => setServerStatus('error'));
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (serverStatus !== 'ready') {
      onUploadError('Backend server is not available. Please check if it\'s running on http://localhost:8000');
      return;
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      onUploadError("Only PNG or JPG files allowed.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onUploadError("File size exceeds 5MB limit.");
      return;
    }

    setIsLoading(true);
    console.log('Starting file upload:', file.name);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/image-to-text', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      if (!data.description) {
        throw new Error('Invalid response format');
      }
      
      console.log('Upload successful');
      onUploadSuccess(data.description);
    } catch (err) {
      console.error('Upload error:', err);
      onUploadError(
        serverStatus === 'error' 
          ? 'Backend server is not responding. Please check if it\'s running on http://localhost:8000'
          : 'Upload failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
      {serverStatus === 'error' && (
        <div className="text-red-500 mb-4">
          Warning: Backend server is not available
        </div>
      )}
      <label className={`block ${serverStatus === 'error' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        <div className="space-y-4">
          <div className="text-lg font-medium">
            {isLoading ? 'Processing...' : 'Drop an image here or click to upload'}
          </div>
          <div className="text-sm text-gray-500">
            PNG, JPG up to 5MB
          </div>
        </div>
      </label>
    </div>
  );
}