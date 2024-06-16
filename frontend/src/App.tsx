import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { Register } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>Home Page</p>
          </Layout>}>
        </Route>
        <Route path="/register" element={
          <Layout>
            <Register/>
          </Layout>}>
        </Route>
        <Route path="/sign-in" element={
          <Layout>
            <p>login</p>
          </Layout>}>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
