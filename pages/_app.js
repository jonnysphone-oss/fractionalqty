import App from 'next/app'
import { Provider } from '@shopify/app-bridge-react'
import { AppProvider as PolarisProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

function MyApp({ Component, pageProps }) {
  const config = pageProps.shopifyAppConfig || {}
  return (
    <PolarisProvider>
      <AppBridgeProvider config={config}>
        <Component {...pageProps} />
      </AppBridgeProvider>
    </PolarisProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default MyApp
