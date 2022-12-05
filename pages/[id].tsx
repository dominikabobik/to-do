import type { GetServerSideProps, NextPage } from 'next'
import TopBar from '../components/top-bar'
import ToDoCard from '../components/to-do-card'
import styles from '../styles/Todo.module.css'
import { ParsedUrlQuery } from 'querystring'
import { ListItemProps } from '../types/types'
import { baseUrl } from '.'

export interface ItemPageProps {
  id: string,
  title: string
  data: ListItemProps[]
}

export const getServerSideProps: GetServerSideProps<ItemPageProps> = async (context) => {
  const titleListId: any = context.params?.id
  console.log("Cookie: ", context.req?.headers.cookie)
  console.log("Going to list: ", titleListId)

  // Get list title
  let res = await fetch(`${baseUrl()}api/lists`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.req?.headers.cookie?.split("=")[1]}`
    }
  })

  let items = await res.json()
  console.log("ITEMS: ", items)
  let e = items.message.find((e: { id: ParsedUrlQuery | undefined }) => e.id === titleListId)
  console.log(e)
  // Get all the items in the title list
  let resItem = await fetch(`${baseUrl()}api/item-list`, {
    method: 'POST',
    body: JSON.stringify({ listId: titleListId })
  })

  console.log("List title: ", e.title)
  let data = await resItem.json()
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

