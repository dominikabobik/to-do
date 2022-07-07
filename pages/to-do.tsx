import type { NextPage } from 'next'
import TopBar from '../components/top-bar'
import ToDoCard from '../components/to-do-card'
import styles from '../styles/Todo.module.css'

const Todo: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <TopBar></TopBar>
      <ToDoCard></ToDoCard>
    </div>
    )
}

export default Todo