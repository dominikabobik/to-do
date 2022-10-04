import { Db } from 'mongodb'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineDelete } from 'react-icons/ai'
import TopBar from '../components/top-bar'
import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/Home.module.css'
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  items: {
    id: string,
    title: string
  }[];
}

interface ListItem {
  id: string,
  title: string
}

export const Home: NextPage = () => {


  const [value, setValue] = useState('')
  const [lists, setLists] = useState<ListItem[]>([])

  // Function to generate random Ids
  function randomId(): string {
    return Math.random().toString(36).slice(2, 7)
  }

  const ListItem = (props: ListItem) => {
    const [name, setName] = useState(props.title)

    const onDeleteClick = () => {
      // Update global data list
      lists.forEach((e, i) => {
        if (e.id === props.id) {
          lists.splice(i, 1)
        }
      })
      console.log("deleting value")
      setLists([...lists])
    }

    return (
      <div className={styles.listItem} >
        <div className={styles.listItemText}>{name}</div>
        <button className={styles.deleteButton} onClick={onDeleteClick}>
          <IconContext.Provider value={{ className: "delete" }}>
            <AiOutlineDelete></AiOutlineDelete>
          </IconContext.Provider>
        </button>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <input placeholder='Title'
            className={styles.newListName}
            onChange={(e) => setValue(e.target.value)}
            value={value}></input>
          <button className={styles.newListButton}
            onClick={() => {
              if (value === '') return
              setLists([{ id: randomId(), title: value }, ...lists])
              setValue('')
            }}>+</button>
        </div>
        <div className={styles.listContainer}>
          <ul className={styles.list}>{lists.map((e, i) =>
            <ListItem key={i} title={e.title} id={e.id}></ListItem>
          )}</ul>
        </div>
      </div>

    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   let { db } = await connectToDatabase();
//   let lists = await db
//     .collection('lists')
//     .find({})
//     .toArray();

//   return {
//     props: {
//       items: lists.map(item => {
//         return { id: item._id.toHexString(), title: item.name }
//       })
//     },
//   }
// }

export default Home