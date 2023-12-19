import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import DeveloperSignup from '../pages/DeveloperSignup'
import ClientSignup from '../pages/ClientSignup'
import LoginAsDeveloper from '../pages/LoginAsDeveloper'
import LoginAsClient from '../pages/LoginAsClient'
import PrivateRoute from './PrivateRoute'
import ClientProfile from '../pages/ClientProfile'
import DeveloperProfile from '../pages/DeveloperProfile'
import UpdateDeveloperDetails from '../pages/UpdateDeveloperDetails'
import UpdateClientProfile from '../pages/UpdateClientProfile'

const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register-developer' element={<DeveloperSignup />} />
      <Route path='/register-client' element={<ClientSignup />} />
      <Route path='/login-developer' element={<LoginAsDeveloper />} />
      <Route path='/login-client' element={<LoginAsClient />} />
      <Route path='/client-profile' element={<PrivateRoute>
        <ClientProfile />
      </PrivateRoute>} />
      <Route path='/developer-profile' element={<PrivateRoute>
        <DeveloperProfile />
      </PrivateRoute>} />
      <Route path='/developer-profile-update' element={<PrivateRoute>
        <UpdateDeveloperDetails />
      </PrivateRoute>} />
      <Route path='/client-profile-update' element={<PrivateRoute>
        <UpdateClientProfile />
      </PrivateRoute>} />
    </Routes>
    
  )
}

export default MainRoute
