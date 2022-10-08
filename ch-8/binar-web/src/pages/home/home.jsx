import React from 'react'
import Hero from '../../components/home/hero'
import style from './home.module.scss'
export default function Home() {
  return (
    <div className={style.root}>
      <Hero />
    </div>
  )
}
