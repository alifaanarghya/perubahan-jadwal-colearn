export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZ5aT7kYs-6L4kVVhWxMMEDjYhwv94wxNOatVZXddeJpKhjsxZhZ1H57G6g11BGgxY/exec';
  try {
    const body = req.body;
    const params = new URLSearchParams({
      action: 'submit',
      name: body.name || '',
      phone_number: body.phone_number || '',
      grade: body.grade || '',
      package_name: body.package_name || '',
      jadwal_baru: body.jadwal_baru || '{}',
      jadwal_slots: body.jadwal_slots || '{}',
      alasan: body.alasan || '',
      timestamp: body.timestamp || new Date().toISOString(),
    });
    const url = `${APPS_SCRIPT_URL}?${params.toString()}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
