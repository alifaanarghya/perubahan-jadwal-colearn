export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqd60h1UfoLmfFaXx71SZVIoeUQ-B3o7Nfr7-sji9luS7aBW3Pu1mzYxipwjy2ahZg/exec';
  try {
    const body = req.body;
    const params = new URLSearchParams({
      action: 'submit',
      ...body
    });
    const url = `${APPS_SCRIPT_URL}?${params.toString()}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
