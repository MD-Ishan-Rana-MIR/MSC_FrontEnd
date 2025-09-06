import Footer from '@/components/website/footer/Footer'
import React from 'react'
import AboutHero from './AboutHero'
import AboutNavbar from '@/components/website/navbar/AboutNavbar'
import Customar from './Customar'
import AboutVideo from './AboutVideo'
import Team from './Team'
import Company from './Company'
import Work from './Work'
import { ImageProvider } from '@/lib/ImageProvider';

const AboutBanner = () => {
  return (
    <section className="max-w-6xl mx-auto  flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12">
      {/* Left Text Section */}
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <p className="text-sm uppercase text-orange-light tracking-wide">
          About Company
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-secondary mb-4">
          About Us
        </h2>
        <p className="text-orange-light mb-6">
          We know how large objects will act, but things on a small scale
        </p>
        <button className="px-6 py-3 bg-orange-primary hover:bg-orange-dark text-white rounded-md shadow-md transition duration-200">
          Get Quote Now
        </button>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 flex justify-center relative">
        {/* Background Circle */}
        <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-pink-100 rounded-full -z-10"></div>
        <img
          src={ImageProvider.about2}
          alt="Shopping girl"
          className="w-full max-w-xs md:max-w-md relative"
        />
      </div>
    </section>
  )
}

const AboutPage = () => {
  return (
    <div>
      <AboutBanner />
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