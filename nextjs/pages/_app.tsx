import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'kratos-verify-session/dist/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
