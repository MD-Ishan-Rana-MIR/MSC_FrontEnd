
import { Outlet } from 'react-router-dom'
import StickyNavbar from '../components/website/navbar/StickyNavbar'
import Navbar from '../components/website/navbar/Navbar'
import Footer from '../components/website/footer/Footer'
import React from 'react'

const MainLayout = () => {
  return (
    <div>
        <StickyNavbar></StickyNavbar>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
// 
export default MainLayout