//import { Navbar } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);


  
  return (
    <header class="text-gray-600 body-font border-b-2">
      <div class="container mx-auto flex  p-5  items-center justify-between">
        <div class="flex title-font font-medium items-center text-gray-900  md:mb-0">
          <h2 class="ml-3 text-2xl italic ">
            TheLib
          </h2>
        </div>
    
        <div>
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-4">
            Sign In
          </button>
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Sign Up
          </button>
        </div></div>
      
    </header>
  );
};

export default Navbar;
