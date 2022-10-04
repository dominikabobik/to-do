/* eslint-disable @next/next/no-html-link-for-pages */
import type { NextPage } from 'next'
import styles from '../styles/TopBar.module.css'
import { IconContext } from 'react-icons'
import { IoIosArrowBack, IoIosMore } from 'react-icons/io'
import Link from 'next/link'

const TopBar: NextPage = () => {
  return (
    <div className={styles.container}>
      <a href='/'>
        <IconContext.Provider value={{ className: "backArrow" }}>
          <IoIosArrowBack></IoIosArrowBack>
        </IconContext.Provider>
      </a>
      <IconContext.Provider value={{ className: "menu" }}>
        <IoIosMore></IoIosMore>
      </IconContext.Provider>

    </div>
  )
}

export default TopBar