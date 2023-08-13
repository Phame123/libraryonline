import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home'
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
import  { Login } from './pages/Login';
import { Register } from './pages/Register';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import BorrowHistory from './pages/BorrowHistory';
//import BookList from './components/BookList'
 



 //if user is not available clear user dat from localstorage
  




function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   if (!user) {
  //     localStorage.removeItem("user");
  //   } else {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }
  // }, [user]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    
        <BrowserRouter>
          <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/history' element={<BorrowHistory/>}/>
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
