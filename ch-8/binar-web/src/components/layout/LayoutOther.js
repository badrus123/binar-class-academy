import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutOther(params) {
  return (
    <div>
      <Outlet />
    </div>
  )
}
