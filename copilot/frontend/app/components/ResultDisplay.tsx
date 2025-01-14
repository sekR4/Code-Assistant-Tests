interface ResultDisplayProps {
  description: string;
  error?: string;
}

export default function ResultDisplay({ description, error }: ResultDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          <p className="whitespace-pre-wrap">{description}</p>
          {description && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Copy to Clipboard
            </button>
          )}
        </div>
      )}
    </div>
  );
}