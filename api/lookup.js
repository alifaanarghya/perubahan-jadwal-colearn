export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ status: 'error', message: 'id required' });

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynpgrowPeYTUsxiMJ5QU_6aoxpqPH5FfNPlOucRlEfk0JvCuHptt7EY0uCcSFHBEx2/exec';
  try {
    const url = `${APPS_SCRIPT_URL}?action=lookup&id=${encodeURIComponent(id)}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
