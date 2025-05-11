import React, { useState } from 'react';
import ScriptForm, { ScriptFormData } from '../components/ScriptForm';
import ScriptDisplay from '../components/ScriptDisplay';
import { generateScreenplay } from '../services/transformersService';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ScriptFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const screenplay = await generateScreenplay(formData);
      
      // Save to local storage for history
      const savedScripts = JSON.parse(localStorage.getItem('scriptHistory') || '[]');
      const newScript = {
        id: Date.now(),
        title: formData.title || 'Untitled Screenplay',
        content: screenplay,
        createdAt: new Date().toISOString(),
        genre: formData.genre,
        summary: formData.plotPoints.substring(0, 100) + '...'
      };
      
      localStorage.setItem('scriptHistory', JSON.stringify([newScript, ...savedScripts]));
      
      setScript({
        title: formData.title || 'Untitled Screenplay',
        content: screenplay
      });
    } catch (err) {
      console.error('Error generating screenplay:', err);
      setError('Failed to generate screenplay. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Generate Your 10-Minute Short Film Screenplay
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Fill in the details below and let our AI create a professional screenplay for your short film
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <ScriptForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          
          <div className={`transition-opacity duration-300 ${script ? 'opacity-100' : 'opacity-0'}`}>
            {script && <ScriptDisplay script={script} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;