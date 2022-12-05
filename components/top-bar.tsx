/* eslint-disable @next/next/no-html-link-for-pages */
import type { NextPage } from 'next'
import styles from '../styles/TopBar.module.css'
import { IconContext } from 'react-icons'
import { IoIosArrowBack, IoIosMore } from 'react-icons/io'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi';
import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'

const TopBar: FC = () => {

  const router = useRouter()
  const handleLogout = useCallback(() => {
    deleteCookie('id')
    router.push('/login')
  }, [router])

  return (
    <div className={styles.container}>
      <a href='/'>
        <IconContext.Provider value={{ className: "backArrow" }}>
          <IoIosArrowBack></IoIosArrowBack>
        </IconContext.Provider>
      </a>
      <IconContext.Provider value={{ className: "menu" }}>
        <FiLogOut onClick={handleLogout}></FiLogOut>
      </IconContext.Provider>
    </div>
  )
}

export default TopBar