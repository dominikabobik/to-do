import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { title } from 'process'
import { useEffect, useState } from 'react'
import TopBar from '../components/top-bar'
import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/Home.module.css'

interface Props {
  items: {
    id: string,
    title: string
  }[];
}

export const Home: NextPage<Props> = ({ items: initialItems }) => {
  const [value, setValue] = useState('')
  const [items, setItems] = useState(initialItems);

  const addFieldToList = () => {
    setItems([{ id: 'something', title: value }, ...items])
  }

  return (
    <div className={styles.container}>
      <TopBar></TopBar>
      <input placeholder='enter name'
        onChange={(e) => setValue(e.target.value)}
        value={value}></input>
      <button className={styles.newButton} onClick={addFieldToList}>New Reminder</button>
      <div className={styles.listContainer}>
        <ul>{items.map(item =>
          <div key={item.id}>{item.title}</div>
        )}</ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let { db } = await connectToDatabase();
  let lists = await db
    .collection('lists')
    .find({})
    .toArray();

  return {
    props: {
      items: lists.map(item => {
        return { id: item._id.toHexString(), title: item.name }
      })
    },
  }
}

export default Home