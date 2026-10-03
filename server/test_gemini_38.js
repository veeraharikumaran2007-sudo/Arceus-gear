import dotenv from 'dotenv';
dotenv.config();
const key = process.env.GEMINI_API_KEY || '';

async function testModel(modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
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
  console.log(`[${modelName}] Status:`, res.status);
  if (res.ok) {
    console.log(`[${modelName}] Reply:`, data?.candidates?.[0]?.content?.parts?.[0]?.text);
  } else {
    console.log(`[${modelName}] Error:`, data?.error?.message);
  }
}

async function run() {
  await testModel('gemini-3.8-flash');
  await testModel('gemini-3.5-flash-lite');
  await testModel('gemini-3.5-flash');
}
run();
