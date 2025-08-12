import { getAccessToken, shopifyRequest } from '../../lib/shopify.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const body = req.body || {}
  const shop = req.headers['x-shopify-shop-domain'] || process.env.SHOP
  if (!shop) return res.status(400).json({ error: 'missing shop header or SHOP env' })
  const token = await getAccessToken(shop)
  if (!token) return res.status(400).json({ error: 'app not installed for this shop yet' })

  const productPayload = { product: { title: body.title || `Fractional: \${Date.now()}`, body_html: '<strong>Fractional</strong>', variants: [ { price: body.price || '1.00', sku: 'FRACT-' + Date.now() } ] } }
  const created = await shopifyRequest(shop, token, 'products.json', 'POST', productPayload)
  const productId = created?.product?.id
  const variantId = created?.product?.variants?.[0]?.id
  if (!productId || !variantId) return res.status(500).json({ error: 'failed to create product', detail: created })

  const draftOrder = { draft_order: { line_items: [ { title: body.title || 'Fractional item', price: body.price || '1.00', quantity: 1, properties: [ { name: 'fraction_quantity', value: body.quantity || 0.5 } ] } ], use_customer_default_address: true } }
  const draft = await shopifyRequest(shop, token, 'draft_orders.json', 'POST', draftOrder)

  return res.json({ product: created.product, draftOrder: draft.draft_order })
}
