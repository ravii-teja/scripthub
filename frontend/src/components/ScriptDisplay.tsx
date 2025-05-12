import React, { useRef } from 'react';
import { DownloadIcon, Copy, Share2 } from 'lucide-react';

interface ScriptDisplayProps {
  script: {
    title: string;
    content: string;
  } | null;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script }) => {
  const scriptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!script) return;
    
    const element = document.createElement('a');
    const file = new Blob([script.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${script.title || 'screenplay'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script.content);
  };

  const handleShare = async () => {
    if (!script) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: script.title || 'My Screenplay',
          text: script.content,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  if (!script) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {script.title || 'Untitled Screenplay'}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label="Copy screenplay"
            title="Copy to clipboard"
          >
            <Copy className="h-5 w-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label="Download screenplay"
            title="Download as text file"
          >
            <DownloadIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label="Share screenplay"
            title="Share screenplay"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-auto max-h-[70vh] screenplay">
        <div 
          ref={scriptRef}
          className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200 p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
        >
          {script.content}
        </div>
      </div>
    </div>
  );
};

export default ScriptDisplay;