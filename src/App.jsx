/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
// import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import UserContextProvider from './Context/UserContext'
import CounterContextProvider from './Context/CounterContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Checkout from './components/Checkout/Checkout'
import { ToastContainer } from 'react-toastify'
import Orders from './components/Orders/Orders'
function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute>  <Home /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute>  <Categories />  </ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute>  <Brands />  </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart />  </ProtectedRoute> },
        // { path: 'product', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: 'ProductDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'checkout/:cartId', element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },

        { path: 'login', element:<ProtectedAuth><Login /></ProtectedAuth>  },
        { path: 'register', element: <ProtectedAuth><Register /></ProtectedAuth> },

        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />

        </CounterContextProvider>
      </UserContextProvider>

    </>
  )
}
export default App