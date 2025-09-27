import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/auth/Login'
import Overview from '../pages/overview'

const Routers = () => {
  return (
    <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<Overview />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

    </Routes>
  )
}

export default Routers