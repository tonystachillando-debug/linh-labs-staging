
export interface ChatResponse {
  output: string;
}

const WEBHOOK_URL = "https://n8n-gg-u56901.vm.elestio.app/webhook/linh-labs";

export const sendMessageToAgent = async (message: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Robust response handling: read text first to avoid "Unexpected end of JSON input"
    const text = await response.text();

    if (!text) {
      return ""; 
    }

    try {
      const data = JSON.parse(text);
      
      // Handle n8n array response format or single object
      const payload = Array.isArray(data) ? data[0] : data;

      // Check for common output keys
      if (payload && typeof payload === 'object') {
        return payload.output || payload.text || payload.message || JSON.stringify(payload);
      }
      
      return String(payload);
    } catch (e) {
      // If JSON parse fails, return the raw text response
      return text;
    }
  } catch (error) {
    console.error("Chat webhook error:", error);
    return "Mi dispiace, al momento non riesco a connettermi al server. Riprova tra poco.";
  }
};
