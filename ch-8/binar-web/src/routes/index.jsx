import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../pages/auth/auth'
import Game from '../pages/game/game'
import Home from '../pages/home/home'
import Room from '../pages/room/room'

export default function Router() {
  return (
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/room' element={<Room />} />
      <Route path='/game/:id' element={<Game />} />
    </Routes>
  )
}
