import { ScriptFormData } from '../components/ScriptForm';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const generateScreenplay = async (formData: ScriptFormData): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-script', {
      body: JSON.stringify(formData)
    });

    if (error) throw new Error(error.message);
    if (!data?.screenplay) throw new Error('No screenplay generated');

    return data.screenplay;
  } catch (error) {
    console.error('Error generating screenplay:', error);
    throw new Error('Failed to generate screenplay. Please try again.');
  }
};