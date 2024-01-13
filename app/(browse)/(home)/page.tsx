import React from 'react'
import { UserButton } from '@clerk/nextjs'
import {Results} from './_components/results'

const Home = () => {
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Results/>
    </div>
  )
}

export default Home