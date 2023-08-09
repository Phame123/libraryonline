//import { Navbar } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const router = useNavigate();
 


  
  return (
    <header class="text-gray-600 body-font border-b-2">
      <div class="container mx-auto flex  p-5  items-center justify-between">
        <div class="flex title-font font-medium items-center text-gray-900  md:mb-0">
          <h2 class="ml-3 text-2xl italic ">TheLib</h2>
        </div>

        <div>
          {}
          <Link to={"/books"}>
            <button class="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-black hover:text-black rounded text-base mt-4 md:mt-0 mr-4">
              Find Books
            </button>
          </Link>

          <Link to={"/login"}>
            <button class="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-black hover:text-black rounded text-base mt-4 md:mt-0 mr-4">
            Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button class="inline-flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 text-white hover:text-black rounded text-base mt-4 md:mt-0 mr-4">
            Register
            </button>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
