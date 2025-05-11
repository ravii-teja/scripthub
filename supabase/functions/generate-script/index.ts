import { pipeline } from "npm:@xenova/transformers@2.15.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { genre, setting, characters, plotPoints, tone } = await req.json();

    // Initialize the text generation pipeline
    const generator = await pipeline('text-generation', 'Xenova/gpt2-screenplay');

    // Create a prompt that follows screenplay format
    const prompt = `GENRE: ${genre}\nSETTING: ${setting}\n\nFADE IN:\n\nEXT. ${setting.toUpperCase()} - DAY\n\n`;

    // Generate the screenplay
    const result = await generator(prompt, {
      max_length: 1000,
      num_return_sequences: 1,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.9,
    });

    // Process the generated text to ensure proper screenplay formatting
    const screenplay = result[0].generated_text
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return new Response(
      JSON.stringify({ screenplay }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});