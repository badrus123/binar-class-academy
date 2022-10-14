import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './game.module.scss'
import gunting from '../../assets/gunting.svg'
import batu from '../../assets/batu.svg'
import kertas from '../../assets/kertas.svg'
import refresh from '../../assets/refresh.svg'
import axios from 'axios'
import WsClient from '../../utils/websocket'

export default function Game() {
  const { id } = useParams()
  const [data, setData] = useState({})
  let wsClient
  useEffect(() => {
    getData()
    getFromWs()
  }, [])
  const getData = async () => {
    const { data } = await axios.get('http://localhost:3001/room/' + id)
    setData(data.data)
  }
  const getFromWs = () => {
    wsClient = new WsClient('ws://localhost:3001/game-socket/game/' + id)
    wsClient.connect()
    wsClient.on('connected', () => {
      wsClient.on('room', (data) => {
        setData(data)
      })
    })
  }
  return (
    <div className={style.root}>
      <h1>Game Room {data.nama}</h1>
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
