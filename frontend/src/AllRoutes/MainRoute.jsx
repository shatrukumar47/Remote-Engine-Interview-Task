import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import DeveloperSignup from '../pages/DeveloperSignup'
import ClientSignup from '../pages/ClientSignup'

const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register-developer' element={<DeveloperSignup />} />
      <Route path='/register-client' element={<ClientSignup />} />
    </Routes>
  )
}

export default MainRoute
