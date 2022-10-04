import styles from '../styles/Todo.module.css'
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import TextareaAutosize from 'react-textarea-autosize';

export interface Item {
  title: string,
  data: ListItemProps[]
}

interface ListItemProps {
  id: string;
  value: string;
  isChecked: boolean;
  onClick?: () => void;
  onDeleteClick?: () => void;
  onInputChange?: () => void;
}


const ToDoCard = () => {

  const [items, setItems] = useState<ListItemProps[]>([])
  const [listName, setListName] = useState('Title')

  // Function to generate random Ids
  function randomId(): string {
    return Math.random().toString(36).slice(2, 7)
  }

  const onListNameChangeHandler = (event: any) => {
    setListName(event.target.value);
  }

  const ListItem = (props: ListItemProps) => {
    const [value, setValue] = useState(props.value)

    const onValueChangeHandler = (event: any) => {
      setValue(event.target.value);
      // Update global data list
      items.forEach(e => {
        if (e.id === props.id) {
          e.value = event.target.value;
        }
      })
      console.log("setting value")
      setItems(items)
    };

    return (
      <div className={styles.listItem + (props.isChecked ? (" " + styles.isListItemChecked) : "")}>
        <button className={styles.listItemButton} onClick={props.onClick}></button>
        <TextareaAutosize value={value} onChange={onValueChangeHandler}
          className={styles.listItemText + (props.isChecked ? (" " + styles.isListItemTextChecked) : "")}>
        </TextareaAutosize>
        <button className={styles.deleteButton} onClick={props.onDeleteClick}>
          <IconContext.Provider value={{ className: "delete" }}>
            <AiOutlineDelete></AiOutlineDelete>
          </IconContext.Provider>
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.topWrapper}>
          <TextareaAutosize
            value={listName}
            onChange={onListNameChangeHandler}
            className={styles.listName}>
          </TextareaAutosize>
          <button
            className={styles.addButton}
            onClick={() => {
              items.push({
                id: randomId(),
                value: '',
                isChecked: false,
              })
              setItems([...items])
            }}>+
          </button>
        </div>


        <ul className={styles.list}>
          {items.sort((a, b) => {
            const aChecked = a ? 1 : -1
            const bChecked = b ? 1 : -1
            return bChecked - aChecked
          }).map((item, i) =>
            <ListItem
              id={item.id}
              value={item.value}
              isChecked={item.isChecked}
              key={i + item.value}
              onClick={() => {
                for (const i of items) {
                  if (i.id === item.id) {
                    i.isChecked = !i.isChecked
                    setItems([...items])
                    return
                  }
                }
              }} onDeleteClick={() => {
                items.splice(i, 1)
                setItems([...items])
              }} onInputChange={() => {

              }} />
          )}</ul>
      </div>
    </div>
  )
}

export default ToDoCard