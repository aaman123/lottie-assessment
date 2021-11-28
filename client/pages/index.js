import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Landing from './Landing/Landing';
import dynamic from 'next/dynamic'

export default function Home() {
  
  const DynamicComponentWithNoSSR = dynamic(
    () => import('./Dashboard/Dashboard'),
    { ssr: false }
  )
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  
  return (
    <div>
      <Head>
        <title>Lottie 101</title>
        <meta name="description" content="Upload and View your lotties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
      user !== null ? 
      <DynamicComponentWithNoSSR username={user} />
      : 
      <Landing />
    }
    </div>
  )
}
