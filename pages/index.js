import React, { useState } from 'react'
import { Page, Card, TextField, Button, Stack } from '@shopify/polaris'

export default function Home(props) {
  const [title, setTitle] = useState('Half loaf (0.5)')
  const [price, setPrice] = useState('1.50')
  const [quantity, setQuantity] = useState('0.5')
  const [message, setMessage] = useState('')

  async function createFractional() {
    setMessage('Creating...')
    const resp = await fetch('/api/create-fractional', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, quantity })
    })
    const data = await resp.json()
    if (resp.ok) setMessage(`Created — product: ${data.product?.admin_graphql_api_id || data.product?.id} — DraftOrder: ${data.draftOrder?.id || 'n/a'}`)
    else setMessage(`Error: ${JSON.stringify(data)}`)
  }

  return (
    <Page title="Fractional product creator">
      <Card sectioned>
        <Stack vertical>
          <TextField label="Product title" value={title} onChange={setTitle} />
          <TextField label="Price" value={price} onChange={setPrice} />
          <TextField label="Fractional quantity" value={quantity} onChange={setQuantity} />
          <Button primary onClick={createFractional}>Create fractional product (test)</Button>
          <div>{message}</div>
        </Stack>
      </Card>
    </Page>
  )
}
