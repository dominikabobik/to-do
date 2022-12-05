import type { NextPage, NextPageContext } from 'next'
import { useContext, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import TopBar from '../components/top-bar'
import styles from '../styles/Home.module.css'
import React from 'react'
import TitleItem from '../components/title-item'
import { globalContextType, ListItemTopData, randomId, TitleItemData } from '../types/types'
import { IoAdd } from 'react-icons/io5'
import { getCookie } from 'cookies-next'
import { Router } from 'express'
import { useRouter } from 'next/router'

export function baseUrl(): string {
  if (process.env.NODE_ENV === "production") return "https://to-do-five-topaz.vercel.app/";
  else return "http://localhost:3000/";
}

interface MainProps {
  isConnected: boolean;
  items: TitleItemData[];
}

export const globalContext = React.createContext<globalContextType>({} as globalContextType);
export const useGlobalContext = () => useContext(globalContext)

export const Home: NextPage<MainProps> = (props) => {

  const router = useRouter()
  const [value, setValue] = useState('')
  const [titlesList, setTitlesList] = useState<ListItemTopData[]>(props.items)

  useEffect(() => {
    const enterHandler = async (event: KeyboardEvent) => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
        if (value === '') return
        const newId = randomId()
        setTitlesList([{ id: newId, title: value, }, ...titlesList])
        console.log(getCookie('id')?.toString())
        let res = await fetch(`${baseUrl()}api/lists`, {
          method: "POST",
          body: JSON.stringify({ id: newId, title: value, userId: getCookie('id') }),
        }).then(() => setValue(''))
      }
    };
    document.addEventListener('keydown', enterHandler);
    return () => {
      document.removeEventListener('keydown', enterHandler);
    };
  }, [titlesList, value]);
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
                setTitlesList([{ id: newId, title: value, }, ...titlesList])
                setValue('')
                console.log(getCookie('id')?.toString())
                let res = await fetch(`${baseUrl()}api/lists`, {
                  method: "POST",
                  body: JSON.stringify({ id: newId, title: value, userId: getCookie('id') }),
                })
              }}

            >
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

export async function getServerSideProps(context: NextPageContext) {
  console.log("Context cookies:", context.req?.headers.cookie);
  const cookieId: boolean = context.req?.headers.cookie?.includes('id') ? true : false

  if (!cookieId) {
    console.log("User not logged in... Redirecting...")
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {

    let res = await fetch(`${baseUrl()}api/lists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.req?.headers.cookie?.split("=")[1]}`
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