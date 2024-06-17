import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { Register, SignIn } from './pages'

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
            <SignIn/>
          </Layout>}>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
