import React from 'react'
import Layout from './ui/Layout'

const RaffleComponent = () => {
  return (
    <Layout>
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Raffle Time</h1>
            <p className='text-gray-600'>This is the Raffle page</p>
        </div>
    </Layout>
  )
}

export default RaffleComponent