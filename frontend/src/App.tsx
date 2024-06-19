import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { AddHotel, MyHotels, Register, SignIn } from './pages'
import { useAppContext } from '../contexts/AppContext'

function App() {
  const {isLoggedIn} = useAppContext();
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
        {isLoggedIn &&
          <> 
            <Route path="/add-hotel" element={
              <Layout>
                <AddHotel/>
              </Layout>}>
            </Route>
            <Route path="/my-hotels" element={
              <Layout>
                <MyHotels/>
              </Layout>}>
            </Route>
          </>
        }
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
