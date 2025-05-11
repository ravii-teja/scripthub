import React from 'react';
import { BookOpenIcon, GithubIcon, CodeIcon, AwardIcon } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">About ScriptHub</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <BookOpenIcon className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            ScriptHub is a powerful tool designed to help filmmakers, screenwriters, and creative enthusiasts 
            generate professional 10-minute short film screenplays using artificial intelligence.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Our application leverages the advanced capabilities of Hugging Face Transformers, a state-of-the-art 
            natural language processing library, to turn your creative inputs into properly formatted 
            screenplays ready for production.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">How It Works</h2>
          
          <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-8">
            <li className="pl-4">
              <span className="font-medium">Input your screenplay parameters</span>: Provide details about the genre, 
              setting, characters, plot points, and overall tone of your short film.
            </li>
            <li className="pl-4">
              <span className="font-medium">AI Generation</span>: Our application processes your inputs through the 
              Hugging Face Transformers model to create a coherent, professionally formatted screenplay.
            </li>
            <li className="pl-4">
              <span className="font-medium">Review and Export</span>: Once generated, you can review your screenplay, 
              make adjustments if needed, and download it in standard screenplay format.
            </li>
            <li className="pl-4">
              <span className="font-medium">Save to History</span>: All your generated screenplays are saved to your 
              history for easy access later.
            </li>
          </ol>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Technology Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-colors duration-300">
              <CodeIcon className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Frontend</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">React, TypeScript, Tailwind CSS</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-colors duration-300">
              <AwardIcon className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">AI Engine</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hugging Face Transformers</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-colors duration-300">
              <GithubIcon className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Version Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Privacy and Data</h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            We value your privacy and creative work. All screenplays are stored locally in your browser's storage 
            and are not sent to any external servers except during the generation process. Your creative content 
            remains yours.
          </p>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ScriptHub is an open-source project. Contributions and feedback are welcome.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;