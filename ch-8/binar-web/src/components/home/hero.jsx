import React from 'react'
import style from './home.module.scss'
export default function Hero() {
  const handleSubmit = () => {
    window.location.href = 'https://www.google.com'
  }
  return (
    <div className={style.hero}>
      <h1 className={style.textHero}>Play Traditional Game</h1>
      <h3 className={style.describeHero}>
        Experience new traditional game play
      </h3>
      <div className={style.button} onClick={() => handleSubmit()}>
        Trial
      </div>
    </div>
  )
}
