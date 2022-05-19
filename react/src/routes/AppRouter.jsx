import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        {/* <Route element={<NotFound />} path="*" /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
