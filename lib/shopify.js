import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

let inMemory = {}
let kv
try { kv = require('@vercel/kv') } catch (e) { kv = null }

export async function saveAccessToken(shop, token) {
  if (kv) await kv.set(`token:${shop}`, token)
  else inMemory[shop] = token
}

export async function getAccessToken(shop) {
  if (kv) return await kv.get(`token:${shop}`)
  return inMemory[shop]
}

export async function shopifyRequest(shop, accessToken, path, method = 'GET', body) {
  const url = `https://${shop}/admin/api/2024-10/${path}`
  const opts = { method, headers: { 'X-Shopify-Access-Token': accessToken, 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(url, opts)
  const text = await res.text()
  try { return JSON.parse(text) } catch (e) { return text }
}

export default { saveAccessToken, getAccessToken, shopifyRequest }
