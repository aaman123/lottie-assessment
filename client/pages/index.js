import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from './Dashboard/Dashboard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lottie 101</title>
        <meta name="description" content="Upload and View your lotties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}
