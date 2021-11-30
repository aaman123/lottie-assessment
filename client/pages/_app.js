import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { LottieDataProvider } from '../context/useLottieContext';

function MyApp({ Component, pageProps }) {
  return (
    <LottieDataProvider>
      <Component {...pageProps} />
    </LottieDataProvider>
  )
}

export default MyApp
