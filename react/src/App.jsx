import React from 'react'

import { ProductsProvider } from './context/ProductsContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <ProductsProvider>
      <AppRouter />
    </ProductsProvider>
  )
}

export default App
