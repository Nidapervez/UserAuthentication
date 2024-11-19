// 'use client'
// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { verify } from 'crypto'
// import Link from 'next/link'

// const VerifyEmailPage = () => {
//     const[token,setToken]=useState("")
//     const[verified,setVerified]=useState(false)
//     const [error,setError]=useState(false)
// const verifyUserEmail=async()=>{
//     try {
//         await axios.post("/api/users/verifyemail",{token})
//         setVerified(true)
//         setError(false)
//     } catch (error:any){
//         setError(true)
//         console.log(error.response.data)
        
//         useEffect(()=>{
//             setError(false)
//            const urlToken = window.location.search.split("=")[1]
//            setToken(urlToken || "")
//         })
//        useEffect(()=>{
//         if(token.length>0){
//             verifyUserEmail()}
//        }, [token])     
//  }
// }



//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white ">
//         <h1 className='text-4xl'>Verify Email</h1>
//         <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "no token"}</h2>
//         {verified && (
//         <div>
//             <h2>
//                 Verified
//             </h2>
//             <Link href="/login">Login</Link>
//         </div>
//         )}


// {error && (
//         <div>
//             <h2 className="bg-red-700">
//                 Error
//             </h2>
   
//         </div>
//         )}
    
//     </div>
//   )
// }

// export default VerifyEmailPage