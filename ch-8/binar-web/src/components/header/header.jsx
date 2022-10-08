import React from 'react'
import { Link } from 'react-router-dom'
import style from './header.module.scss'
import logo from '../../assets/logo.svg'
export default function Header() {
  return (
    <header className={style.root}>
      <img src={logo} alt='logo' className={style.logo} />
      <div className={style.divLink}>
        <Link to='/' className={style.link}>
          Home
        </Link>
        <Link className={style.link}>Work</Link>
        <Link className={style.link}>Contact Us</Link>
        <Link className={style.link}>About Me</Link>
        <Link className={style.link}>Q&A</Link>
      </div>
      <div className={style.auth}>
        <Link to='/auth' className={style.link}>
          Sign In
        </Link>
      </div>
    </header>
  )
}
