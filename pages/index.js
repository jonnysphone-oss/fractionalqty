import { Page, Card, TextField, Button, Layout } from '@shopify/polaris'

export default function Home(props) {
  // ...state and functions unchanged

  return (
    <Page title="Fractional product creator">
      <Card sectioned>
        <Layout>
          <Layout.Section>
            <TextField label="Product title" value={title} onChange={setTitle} />
          </Layout.Section>
          <Layout.Section>
            <TextField label="Price" value={price} onChange={setPrice} />
          </Layout.Section>
          <Layout.Section>
            <TextField label="Fractional quantity" value={quantity} onChange={setQuantity} />
          </Layout.Section>
          <Layout.Section>
            <Button primary onClick={createFractional}>Create fractional product (test)</Button>
          </Layout.Section>
          <Layout.Section>
            <div>{message}</div>
          </Layout.Section>
        </Layout>
      </Card>
    </Page>
  )
}
Option 2: Use simple <div> with CSS for vertical spacing
jsx
Copy
Edit
import { Page, Card, TextField, Button } from '@shopify/polaris'

export default function Home(props) {
  // ...state and functions unchanged

  return (
    <Page title="Fractional product creator">
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField label="Product title" value={title} onChange={setTitle} />
          <TextField label="Price" value={price} onChange={setPrice} />
          <TextField label="Fractional quantity" value={quantity} onChange={setQuantity} />
          <Button primary onClick={createFractional}>Create fractional product (test)</Button>
          <div>{message}</div>
        </div>
      </Card>
    </Page>
  )
}
