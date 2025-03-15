import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'

import { Outlet } from 'react-router'

function App() {
  
  return (
    <>

    <div id='detail'>
      <Outlet/>
      
    </div>
      
    
      <PWABadge />
    </>
  )
}

export default App
