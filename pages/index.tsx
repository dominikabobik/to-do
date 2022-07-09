import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TopBar from '../components/top-bar'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <TopBar></TopBar>
      <button className={styles.newButton}>New Reminder</button>
      <div className={styles.listContainer}>
        <ul>
          
        </ul>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  let res = await fetch('https//:localhost:3000/api/lists')
  let data = await res.json()
  return {
    props:{
      lists: data['message']
    }
  }
}
