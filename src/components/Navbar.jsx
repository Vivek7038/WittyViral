import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate();
  return (
   <>
   <h1 className="text-4xl mt-4 mb-5 " onClick={()=>navigate("/")}>Meme Generator </h1>
   </>
  )
}

export default Navbar