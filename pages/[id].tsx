import type { GetServerSideProps, NextPage } from 'next'
import TopBar from '../components/top-bar'
import ToDoCard from '../components/to-do-card'
import styles from '../styles/Todo.module.css'
import { ParsedUrlQuery } from 'querystring'
import { ListItemProps } from '../types/types'

export interface ItemPageProps {
  id: string,
  title: string
  data: ListItemProps[]
}

export const getServerSideProps: GetServerSideProps<ItemPageProps> = async (context) => {
  const titleListId: any = context.params?.id
  console.log("Going to list: ", titleListId)
  // Get list title
  let res = await fetch('https://to-do-five-topaz.vercel.app/api/lists', {
    method: 'GET'
  })
  let items = await res.json()
  let e = items.message.find((e: { id: ParsedUrlQuery | undefined }) => e.id === titleListId)

  // Get all the items in the title list
  let resItem = await fetch('https://to-do-five-topaz.vercel.app/api/item', {
    method: 'GET'
  })

  console.log("List title: ", e.title)
  let data = await resItem.json()
  console.log("data:\n", data)
  let i: any[] = [];
  if (data.message.length !== 0) {
    i = data.message.filter((e: any) => e.listId === titleListId)
  }

  console.log("i:\n", i)
  return {
    props: {
      id: e.id,
      title: e.title,
      data: i
    }
  }
}

const ItemPage: NextPage<ItemPageProps> = (props) => {
  console.log({ props })
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      height: '100vh'
    }}>
      <TopBar />
      <ToDoCard {...props} />
    </div>
  )
}
export default ItemPage

