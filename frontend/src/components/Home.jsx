import React from 'react'
import Navbar from './Navbar'
import HeroSection from './Hero'
import FeaturesSection from './FeaturesSection'
import Footer from './Footer'
const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default Home