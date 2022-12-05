import { Router } from 'express'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, ChangeEventHandler, SetStateAction, useCallback, useState } from 'react'
import styles from "../styles/Signup.module.css"

interface User {
  name: string,
  email: string,
  password: string
}

const Signup: NextPage = () => {

  const router = useRouter()
  const [error, SetError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onNameChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }, [setName])

  const onEmailChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }, [setEmail])

  const onPasswordChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }, [setPassword])

  async function onSignupClickHandler(object: User) {
    console.log("click handler")
    let res = await fetch('http://localhost:3000/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object)
    }).then(val => { return val.json() })
      .then(val => {
        if (!val.success) {
          console.log(val.message)
          SetError(val.message.substr(val.message.indexOf(" ") + 1))
        }
        else {
          router.push('/')
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div>{error}</div>
        <input className={styles.name} placeholder='First name' value={name} onChange={onNameChangeHandler}></input>
        <input className={styles.email} placeholder='Email' value={email} onChange={onEmailChangeHandler}></input>
        <input className={styles.password} placeholder='New password' value={password} onChange={onPasswordChangeHandler}></input>
        <button className={styles.button} onClick={async () => {
          onSignupClickHandler({ name, email, password })
        }}>Sign Up!</button>
        <a href={'/login'} style={{ textDecoration: 'underline' }}>Or login</a>
      </div>
    </div>
  )
}

export default Signup;