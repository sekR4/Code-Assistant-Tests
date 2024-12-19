import Image from "next/image";
import FileUpload from './components/FileUpload';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Image Description Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Upload an image and get an AI-generated description
          </p>
        </div>
        
        <div className="mt-10">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
