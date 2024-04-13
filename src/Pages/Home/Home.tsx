import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import SomeRecipes from '../../components/SomeRecipes/SomeRecipes'


const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <SomeRecipes />
    </div>
  )
}

export default Home
