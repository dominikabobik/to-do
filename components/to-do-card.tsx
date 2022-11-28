import styles from '../styles/Todo.module.css'
import { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ListItem from './list-item';
import { GetServerSideProps } from 'next';
import ListItemTop from './title-item';
import { ItemPageProps } from '../pages/[id]';
import { ListItemProps, randomId } from '../types/types';
import { IoAdd } from 'react-icons/io5'

const ToDoCard: FC<ItemPageProps> = (props) => {

  console.log("From ToDo: ", props.data)
  const [items, setItems] = useState<ListItemProps[]>(props.data)
  const [listName, setListName] = useState('')

  const listId = props.id

  const onListNameChangeHandler = (event: any) => {
    setListName(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.topWrapper}>
          <input
            value={listName}
            onChange={onListNameChangeHandler}
            className={styles.listName}
          />
          <button
            className={styles.addButton}
            onClick={async () => {
              const newId = randomId()
              items.push({
                id: newId,
                listId: listId,
                value: listName,
                isChecked: false,
              })
              setItems([...items])
              const res = await fetch("http://localhost:3000/api/item", {
                method: "POST",
                body: JSON.stringify({
                  id: newId,
                  listId: listId,
                  value: listName,
                  isChecked: false,
                })
              })
            }}>
            <IoAdd />
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
              listId={listId}
            // onClick={() => {
            //   for (const i of items) {
            //     if (i.id === item.id) {
            //       i.isChecked = !i.isChecked
            //       setItems([...items])
            //       return
            //     }
            //   }
            // }} onDeleteClick={() => {
            //   items.splice(i, 1)
            //   setItems([...items])
            // }} onInputChange={() => {

            // }} 
            />
          )}</ul>
      </div>
    </div >
  )
}

export default ToDoCard