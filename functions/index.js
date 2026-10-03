const { onRequest } = require("firebase-functions/v2/https");

/**
 * Arceus Gear Backend AI Proxy
 * Securely forwards AI requests to OpenRouter without exposing API keys to the browser.
 */
exports.askAi = onRequest({ cors: true }, async (req, res) => {
  // Read secret from environment variable or Firebase Secret Manager
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENROUTER_API_KEY is not configured in backend environment."
    });
  }

  const { prompt, message } = req.body || {};
  const userText = prompt || message || "";

  if (!userText.trim()) {
    return res.status(400).json({ error: "Prompt or message is required." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://arceusgear.web.app",
        "X-Title": "ARCEUS GEAR"
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages: [
          {
            role: "system",
            content: `You are INFY AI, the elite hardware and gaming copilot for ARCEUS GEAR e-commerce store.
Answer queries intelligently and directly in English or Tamil. When discussing laptops, PCs, GPUs, or processors, clearly highlight specs, wattage, thermal headroom, and price-to-performance value. Keep your response crisp, authoritative, and friendly.`
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to communicate with OpenRouter upstream",
      details: err.message
    });
  }
});
