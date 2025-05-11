import { pipeline } from "npm:@xenova/transformers@2.15.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Verify request method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    // Validate request body
    const body = await req.json().catch(() => null);
    if (!body) {
      throw new Error('Invalid request body');
    }

    const { genre, setting, characters, plotPoints, tone } = body;

    // Validate required fields
    if (!genre || !setting || !characters || !plotPoints || !tone) {
      throw new Error('Missing required fields');
    }

    // Initialize the text generation pipeline with error handling
    let generator;
    try {
      generator = await pipeline('text-generation', 'Xenova/gpt2-screenplay');
    } catch (error) {
      console.error('Failed to initialize pipeline:', error);
      throw new Error('Failed to initialize text generation model');
    }

    // Create a prompt that follows screenplay format
    const prompt = `
GENRE: ${genre}
SETTING: ${setting}
CHARACTERS: ${characters}
TONE: ${tone}

FADE IN:

EXT. ${setting.toUpperCase()} - DAY

${plotPoints}
`.trim();

    // Generate the screenplay with error handling
    const result = await generator(prompt, {
      max_length: 1000,
      num_return_sequences: 1,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.9,
    }).catch((error) => {
      console.error('Generation failed:', error);
      throw new Error('Failed to generate screenplay');
    });

    // Process the generated text
    const screenplay = result[0].generated_text
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return new Response(
      JSON.stringify({ screenplay }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in edge function:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error',
        details: error.stack
      }),
      {
        status: error.status || 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});