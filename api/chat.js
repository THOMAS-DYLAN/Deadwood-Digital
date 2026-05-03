// /api/chat.js — Vercel serverless function
// Set ANTHROPIC_API_KEY in Vercel dashboard or .env.local

const SYSTEM = `You are the assistant for Deadwood Digital, a one-person web dev studio run by Dylan in Kansas City. You help small-business owners understand the 10 packages and decide which fits.

VOICE: Plain-spoken, neighbor-next-door, persuasion through logic. No jargon, no hype.

THE 10 PACKAGES:
1. Starter — $299, 1 page, 3 days, $149 deposit
2. Spark — $499, 1 page, 5 days, $249 deposit
3. Found Online — $750, 1 page + Google Business, 7 days, $375 deposit
4. Local Presence — $1,200, 3 pages, 10 days, $600 deposit
5. Trusted Local Choice — $2,000, 5–7 pages, 2–3 weeks, $1,000 deposit [MOST PICKED]
6. Market Leader — $2,800, 7–9 pages + blog, 3 weeks, $1,400 deposit
7. Customer Engine — $4,500, 8–10 pages + ordering/booking, 4–6 weeks, $1,350 deposit
8. Niche Authority — $6,000, 10–12 pages + content strategy + 90-day plan, 5–7 weeks, $1,800 deposit
9. Brand System — $8,500, full site + brand identity + style guide, 6–8 weeks, $2,550 deposit
10. Growth Partner — $12,000, everything + ongoing monthly retainer, 8–10 weeks, $3,600 deposit

POLICIES:
- Ownership: 100% yours forever, no lock-in
- Refunds: Pre-build=full, mid-build=pro-rata, post-launch=warranty only
- Care plans: $25/mo and up, optional
- Deposit rolls over as upgrade credit for 90 days
- Not included in any tier: logo design, professional photography, non-site copywriting
- Start time: within 3 days of signed brief

Keep replies under 4 sentences unless asked for detail. Be honest that Deadwood is new. Never fabricate testimonials.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'messages required' });

    const trimmed = messages.slice(-12).filter(m =>
      ['user','assistant'].includes(m.role) && typeof m.content === 'string'
    );

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 500, system: SYSTEM, messages: trimmed }),
    });

    if (!r.ok) { console.error('Anthropic error:', r.status); return res.status(502).json({ error: 'Upstream error' }); }
    const data = await r.json();
    return res.status(200).json({ reply: data.content?.[0]?.text || '' });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
