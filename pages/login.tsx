import { setCookie } from 'cookies-next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { baseUrl } from '.'
import styles from "../styles/Login.module.css"

interface User {
  name: string,
  password: string
}

const Login: NextPage = () => {

  const router = useRouter()
  const [error, SetError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onNameChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }, [setName])

  const onPasswordChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }, [setPassword])

  const onLoginHandler = useCallback(async (object: User) => {
    console.log(object)
    await (fetch(`${baseUrl()}api/signin`, {
      method: 'POST',
      body: JSON.stringify(object)
    })).then(val => {
      return val.json()
    }).then(val => {
      if (!val.success) {
        console.log(val.message)
        SetError(val.message.substr(val.message.indexOf(" ") + 1))
      }
      else {
        router.push('/')
      }
    })
  }, [router])

  useEffect(() => {
    const enterHandler = async (event: KeyboardEvent) => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
        onLoginHandler({ name, password })
      }
    };
    document.addEventListener('keydown', enterHandler);
    return () => {
      document.removeEventListener('keydown', enterHandler);
    };
  }, [name, onLoginHandler, password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        ToDo
      </div>
      <div className={styles.content}>
        <div>{error}</div>
        <input className={styles.name} placeholder='Name' onChange={onNameChangeHandler} value={name}></input>
        <input className={styles.password} placeholder='Password' onChange={onPasswordChangeHandler} value={password}></input>
        <button className={styles.button} onClick={() => onLoginHandler({ name, password })}>Login</button>
        <a href={'/sign-up'} style={{ textDecoration: 'underline', color: '#464655' }}>Or signup</a>
      </div>
    </div>
  )
}

export default Login