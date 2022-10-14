import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './room.module.scss'
import WsClient from '../../utils/websocket'

export default function Room() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  let wsClient
  useEffect(() => {
    getFromWs()
  }, [])

  const getFromWs = () => {
    wsClient = new WsClient('ws://localhost:3001/game-socket/room')
    wsClient.connect()
    wsClient.on('connected', () => {
      wsClient.on('room', (data) => {
        setData(data)
      })
    })
  }
  const handleRoom = (id) => {
    navigate('/apps/game/' + id)
  }

  return (
    <div className={style.root}>
      <h1>Select Room before Join Game</h1>
      <table className={style.table}>
        <thead>
          <th className={style.thead}>Id</th>
          <th className={style.thead}>Name</th>
          <th className={style.thead}>Player</th>
          <th className={style.thead}>Actions</th>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index} className={style.trbody}>
                <th className={style.tbody}>{index + 1}</th>
                <th className={style.tbody}>{item?.nama}</th>
                <th className={style.tbody}>2/2</th>
                <th className={style.tbody}>
                  <button
                    className={style.button}
                    onClick={() => handleRoom(item.id)}>
                    Join
                  </button>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
