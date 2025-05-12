import React, { useState } from 'react';
import { Wand2Icon, LoaderIcon } from 'lucide-react';

interface ScriptFormProps {
  onSubmit: (formData: ScriptFormData) => void;
  isLoading: boolean;
}

export interface ScriptFormData {
  title: string;
  genre: string;
  setting: string;
  characters: string;
  plotPoints: string;
  tone: string;
}

const ScriptForm: React.FC<ScriptFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ScriptFormData>({
    title: '',
    genre: '',
    setting: '',
    characters: '',
    plotPoints: '',
    tone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title (optional)
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          placeholder="Your screenplay title"
        />
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          required
        >
          <option value="">Select a genre</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Action">Action</option>
          <option value="Mystery">Mystery</option>
        </select>
      </div>

      <div>
        <label htmlFor="setting" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Setting
        </label>
        <input
          type="text"
          id="setting"
          name="setting"
          value={formData.setting}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          placeholder="e.g., Modern day New York, Medieval fantasy kingdom"
          required
        />
      </div>

      <div>
        <label htmlFor="characters" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Main Characters
        </label>
        <textarea
          id="characters"
          name="characters"
          rows={3}
          value={formData.characters}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          placeholder="Describe your main characters (names, traits, relationships)"
          required
        />
      </div>

      <div>
        <label htmlFor="plotPoints" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Plot Points
        </label>
        <textarea
          id="plotPoints"
          name="plotPoints"
          rows={4}
          value={formData.plotPoints}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          placeholder="Describe the main plot points or story beats"
          required
        />
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tone
        </label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          required
        >
          <option value="">Select a tone</option>
          <option value="Serious">Serious</option>
          <option value="Humorous">Humorous</option>
          <option value="Dark">Dark</option>
          <option value="Lighthearted">Lighthearted</option>
          <option value="Satirical">Satirical</option>
          <option value="Suspenseful">Suspenseful</option>
          <option value="Whimsical">Whimsical</option>
          <option value="Dramatic">Dramatic</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full inline-flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <>
              <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2Icon className="h-4 w-4 mr-2" />
              Generate Screenplay
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ScriptForm;