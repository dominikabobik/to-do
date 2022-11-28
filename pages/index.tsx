import { Db, ObjectId } from 'mongodb'
import type { GetServerSideProps, NextPage } from 'next'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineDelete } from 'react-icons/ai'
import TopBar from '../components/top-bar'
// import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/Home.module.css'
import TextareaAutosize from 'react-textarea-autosize';
import React from 'react'
import Link from 'next/link'
import ListItemTop from '../components/title-item'
import clientPromise from '../lib/mongodb'
import TitleItem from '../components/title-item'
import { globalContextType, ListItemTopData, randomId, TitleItemData } from '../types/types'
import { IoAdd } from 'react-icons/io5'


interface MainProps {
  isConnected: boolean;
  items: TitleItemData[];
}

export const globalContext = React.createContext<globalContextType>({} as globalContextType);
export const useGlobalContext = () => useContext(globalContext)

export const Home: NextPage<MainProps> = (props) => {

  console.log("Logging from main: " + props.items)
  const [value, setValue] = useState('')
  const [titlesList, setTitlesList] = useState<ListItemTopData[]>(props.items)

  return (
    <globalContext.Provider value={{ titlesList: titlesList, setTitlesList: setTitlesList }} >
      <div className={styles.container}>
        <TopBar />
        <div className={styles.wrapper}>
          <div className={styles.topWrapper}>
            <input
              placeholder='Title'
              className={styles.newListName}
              onChange={(e) => setValue(e.target.value)}
              value={value} />
            <button className={styles.newListButton}
              onClick={async () => {
                if (value === '') return
                const newId = randomId()
                setTitlesList([{ id: newId, title: value }, ...titlesList])
                setValue('')
                let res = await fetch("http://localhost:3000/api/lists", {
                  method: "POST",
                  body: JSON.stringify({ id: newId, title: value }),
                })
                console.log(res)
              }}>
              <IconContext.Provider value={{ className: "add" }}>
                <IoAdd />
              </IconContext.Provider>
            </button>
          </div>
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {titlesList.map((e, i) =>
                <TitleItem key={i} title={e.title} id={e.id} />)}
            </ul>
          </div>
        </div>
      </div >
    </globalContext.Provider>
  )
}

export async function getServerSideProps(context: any) {
  try {
    let res = await fetch("http://localhost:3000/api/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    let ListItems = await res.json()

    console.log(ListItems)
    return {
      props: {
        isConnected: true,
        items: ListItems.message.map((item: any) => {
          return { id: item.id, title: item.title }
        })
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        isConnected: false,
        items: []
      }
    }
  }
}

export default Home