import Link from 'next/link'
import React from 'react'

const Pagep = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 font-mono font-bold text-xl sm:text-2xl md:text-3xl'>
      <p className='text-center px-4 sm:px-6'>
        Congratulations, you are logged in.Welcome to the Blogging website .
      </p>

      <div className='mt-8 space-y-4'>
        <button className='w-full sm:w-auto bg-purple-600 text-white rounded-lg py-3 px-6 text-center'>
          <Link href="https://dynamicblogweb.vercel.app/">
            Click here to open the website
          </Link>
        </button>
        
        
      </div>
    </div>
  )
}

export default Pagep
