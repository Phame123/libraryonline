import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home'
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
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
          </Routes>
          </Layout>
        </BrowserRouter>
      
    </>
  );
}

export default App
