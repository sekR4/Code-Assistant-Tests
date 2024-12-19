"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const selectedFile = event.dataTransfer.files[0];
            setFile(selectedFile);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const validateFile = () => {
        if (!file) return false;
        const validTypes = ['image/png', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        return validTypes.includes(file.type) && file.size <= maxSize;
    };

    const handleSubmit = async () => {
        if (!validateFile()) {
            toast.error("Invalid file. Please upload a PNG or JPEG image under 5MB.");
            return;
        }

        setLoading(true);

        // Simulate processing
        setTimeout(() => {
            setLoading(false);
            toast.success('File uploaded successfully!');
            setFile(null); // Reset file state after "upload"
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <div 
                onDrop={handleDrop} 
                onDragOver={(event) => event.preventDefault()} 
                className={`w-full h-64 border-dashed border-2 border-gray-300 rounded-md flex justify-center items-center ${file ? 'border-green-500' : ''}`}
            >
                Drag and drop your image here or click to upload
                <input
                    type="file"
                    hidden
                    onChange={handleChange}
                    accept=".png, .jpg, .jpeg"
                />
            </div>
            {file && (
                <p className="text-sm text-gray-600">
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
            )}
            {!loading && (
                <button 
                    onClick={handleSubmit}
                    disabled={!file || !validateFile()}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!validateFile() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Upload
                </button>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default FileUploader;