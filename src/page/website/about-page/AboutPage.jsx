import Footer from '@/components/website/footer/Footer'
import AboutBanner from '@/components/website/navbar/AboutNavbar'
import React from 'react'
import AboutHero from './AboutHero'
import AboutNavbar from '@/components/website/navbar/AboutNavbar'
import Customar from './Customar'
import AboutVideo from './AboutVideo'
import Team from './Team'

const AboutPage = () => {
  return (
    <div>
        <AboutNavbar></AboutNavbar>
        <AboutHero></AboutHero>
        <Customar></Customar>
        <AboutVideo></AboutVideo>
        <Team></Team>
        <Footer></Footer>
    </div>
  )
}

export default AboutPage