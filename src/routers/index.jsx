import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/auth/Login'
import Overview from '../pages/overview'
import Starships from '../pages/starships'
import Species from '../pages/species'
import People from '../pages/people'
import FilmDetails from '../pages/overview/FilmDetails'
import PeopleDetails from '../pages/people/PeopleDetails'
import SpeciesDetails from '../pages/species/SpeciesDetails'
import StarshipsDetails from '../pages/starships/StarshipsDetails'

const Routers = () => {
  return (
    <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/overview/details" element={<FilmDetails />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/details" element={<StarshipsDetails />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/details" element={<SpeciesDetails />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/details" element={<PeopleDetails />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

    </Routes>
  )
}

export default Routers