"use client";
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import ResultDisplay from "./components/ResultDisplay";

export default function HomePage() {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <main className="space-y-8">
        <h1 className="text-3xl font-bold text-center">Image to Text</h1>
        <FileUploader
          onUploadSuccess={setDescription}
          onUploadError={setError}
        />
        {(description || error) && (
          <ResultDisplay description={description} error={error} />
        )}
      </main>
    </div>
  );
}
