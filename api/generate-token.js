export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { hp, agent_name } = req.query;
  if (!hp) return res.status(400).json({ status: 'error', message: 'hp required' });

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhyGc6wFCLRxBvvvx8paLOPUI4qfYaqct0Nzp2XGtU3XZBMJgdzCT3agmmqVLU8QXr/exec';
  try {
    const url = `${APPS_SCRIPT_URL}?action=generate_token&hp=${encodeURIComponent(hp)}&agent_name=${encodeURIComponent(agent_name || '')}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
