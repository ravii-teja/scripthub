import { ScriptFormData } from '../components/ScriptForm';

// Mock function to simulate API call to Hugging Face Transformers
// In a real application, this would be an actual API call to a backend service
export const generateScreenplay = async (formData: ScriptFormData): Promise<string> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is a mock implementation
  // In a real app, you would make an API call to a backend that integrates with Hugging Face
  
  const { title, genre, setting, characters, plotPoints, tone } = formData;
  
  // Generate a sample screenplay based on input data
  // This is just a placeholder for demonstration
  const mockScreenplay = `TITLE: ${title || 'UNTITLED SCREENPLAY'}

FADE IN:

EXT. ${setting.toUpperCase()} - DAY

The sun shines brightly over the ${setting.toLowerCase()}.

${generateMockScene(characters, genre, tone, plotPoints)}

FADE OUT.

THE END`;

  return mockScreenplay;
};

// Helper function to generate mock content
const generateMockScene = (
  characters: string,
  genre: string,
  tone: string,
  plotPoints: string
): string => {
  // Parse characters from input
  const characterNames = characters
    .split(',')
    .map(char => char.trim().split(' ')[0])
    .filter(Boolean);
  
  // Ensure we have at least two characters
  if (characterNames.length < 2) {
    characterNames.push('STRANGER');
  }
  
  // Create a basic dialogue scene
  let scene = '';
  
  // Add character introductions
  scene += `We see ${characterNames[0].toUpperCase()}, a character with determination in their eyes.\n\n`;
  
  // Add some action based on genre
  if (genre === 'Action' || genre === 'Thriller') {
    scene += `${characterNames[0].toUpperCase()} moves quickly, looking over their shoulder.\n\n`;
  } else if (genre === 'Romance') {
    scene += `${characterNames[0].toUpperCase()} waits nervously, checking their watch.\n\n`;
  } else if (genre === 'Comedy') {
    scene += `${characterNames[0].toUpperCase()} trips over an invisible obstacle, recovering awkwardly.\n\n`;
  }
  
  // Add dialogue section
  scene += `${characterNames[0].toUpperCase()}\nI've been waiting for this moment.\n\n`;
  
  // Second character enters
  scene += `${characterNames[1].toUpperCase()} approaches from the distance.\n\n`;
  
  scene += `${characterNames[1].toUpperCase()}\nI didn't think you'd actually come.\n\n`;
  
  // Add tone-specific dialogue
  if (tone === 'Serious' || tone === 'Dramatic') {
    scene += `${characterNames[0].toUpperCase()}\nSome things are too important to ignore.\n\n`;
  } else if (tone === 'Humorous' || tone === 'Lighthearted') {
    scene += `${characterNames[0].toUpperCase()}\nWell, I had nothing better to do today!\n\n`;
  } else if (tone === 'Dark' || tone === 'Suspenseful') {
    scene += `${characterNames[0].toUpperCase()}\n(lowering voice)\nWe need to be careful. They could be watching.\n\n`;
  }
  
  // Add a plot point reference
  const plotFragment = plotPoints.split('.')[0];
  scene += `${characterNames[1].toUpperCase()}\nIs this about ${plotFragment.toLowerCase()}?\n\n`;
  
  // Add a reaction
  scene += `${characterNames[0].toUpperCase()} nods slowly.\n\n`;
  
  // Add more scenes as needed
  scene += `EXT. ${characterNames[0].toUpperCase()}'S APARTMENT - LATER\n\n`;
  scene += `${characterNames[0].toUpperCase()} paces back and forth, deep in thought.\n\n`;
  
  return scene;
};