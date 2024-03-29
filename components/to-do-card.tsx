import styles from '../styles/Todo.module.css'
import { FC, useCallback, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ItemPageProps } from '../pages/[id]';
import { ListItemData, randomId } from '../types/types';
import { IoAdd } from 'react-icons/io5'
import ListItem from './list-item';
import { baseUrl } from '../pages';

const ToDoCard: FC<ItemPageProps> = (props) => {

  const [items, setItems] = useState<ListItemData[]>(props.data)
  const [listName, setListName] = useState('')

  const listId = props.id

  const handleItemAdd = useCallback(async () => {
    const newId = randomId()
    items.push({
      id: newId,
      listId: listId,
      value: listName,
      isChecked: false,
    })
    setItems([...items])
    const res = await fetch(`${baseUrl()}api/item`, {
      method: "POST",
      body: JSON.stringify({
        id: newId,
        listId: listId,
        value: listName,
        isChecked: false,
      })
    }).then(() => setListName(''))
  }, [items, listId, listName])

  useEffect(() => {
    const enterHandler = async (event: KeyboardEvent) => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        handleItemAdd()
      }
    };
    document.addEventListener('keydown', enterHandler);
    return () => {
      document.removeEventListener('keydown', enterHandler);
    };
  }, [handleItemAdd, items, listId, listName]);

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
          placeholder='New Item'
        />
        <button
          className={styles.addButton}
          onClick={handleItemAdd}>
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
                    const res = await fetch(`${baseUrl()}api/item`, {
                      method: 'PUT',
                      body: JSON.stringify({
                        selfId: item.id,
                        isChecked: i.isChecked,
                        value: i.value
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