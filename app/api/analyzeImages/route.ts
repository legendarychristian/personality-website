import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { images: string[] } = await req.json();
    const images = body.images || [];

    console.log("Received Base64 images:", images.length);
    console.log("First Image (truncated):", images[0]?.substring(0, 50));

    if (!images.length) {
      return new Response(JSON.stringify({ error: "No images provided" }), { status: 400 });
    }

    const formattedImages = images.map((image: string) => ({
      type: "image_url",
      image_url: { url: image },
    }));

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              "Analyze the provided images and extract exactly six distinct, concise descriptive terms relating to personality traits. " +
              "The terms should be really funny. " +
              "Respond with only the six terms separated by commas, no numbering, no extra text.",
          },
          { role: "user", content: formattedImages },
        ],
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    console.log("OpenAI API Response:", data);

    // ✅ Explicitly type `t: string` in `.map()` to fix TypeScript error
    const terms = data.choices?.[0]?.message?.content
      ?.split(",")
      .map((t: string) => t.trim()) // <-- Fix here
      .slice(0, 6) || [];

    console.log("Extracted terms:", terms);

    return new Response(JSON.stringify({ terms }), { status: 200 });
  } catch (error) {
    console.error("Error analyzing images:", error);
    return new Response(JSON.stringify({ error: "Failed to analyze images" }), { status: 500 });
  }
}
