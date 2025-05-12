import { ScriptFormData } from '../components/ScriptForm';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const generateScreenplay = async (formData: ScriptFormData): Promise<string> => {
  try {
    console.log('Invoking generate-script function...');
    const { data, error } = await supabase.functions.invoke('generate-script', {
      body: JSON.stringify(formData)
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Supabase function error: ${error.message}`);
    }

    if (!data?.screenplay) {
      console.error('No screenplay in response:', data);
      throw new Error('No screenplay generated');
    }

    console.log('Screenplay generated successfully');
    return data.screenplay;
  } catch (error) {
    console.error('Error generating screenplay:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to generate screenplay. Please try again.'
    );
  }
};