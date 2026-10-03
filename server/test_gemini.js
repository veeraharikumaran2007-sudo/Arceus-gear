import dotenv from 'dotenv';
dotenv.config();
const key = process.env.GEMINI_API_KEY || '';

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: 'You are INFY AI for Arceus Gear. The user said: "fff". Answer naturally asking how to assist them with gaming hardware. Output valid JSON: {"reply": "...", "recommendedProductIds": [], "insights": "..."}'
        }]
      }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Result:', data?.candidates?.[0]?.content?.parts?.[0]?.text || data);
}

main();
