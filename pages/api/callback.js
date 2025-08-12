import fetch from 'node-fetch'
import { saveAccessToken } from '../../lib/shopify.js'

export default async function handler(req, res) {
  const { code, shop } = req.query
  if (!code || !shop) return res.status(400).send('Missing code or shop')
  const tokenUrl = `https://${shop}/admin/oauth/access_token`
  const resp = await fetch(tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: process.env.SHOPIFY_API_KEY, client_secret: process.env.SHOPIFY_API_SECRET, code }) })
  const data = await resp.json()
  const accessToken = data.access_token
  if (!accessToken) return res.status(500).json({ error: 'no access token', detail: data })
  await saveAccessToken(shop, accessToken)
  res.send(\`App installed for \${shop}. You can now open the app via Shopify admin and use the embedded UI.\`)
}
