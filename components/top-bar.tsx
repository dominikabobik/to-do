import type { NextPage } from 'next'
import styles from '../styles/TopBar.module.css'
import { IconContext } from 'react-icons'
import { IoIosArrowBack, IoIosMore } from 'react-icons/io'
 
const TopBar: NextPage = () => {
  return (
    <div className={styles.container}>
      <IconContext.Provider value={{ className: "backArrow" }}>
        <IoIosArrowBack></IoIosArrowBack>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "menu" }}>
        <IoIosMore></IoIosMore>
      </IconContext.Provider>
      
    </div>
  )
}

export default TopBar