import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../pages/auth/auth'
import Home from '../pages/home/home'

export default function Router() {
  return (
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  )
}
