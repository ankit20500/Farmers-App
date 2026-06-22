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
import Product from '../component/Products/AllProducts'
import ProudctDetails from '../component/Products/ProductDetails'
import Cart from '../component/Cart/Cart'
import Checkout from '../component/Checkout/Checkout'
import About from '../component/DetailPage/AboutSection/AboutSection'
import ServiceSection from '../component/DetailPage/ServiceSection/ServiceSection'
import FarmerStories from '../component/DetailPage/Farmers_Review/FarmersReview'
import KnowledgePage from '../component/DetailPage/Knowledge/Knowledge'
import SupportPage from '../component/DetailPage/SupportSection/SupportSection'
import LoanPage from '../component/DetailPage/LoanSection/LoanSection'
import { AddressProvider } from '../component/ContextApi/addressContext'

// Farmer Marketplace Routes
import FarmerMarketplace from '../component/FarmerMarketplace/FarmerMarketplace'
import FarmerProductDetail from '../component/FarmerMarketplace/FarmerProductDetail'
import FarmerProfile from '../component/FarmerMarketplace/FarmerProfile'
import SellCrops from '../component/FarmerMarketplace/SellCrops'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <UserProvider>
        <ProductProvider>
        <CartProvider>
        <ScrollToTop/>
          <AddressProvider>
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
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/about' element={<About/>}/>

                <Route path='/service' element={<ServiceSection/>}/>
                <Route path='/farmers' element={<FarmerStories/>}/>
                <Route path='/knowledge' element={<KnowledgePage/>}/>
                <Route path='/support' element={<SupportPage/>}/>
                <Route path='/loan' element={<LoanPage/>}/>
                
                {/* Farmer Marketplace Routes */}
                <Route path='/farmer-marketplace' element={<FarmerMarketplace/>}/>
                <Route path='/farmer-marketplace/product/:id' element={<FarmerProductDetail/>}/>
                <Route path='/farmer-marketplace/profile/:id' element={<FarmerProfile/>}/>
                <Route path='/farmer-marketplace/sell' element={<SellCrops/>}/>
              </Routes>
            </Layout>
          </AddressProvider>
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
