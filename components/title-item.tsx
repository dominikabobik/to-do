import { FC, useState } from "react"
import { IconContext } from "react-icons"
import { AiOutlineDelete } from "react-icons/ai"
import styles from '../styles/TitleItem.module.css'
import { useGlobalContext } from '../pages/index'
import Link from "next/link"
import { globalContextType, TitleItemData } from "../types/types"

const TitleItem: FC<TitleItemData> = props => {

  const global: globalContextType = useGlobalContext()
  const selfId: string = props.id

  const onDeleteClick = async () => {
    // Update global data list
    global.titlesList.forEach((e, i) => {
      if (e.id === selfId) {
        global.titlesList.splice(i, 1)
      }
    })
    console.log("deleting value")
    global.setTitlesList([...global.titlesList])
    // Update database
    let res = await fetch("http://localhost:3000/api/lists", {
      method: "DELETE",
      body: JSON.stringify({ selfId }),
    })
    console.log(res)
  }

  return (
    <div className={styles.container}>
      <Link href={`/${props.id}`} >
        <div className={styles.listItemText}>{props.title}</div>
      </Link>
      <button className={styles.deleteButton} onClick={onDeleteClick}>
        <IconContext.Provider value={{ className: "delete" }}>
          <AiOutlineDelete></AiOutlineDelete>
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default TitleItem