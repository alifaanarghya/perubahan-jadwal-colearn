export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { token } = req.query;
  if (!token) return res.status(400).json({ status: 'error', message: 'token required' });

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_QAn5zXa3IoH6IcNtdGV6h9s3JUY1sol1MARUL9WzT9JBIk8mHUvodKepwSgBEBXl/exec';
  try {
    const url = `${APPS_SCRIPT_URL}?action=get_token&token=${encodeURIComponent(token)}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
