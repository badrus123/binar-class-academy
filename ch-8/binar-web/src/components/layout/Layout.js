import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout(params) {
  return (
    <div>
      <Outlet />
    </div>
  )
}
