
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Smart Advisor AI" for AgriAstra (formerly Bharat Krishi OS).
You are trained on ICAR journals, climate data, and market behavior.

CRITICAL RESPONSE FORMAT:
Whenever a user asks about any feature or help, respond in this exact order:
1. Layout – Where it appears in the UI
2. Data Source – Which system feeds it
3. Action Step – What the user can do

Style: Use Hinglish (Hindi mixed with English) or simple English.
Be empathetic, professional, and rural-friendly.
`;

export class AdvisorService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getFastAdvice(prompt: string) {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.5 }
      });
      return { text: response.text || "No response." };
    } catch (error) {
      console.error("Fast AI Error:", error);
      return { text: "Network error. Please try again." };
    }
  }

  async translateText(text: string, targetLanguage: string) {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ 
          role: 'user', 
          parts: [{ text: `Translate the following agricultural/tech UI text to ${targetLanguage}. Keep the tone professional but accessible. Return ONLY the translated text.\n\nText: "${text}"` }] 
        }],
        config: { temperature: 0.1 }
      });
      return response.text?.trim() || text;
    } catch (error) {
      console.error("Translation Error:", error);
      return text;
    }
  }

  async getThinkingAdvice(prompt: string, history: any[] = []) {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 32768 },
        }
      });
      return { text: response.text || "Thinking failed." };
    } catch (error) {
      console.error("Thinking AI Error:", error);
      return { text: "Deep thinking is currently unavailable." };
    }
  }

  async getSearchAdvice(prompt: string) {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri
      })).filter((s: any) => s.uri) || [];
      return { text: response.text || "No search results.", sources };
    } catch (error) {
      console.error("Search AI Error:", error);
      return { text: "Search grounding is currently down." };
    }
  }

  async generateAgriVideo(prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') {
    const ai = this.getAI();
    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic Indian agricultural footage: ${prompt}`,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio }
      });
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      console.error("Video Gen Error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        throw new Error("API_KEY_RESET");
      }
      throw error;
    }
  }
}

export const advisorService = new AdvisorService();
