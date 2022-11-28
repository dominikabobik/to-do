import { FC, SetStateAction, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../styles/ListItem.module.css'
import { globalContextType, ListItemProps } from "../types/types";
import { useGlobalContext } from "../pages";

const ListItem: FC<ListItemProps> = (props) => {

  const [value, setValue] = useState(props.value)

  const onValueChangeHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value)
  }

  const global: globalContextType = useGlobalContext()
  const selfId: string = props.id

  const onDeleteClick = async () => {
    console.log("deleting value")
    // Update database
    let res = await fetch("http://localhost:3000/api/item", {
      method: "DELETE",
      body: JSON.stringify({ selfId }),
    })
    console.log(res)
  }
  return (
    <div className={styles.listItem + (props.isChecked ? (" " + styles.isListItemChecked) : "")}>
      <button className={styles.listItemButton}></button>
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