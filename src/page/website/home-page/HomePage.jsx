import React from 'react'
import HomeBanner from './HomeBanner'
import Category from './Category'
import Product from './Product'
import ClassicProduct from './ClassicProduct'
import NeuralProduct from './NeuralProduct'
import Post from './Post'

const HomePage = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <Category></Category>
      <Product></Product>
      <ClassicProduct></ClassicProduct>
      <NeuralProduct></NeuralProduct>
      <Post></Post>
      
    </div>
  )
}

export default HomePage