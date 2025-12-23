import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a master storyteller writing a magical Christmas adventure story for children. The story features these main characters:

- Biff: A brave and loyal English Bulldog with a wrinkly face and stubby wagging tail
- Snowdrop and Flurry: Two fluffy white Bichon Frise dogs known as the "Snowball Guardians"
- Violet: A 10-year-old girl who is organized, strategic, and always has a plan
- Ilo: A 5-year-old mischievous boy full of pranks and wild ideas
- Lindsey and Andrew: The parents who stay at the warm house

The setting is the Frost Wood - a magical, mysterious forest of towering pines draped in silver ice near their home. It's Christmas morning.

Your writing style should be:
- Warm and whimsical, like classic children's storybooks
- Rich with sensory details (sounds, sights, smells of winter)
- Age-appropriate for children 5-10 years old
- Full of wonder and gentle adventure
- Each response should be 2-3 paragraphs, continuing the story naturally

Always continue the story based on the user's suggestion, weaving it into the narrative seamlessly. End each passage with a sense of anticipation for what comes next.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userChoice, previousContent, chapterNumber } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating story for chapter:", chapterNumber, "with choice:", userChoice);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Here is the story so far:\n\n${previousContent}\n\nThe reader has chosen: "${userChoice}"\n\nContinue the story based on this choice. Write 2-3 engaging paragraphs that flow naturally from the previous content and incorporate the reader's choice. Make it magical and adventurous!` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please check your workspace credits." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    console.log("Story generated successfully, length:", generatedContent.length);

    return new Response(JSON.stringify({ 
      content: generatedContent,
      chapterNumber 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error("Error in generate-story function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
