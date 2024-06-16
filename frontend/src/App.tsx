import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>Home Page</p>
          </Layout>}></Route>
      </Routes>
    </Router>
  )
}

export default App
