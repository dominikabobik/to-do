import type { NextPage } from 'next'
import styles from "../styles/Signup.module.css"

const Signup: NextPage = () => {
  return (
     <div className={styles.wrapper}>
      <div className={styles.content}>
        <input className={styles.name} placeholder='First name'></input>
        <input className={styles.email} placeholder='Email'></input>
        <input className={styles.password} placeholder='New password'></input>
        <button className={styles.button}>Sign Up!</button>
      </div>
    </div>
    )
}

export default Signup;