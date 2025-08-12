import querystring from 'querystring'

export default function handler(req, res) {
  const shop = req.query.shop || process.env.SHOP
  if (!shop) return res.status(400).send('Missing ?shop=your-shop.myshopify.com or set SHOP env')
  const state = Math.random().toString(36).substring(2)
  const scope = process.env.SCOPES || 'write_products,write_orders'
  const redirect = `${process.env.HOST}/api/callback`
  const installUrl = `https://${shop}/admin/oauth/authorize?${querystring.stringify({ client_id: process.env.SHOPIFY_API_KEY, scope, state, redirect_uri: redirect })}`
  res.redirect(installUrl)
}
