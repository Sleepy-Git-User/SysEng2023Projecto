import { useState } from 'react'
import './App.css'

import StaticDataContextProvider from './Contexts/StaticDataContext'
import {ProductList} from './Widgets/widgets'

function App() {

  return (
    <StaticDataContextProvider>
      <div className="app">
        <ProductList></ProductList>
      </div>
    </StaticDataContextProvider>
  )
}

export default App
