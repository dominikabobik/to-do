import styles from '../styles/Todo.module.css'
import { FC, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ItemPageProps } from '../pages/[id]';
import { ListItemData, randomId } from '../types/types';
import { IoAdd } from 'react-icons/io5'
import ListItem from './list-item';

const ToDoCard: FC<ItemPageProps> = (props) => {

  const [items, setItems] = useState<ListItemData[]>(props.data)
  const [listName, setListName] = useState('')

  const listId = props.id

  useEffect(() => {
    const enterHandler = async (event: KeyboardEvent) => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
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
        setListName('')
      }
    };
    document.addEventListener('keydown', enterHandler);
    return () => {
      document.removeEventListener('keydown', enterHandler);
    };
  }, [items, listId, listName]);

  const onListNameChangeHandler = (event: any) => {
    setListName(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
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
            setListName('')
          }}>
          <IoAdd />
        </button>
      </div>
      <div className={styles.listContainer}>
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
              onClick={async () => {
                for (const i of items) {
                  if (i.id === item.id) {
                    i.isChecked = !i.isChecked
                    setItems([...items])
                    // update database
                    const res = await fetch("https://to-do-five-topaz.vercel.app/api/item", {
                      method: 'PUT',
                      body: JSON.stringify({
                        selfId: item.id,
                        isChecked: i.isChecked
                      })
                    })
                    return
                  }
                }
              }}
              onDeleteClick={() => {
                items.splice(i, 1)
                setItems([...items])
              }}
            />
          )}</ul>
      </div>

    </div >
  )
}

export default ToDoCard