import React from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LayoutOther from '../components/layout/LayoutOther'
import Auth from '../pages/auth/auth'
import Game from '../pages/game/game'
import Home from '../pages/home/home'
import Notfound from '../pages/notfound/Notfound'
import Room from '../pages/room/room'
const Router = (loggedIn) => {
  return [
    {
      path: 'apps',
      element: loggedIn ? <Layout /> : <Navigate to='/auth/login' />,
      children: [
        { path: 'room', element: <Room /> },
        { path: 'game/:id', element: <Game /> },
      ],
    },
    {
      path: '/auth',
      element: !loggedIn ? <LayoutOther /> : <Navigate to='/' />,
      children: [
        { path: 'login', element: <Auth /> },
        { path: '*', element: <Navigate to='/404' /> },
      ],
    },
    {
      path: '/',
      element: <Home />,
    },
    { path: '404', element: <Notfound /> },
    { path: '*', element: <Navigate to='/404' /> },
  ]
}
export default Router
