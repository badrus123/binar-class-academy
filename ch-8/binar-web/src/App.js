import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/header/header'
import Router from './routes'
function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/auth' && <Header />}
      <Router />
    </>
  )
}

export default App
