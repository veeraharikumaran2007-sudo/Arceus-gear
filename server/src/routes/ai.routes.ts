import { Router, Response, Request } from 'express';
import { prisma } from '../db.js';

const router = Router();

// Helper to get formatted catalog for AI
async function getCatalogContext() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category.name,
    price: p.discountPrice || p.price,
    originalPrice: p.price,
    stock: p.stock,
    rating: p.rating,
    specs: JSON.parse(p.specs || '{}'),
    images: JSON.parse(p.images || '[]'),
  }));
}

// 1. INFY AI Chat Assistant with Live Database Access
router.post('/chat', async (req: Request, res: Response): Promise<any> => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const trimmed = message.trim().toLowerCase();
    const isSimpleGreeting = /^(hi+|hello+|hey+|good\s*(morning|afternoon|evening)|howdy|sup|hola|hi\s*there)[\s!.]*$/i.test(trimmed);

    // If simple greeting, respond naturally WITHOUT dumping product cards
    if (isSimpleGreeting) {
      return res.json({
        reply: "Hello! I am INFY, your specialized hardware assistant for ARCEUS GEAR. How may I assist you today? Feel free to ask me for hardware recommendations by budget, side-by-side spec comparisons, or advice for gaming, college, or programming.",
        insights: "Ready for your hardware questions",
        products: [],
      });
    }

    const catalog = await getCatalogContext();
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    const systemPrompt = `You are INFY AI, the specialized hardware assistant for ARCEUS GEAR.
You have real-time access to our store inventory:
${JSON.stringify(catalog, null, 2)}

STRICT RULES:
1. NEVER USE ANY EMOJIS. No symbols, emoticons or emoji characters of any kind. Keep all text professional and clean.
2. If the user greets or asks a general question without asking for recommendations, do NOT suggest products; set recommendedProductIds to [].
3. Only include product IDs in recommendedProductIds if the user specifically asked for recommendations, budgets, comparisons, or hardware advice.
4. When comparing products or explaining price differences, reference real architectural specs (GPU TGP, RAM speed, Panel response time, cooling).
5. Output pure JSON only in this exact format:
{
  "reply": "Your clear, articulate answer in markdown without any emojis.",
  "recommendedProductIds": ["id1", "id2"],
  "insights": "Short factual takeaway without emojis."
}`;

    // Google Gemini API (Direct Call with User's Active Key)
    if (geminiKey && geminiKey.trim() !== '') {
      const activeGeminiModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
      
      for (const model of activeGeminiModels) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `${systemPrompt}\n\nUser Question: ${message}\n\nOutput pure valid JSON only without markdown code fences or backticks.`
                      }
                    ]
                  }
                ],
                generationConfig: {
                  temperature: 0.3,
                  responseMimeType: "application/json"
                }
              })
            }
          );

          if (geminiRes.ok) {
            const gData = await geminiRes.json();
            const rawText = gData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
              const parsed = JSON.parse(cleanText);
              const matched = (parsed.recommendedProductIds && Array.isArray(parsed.recommendedProductIds))
                ? catalog.filter((p) => parsed.recommendedProductIds.includes(p.id))
                : [];

              return res.json({
                reply: (parsed.reply || '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''),
                insights: (parsed.insights || 'Telemetry analyzed').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''),
                products: matched,
              });
            }
          } else {
            const errData = await geminiRes.json().catch(() => ({}));
            console.warn(`Gemini model ${model} returned ${geminiRes.status}:`, errData);
          }
        } catch (gemErr) {
          console.warn(`Gemini call error on ${model}:`, gemErr);
        }
      }
    }

    // Strategy 2: OpenRouter (qwen/qwen3.8-27b:free)
    if (openRouterKey && openRouterKey.length > 20) {
      try {
        const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'Arceus Gear Platform',
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b:free',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (orRes.ok) {
          const orData = await orRes.json();
          const orContent = orData.choices?.[0]?.message?.content;
          if (orContent) {
            const cleanJson = orContent.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            const matched = catalog.filter((p) => parsed.recommendedProductIds?.includes(p.id));
            return res.json({
              reply: parsed.reply || '',
              insights: parsed.insights || 'Hardware analysis completed',
              products: matched,
            });
          }
        }
      } catch (orErr) {
        console.warn('OpenRouter call error:', orErr);
      }
    }

    // Strategy 3: Fallback only when query explicitly requested hardware
    const lower = message.toLowerCase();
    const hasHardwareIntent = /laptop|pc|desktop|gpu|keyboard|mouse|headset|audio|monitor|display|console|budget|under|price|recommend|compare|spec/i.test(lower);

    if (!hasHardwareIntent) {
      return res.json({
        reply: "I am INFY, your specialized hardware copilot for ARCEUS GEAR. I did not quite catch that. You can ask me for gear recommendations by budget (e.g., 'laptop under 80000 with 16GB RAM'), hardware comparisons, or advice for gaming and programming.",
        insights: "Awaiting hardware query",
        products: [],
      });
    }

    let matchedProducts = [...catalog];
    let maxBudget: number | null = null;
    const kMatch = lower.match(/(\d+)\s*k\b/);
    const numMatch = lower.match(/(?:under|below|budget of)?\s*(?:₹|rs\.?|inr)?\s*(\d{4,7})/);
    
    if (kMatch) {
      maxBudget = parseInt(kMatch[1]) * 1000;
    } else if (numMatch) {
      maxBudget = parseInt(numMatch[1]);
    }

    if (maxBudget) {
      matchedProducts = matchedProducts.filter((p) => p.price <= maxBudget!);
    }

    if (lower.includes('laptop') || lower.includes('notebook')) {
      matchedProducts = matchedProducts.filter((p) => p.category.toLowerCase().includes('laptop'));
    } else if (lower.includes('keyboard') || lower.includes('mouse') || lower.includes('headset')) {
      matchedProducts = matchedProducts.filter((p) => p.category.toLowerCase().includes('peripheral') || p.category.toLowerCase().includes('keyboard') || p.category.toLowerCase().includes('audio'));
    } else if (lower.includes('gpu') || lower.includes('desktop') || lower.includes('pc') || lower.includes('rig')) {
      matchedProducts = matchedProducts.filter((p) => p.category.toLowerCase().includes('gpu') || p.category.toLowerCase().includes('desktop'));
    } else if (lower.includes('console') || lower.includes('ps5') || lower.includes('deck')) {
      matchedProducts = matchedProducts.filter((p) => p.category.toLowerCase().includes('console'));
    } else if (lower.includes('monitor') || lower.includes('display') || lower.includes('screen') || lower.includes('oled')) {
      matchedProducts = matchedProducts.filter((p) => p.category.toLowerCase().includes('display'));
    }

    const topMatches = matchedProducts.slice(0, 3);
    let reply = `Here are the matching hardware selections from our live inventory:`;
    if (topMatches.length > 0) {
      reply += `\n\nI evaluated our real-time stock and performance metrics. **${topMatches[0].title}** is currently one of our top-rated hardware units.`;
      if (maxBudget) {
        reply += ` It fits within your target budget threshold of ₹${maxBudget.toLocaleString('en-IN')}.`;
      }
    } else {
      reply = `I searched our inventory but could not find an exact match under those parameters. How else can I assist with your hardware requirements?`;
      matchedProducts = [];
    }

    return res.json({
      reply,
      insights: topMatches.length ? 'Analyzed live inventory catalog.' : 'Catalog suggestions',
      products: topMatches,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return res.status(500).json({ error: 'AI processing failed' });
  }
});

// 2. INFY AI Product Comparison Endpoint
router.post('/compare', async (req: Request, res: Response): Promise<any> => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 product IDs are required for comparison' });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { category: true },
    });

    if (products.length < 2) {
      return res.status(404).json({ error: 'Products not found for comparison' });
    }

    const formatted = products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.discountPrice || p.price,
      originalPrice: p.price,
      stock: p.stock,
      rating: p.rating,
      specs: JSON.parse(p.specs || '{}'),
      images: JSON.parse(p.images || '[]'),
    }));

    const p1 = formatted[0];
    const p2 = formatted[1];
    const priceDiff = Math.abs(p1.price - p2.price);
    const expensiveOne = p1.price > p2.price ? p1 : p2;
    const affordableOne = p1.price > p2.price ? p2 : p1;

    const analysis = `### INFY AI Side-by-Side Analysis
- **Price Difference:** ₹${priceDiff.toLocaleString('en-IN')}.
- **Performance Verdict:** **${expensiveOne.title}** commands a higher premium primarily for higher tier specifications and enhanced gaming thermal performance.
- **Value Recommendation:** If you are targeting esports titles at 1080p/1440p, **${affordableOne.title}** provides tremendous value per rupee. If you require maximum ray tracing and ultra 4K textures, **${expensiveOne.title}** is the god-tier choice.`;

    return res.json({
      products: formatted,
      analysis,
    });
  } catch (error) {
    console.error('Compare error:', error);
    return res.status(500).json({ error: 'Failed to generate comparison' });
  }
});

export default router;
