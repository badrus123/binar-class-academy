import React from 'react'
import { useParams } from 'react-router-dom'
import style from './game.module.scss'
import gunting from '../../assets/gunting.svg'
import batu from '../../assets/batu.svg'
import kertas from '../../assets/kertas.svg'
import refresh from '../../assets/refresh.svg'
export default function Game() {
  const { id } = useParams()
  return (
    <div className={style.root}>
      <h1>Game Room {id}</h1>
      <div className={style.flex}>
        <div className={style.divPlayer}>
          <h1>Player 1</h1>
          <div className={style.active}>
            <img className={style.img} src={gunting} alt='gunting' />
          </div>
          <div className={style.inActive}>
            <img className={style.img} src={batu} alt='batu' />
          </div>
          <div className={style.inActive}>
            <img className={style.img} src={kertas} alt='kertas' />
          </div>
        </div>
        <div>
          <h1>VS</h1>
        </div>
        <div className={style.divPlayer}>
          <h1>Player 2</h1>
          <div className={style.active}>
            <img className={style.img} src={gunting} alt='gunting' />
          </div>
          <div className={style.inActive}>
            <img className={style.img} src={batu} alt='batu' />
          </div>
          <div className={style.inActive}>
            <img className={style.img} src={kertas} alt='kertas' />
          </div>
        </div>
      </div>
      <img src={refresh} alt='refresh' />
    </div>
  )
}
