import Link from 'next/link'
import React from 'react'

const Pagep = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 font-mono font-bold text-3xl'><p>Congratulations you are logged in </p>
    <button className='bg-purple-600 rounded-lg mt-16'> <Link href="signup"> Click here to go to signup page</Link></button>
    <button className='bg-green-500 rounded-lg mt-16'> <Link href="login"> Click here to go to login page</Link></button>
    
    </div>
  )
}

export default Pagep