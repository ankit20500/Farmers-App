import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import './App.css'
import Layout from './Layout'
import Signup from '../component/Auth/Signup/Signup'
import Login from '../component/Auth/Login/Login'
import ChooseCategory from '../component/Choose_Category/ChooseCategory'
import ScrollToTop from './ScrollToTop'
import Profile from '../component/Profile/Profile'
import { UserProvider } from '../component/ContextApi/userContextApi'
import { ProductProvider } from '../component/ContextApi/productContext'
import { CartProvider } from '../component/ContextApi/cartContext'
import { ToastContainer, Bounce } from 'react-toastify';
import ChangePassword from '../component/Auth/ChangePassword/HandlePassword'
import Product from '../component/Products/Products'
import ProudctDetails from '../component/Products/ProductDetails'
import Cart from '../component/Cart/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
        <ProductProvider>
        <CartProvider>
        <ScrollToTop/>
          <Layout>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/auth/register' element={<Signup/>}/>
              <Route path='/auth/login' element={<Login/>}/>
              <Route path='/auth/user/profile' element={<Profile/>}/>
              <Route path='/auth/user/change-password' element={<ChangePassword/>}/>
              <Route path='/categories/:name' element={<ChooseCategory/>}/>
              <Route path='/categories/:category/subCategory/:subCategory' element={<Product/>}/>
              <Route path='/product/:id' element={<ProudctDetails/>}/>
              <Route path='/user/cart' element={<Cart/>}/>
            </Routes>
          </Layout>
          </CartProvider>
          </ProductProvider>
          </UserProvider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />
    </>
  )
}

export default App
