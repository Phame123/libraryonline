import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home'
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
import  { Login } from './pages/Login';
import { Register } from './pages/Register';
//import BookList from './components/BookList'



function App() {
  

  return (
    <>
    
        <BrowserRouter>
          <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/books' element={<Books/>} />
            <Route path="/details/:id" element={<BookDetail/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
          </Layout>
        </BrowserRouter>
      
    </>
  );
}

export default App
