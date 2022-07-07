import type { NextPage } from 'next'
import styles from "../styles/Login.module.css"

const Login: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <input className={styles.email} placeholder='Email'></input>
        <input className={styles.password} placeholder='Password'></input>
        <button className={styles.button}>Sign In</button>
      </div>
    </div>
    )
}

export default Login