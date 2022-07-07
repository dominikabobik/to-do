import type { NextPage } from 'next'
import styles from '../styles/Todo.module.css'
import { Checkbox } from '@nextui-org/react';

export interface Item {
  title: string,
  data: string[]
}

const data1: string[] = [
  'one',
  'two',
  'threesdkhj,msdbfkbskdjfbkdsbfksdbfkjsbdkjfbskjbfkjsdbkfjdbfbksdfbkjdsbkfjbsdbfsdkfbksjbkfbdskjD',
  'sbfjhbs djfbjsdb fkjbsdkfjb skj fbkdjsbfkjsbkjdb fksbd dmfsdfbskjfksdkfbs dkb  f ksdbfkjbd',
  'sdf',
  'DaDom',
  'hiiiii'
];

const x: Item = {title: 'Hello', data: data1}
 
const ToDoCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.listName}>{x.title}</p>
        <ul className={styles.list}>{x.data.map((item: string, i) =>
            <Checkbox disableAnimation={true}
              defaultSelected={true}
              lineThrough={true}
              isRounded={true}
              className={styles.listItem} key={i}>
              <span className={styles.listItemText}>{`${item}`}</span>
            </Checkbox>
           )}</ul>
      </div>
    </div>
  )
}

export default ToDoCard