import Footer from '@/components/website/footer/Footer'
import AboutBanner from '@/components/website/navbar/AboutNavbar'
import React from 'react'
import AboutHero from './AboutHero'
import AboutNavbar from '@/components/website/navbar/AboutNavbar'
import Customar from './Customar'
import AboutVideo from './AboutVideo'
import Team from './Team'
import Company from './Company'
import Work from './Work'

const AboutPage = () => {
  return (
    <div>
        <AboutHero></AboutHero>
        <Customar></Customar>
        <AboutVideo></AboutVideo>
        <Team></Team>
        <Company></Company>
        <Work></Work>
    </div>
  )
}

export default AboutPage