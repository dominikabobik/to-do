import { ChangeEvent, FC, SetStateAction, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../styles/ListItem.module.css'
import { globalContextType, ListItemProps } from "../types/types";
import { baseUrl, useGlobalContext } from "../pages";
import e from "express";

const ListItem: FC<ListItemProps> = (props) => {

  const [value, setValue] = useState(props.value)

  const onValueChangeHandler = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setValue(event.target.value)
    const res = await fetch(`${baseUrl()}api/item`, {
      method: 'PUT',
      body: JSON.stringify({
        selfId: props.id,
        value: event.target.value,
        isChecked: props.isChecked
      })
    })
  }

  const global: globalContextType = useGlobalContext()
  const selfId: string = props.id

  const onDeleteClick = async () => {
    props.onDeleteClick()
    // Update database
    let res = await fetch(`${baseUrl()}api/item`, {
      method: "DELETE",
      body: JSON.stringify({ selfId }),
    })
    console.log(res)
  }

  return (
    <div className={styles.container + (props.isChecked ? (" " + styles.isListItemChecked) : "")}>
      <button className={styles.listItemButton} onClick={props.onClick}></button>
      <TextareaAutosize value={value} onChange={onValueChangeHandler}
        className={styles.listItemText + (props.isChecked ? (" " + styles.isListItemTextChecked) : "")}>
      </TextareaAutosize>
      <button className={styles.deleteButton} onClick={onDeleteClick}>
        <IconContext.Provider value={{ className: "delete" }}>
          <AiOutlineDelete></AiOutlineDelete>
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default ListItem