"use server"

import { scrapeUrl } from "./scrape";
import { GoogleGenAI } from '@google/genai';

// Initialize the new GoogleGenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function generateDrafts(url: string) {
  try {
    // 1. Scrape the URL content
    const scrapeResult = await scrapeUrl(url);
    
    if (!scrapeResult.success || !scrapeResult.text) {
      return { success: false, error: scrapeResult.error || "Failed to scrape URL" };
    }

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, error: "Gemini API Key is missing. Please add GEMINI_API_KEY to your .env.local" };
    }

    const cleanText = scrapeResult.text.substring(0, 50000);

    // 2. Construct the prompt
    const prompt = `
      You are an expert copywriter and event summarizer.
      I have scraped the content of an event webpage. Please analyze it and provide:
      1. A crisp, engaging summary of the event (around 3-4 sentences). Focus on what the event is about, who it's for, and key takeaways.
      2. A highly engaging LinkedIn post to share excitement about the event or summarize its learnings. Use appropriate spacing, emojis, and hashtags.
      3. A viral Twitter/X post or thread about the event. Make it punchy. Use emojis and hashtags.
      
      The output MUST be a valid JSON object with EXACTLY these three keys:
      {
        "summary": "...",
        "linkedin": "...",
        "twitter": "..."
      }
      
      Here is the scraped event content:
      ${cleanText}
    `;

    // 3. Configure the new SDK
    const config = {
      // Ensure we get valid JSON back
      responseMimeType: "application/json",
    };

    // 4. Generate content using the new model and SDK
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config,
    });

    const textResponse = response.text || "";
    // Clean up any potential markdown wrappers that Gemini might still add
    const cleanedTextResponse = textResponse.replace(/```json\n?|\n?```/g, "").trim();
    
    // Parse the JSON response
    const generatedData = JSON.parse(cleanedTextResponse);
    
    return { success: true, data: generatedData };

  } catch (error) {
    console.error("Error generating drafts:", error);
    return { success: false, error: "Failed to generate drafts from AI" };
  }
}
