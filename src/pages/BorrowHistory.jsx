import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';

const BorrowHistory = () => {
  const [books, setBooks] = useState([])

 useEffect(() => {
   const user = JSON.parse(localStorage.getItem("user"));
   const booksRef = collection(db, "borrowedBooks");
   const q = query(booksRef, where("email", "==", user.email));

   const unsubscribe = onSnapshot(q, (querySnapshot) => {
     const books = [];
     querySnapshot.forEach((doc) => {
       books.push({ ...doc.data(), id: doc.id });
     });
     setBooks(books);
   });

   return () => {
     unsubscribe(); // Unsubscribe from the real-time listener when the component unmounts
   };
 }, []);







  return (
    <div class="tflex items-center w-full h-full justify-center">
      <h2 className='text-xl font-bold text-center py-12'>
     My     Borrow History
      </h2>
      <table class=" items-center w-full h-full justify-center">
        <thead>
          <tr>
            <th>Book title</th>
            <th>Borrow date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-center">
              <td>{book.title}</td>
              <td>
                {
                  //this is a timestamp
                  new Date(
                    book.borrowedDate.seconds * 1000
                  ).toLocaleDateString()
                }
              </td>
              <td>
                {
                  //this is a timestamp
                  new Date(
                    book.returnDate.seconds * 1000
                  ).toLocaleDateString()
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowHistory