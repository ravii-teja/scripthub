import React, { useState, useEffect } from 'react';
import { ClockIcon, Trash2Icon, EyeIcon } from 'lucide-react';
import ScriptDisplay from '../components/ScriptDisplay';

interface ScriptHistoryItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  genre: string;
  summary: string;
}

const ScriptHistory: React.FC = () => {
  const [scripts, setScripts] = useState<ScriptHistoryItem[]>([]);
  const [selectedScript, setSelectedScript] = useState<ScriptHistoryItem | null>(null);

  useEffect(() => {
    const savedScripts = JSON.parse(localStorage.getItem('scriptHistory') || '[]');
    setScripts(savedScripts);
  }, []);

  const handleDelete = (id: number) => {
    const updatedScripts = scripts.filter(script => script.id !== id);
    setScripts(updatedScripts);
    localStorage.setItem('scriptHistory', JSON.stringify(updatedScripts));
    
    if (selectedScript && selectedScript.id === id) {
      setSelectedScript(null);
    }
  };

  const handleView = (script: ScriptHistoryItem) => {
    setSelectedScript(script);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Screenplay History</h1>
        
        {scripts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-300">
            <ClockIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No screenplays yet</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Generate your first screenplay to see it appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your Screenplays</h2>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[70vh] overflow-y-auto">
                  {scripts.map(script => (
                    <li key={script.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors duration-150">
                      <div 
                        className={`p-4 ${selectedScript?.id === script.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => handleView(script)}
                      >
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">{script.title}</h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(script.id);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-150"
                            aria-label="Delete screenplay"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{script.genre}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {formatDate(script.createdAt)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                          {script.summary}
                        </p>
                        <button
                          className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(script);
                          }}
                        >
                          <EyeIcon className="h-3 w-3 mr-1" />
                          View screenplay
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-2">
              {selectedScript ? (
                <ScriptDisplay script={{ title: selectedScript.title, content: selectedScript.content }} />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center h-full flex items-center justify-center transition-colors duration-300">
                  <div>
                    <EyeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select a screenplay to view
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Click on any screenplay from the list to view its content.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptHistory;