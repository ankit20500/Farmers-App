import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainFooter from '../component/Home/Footer/MainFooter'
import Home from '../component/Home/Home'
import Navbar from '../component/Home/Navbar/Navbar'
import './App.css'
import Layout from './Layout'
import Signup from '../component/Auth/Signup/Signup'
import Login from '../component/Auth/Login/Login'
import ChooseCategory from '../component/Choose_Category/ChooseCategory'
import ScrollToTop from './ScrollToTop'
import Profile from '../component/Profile/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth/register' element={<Signup/>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/users/profile' element={<Profile/>}/>
            <Route path='/:name/categories' element={<ChooseCategory/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
