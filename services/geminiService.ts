
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a dream scene image using the Imagen model.
 * @param prompt The descriptive prompt for the image.
 * @returns A base64 encoded string of the generated JPEG image.
 */
export async function generateDreamScene(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch(error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to connect to the visual cortex of the dream engine.");
  }
}

/**
 * Generates a calm narrative intro for a dream using the Gemini model.
 * @param prompt The prompt containing the dream themes.
 * @returns A string containing the dream narrative.
 */
export async function generateDreamNarrative(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a gentle dream weaver, crafting soothing and imaginative introductions to dreams. Your tone is calm, poetic, and reassuring. You speak in the second person ("You are...", "You feel..."). Start the narrative directly, without any preamble like "Tonight, you will dream of...". Keep it to 2-4 beautiful sentences.`,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating narrative:", error);
    throw new Error("The storyteller seems to be asleep. Could not generate narrative.");
  }
}
