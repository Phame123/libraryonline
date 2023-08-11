import { doc, getDoc, updateDoc, setDoc, arrayUnion, addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [address, setAddress] = useState("")
  const [fullName,setFullName] = useState("")

  const handleOpen = () => setOpen(!open);

  //fetch data from localstorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);


  //fetch book from firestore using title

 useEffect(() => {
   const unsubscribe = onSnapshot(doc(db, "books", id), (docSnap) => {
     if (docSnap.exists()) {
       setBook(docSnap.data());
     } else {
       // Handle case where the document doesn't exist
       setBook(null);
     }
     setLoading(false); // Set loading to false once the data is retrieved
   });

   return () => {
     // Unsubscribe from the snapshot listener when the component unmounts
     unsubscribe();
   };
 }, [id]);

  console.log(book);

 const handleBorrow = async (e) => {
   e.preventDefault();
   try {
     const docRef = doc(db, "books", id);
     const docSnap = await getDoc(docRef);
     const book = docSnap.data();
     if (book.copies > 0) {
       await updateDoc(docRef, {
         copies: book.copies - 1,
       });

       // Borrower's information
       const borrowerData = {
         // Change to the actual user's UID
         // Change to the actual book's ID
         borrowedAt: new Date(),

         //return date is 72 hours after current date

         name: fullName,
         email: currentUser.email,
         phone: currentUser.phone,
         address: address,
         author: book.author,
         borrowedAt: new Date(),
         returnDate: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours in milliseconds
       };

       //const borrowHistoryRef = doc(db, "borrowHistory"); // Assuming "borrowHistory" is your collection name
       //await setDoc(borrowHistoryRef, borrowerData);

       alert("Book borrowed successfully. You have 72 hours to return it");
        setOpen(false);
     } else {
       alert("Book not available");
     }
   } catch (err) {
     console.log(err);
   }
 };





  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div class="container px-5 py-24 mx-auto          ">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={book?.imageUrl}
              />
              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {book?.author}
                </h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                  {book?.title}
                </h1>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <span class="text-gray-600 ml-3">{book?.category}</span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    ISBN: {book?.ISBN}
                  </span>
                </div>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <span class="text-gray-600 ml-3">
                      Book location:
                      {book?.location}
                    </span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    Copies:
                    {book?.copies > 0 ? (
                      <h2>{book?.copies}</h2>
                    ) : (
                      <h2>Book not available</h2>
                    )}
                  </span>
                </div>
                <p class="leading-relaxed">{book?.description}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div class="flex ml-6 items-center">
                    <span class="mr-3">Pages {book?.pages}</span>
                  </div>
                </div>
                {
                  currentUser?(
 <Button
                  onClick={handleOpen}
                  variant="black"
                  className="bg-black"
                >
                  Borrow Book
                </Button>
        ): <Button
                  onClick={() => alert("Login to borrow book")}
                  variant="black"
                  className="bg-black"
                >
                  Login to Borrow Book
                </Button>
  
                }
               
              </div>
            </div>
          </div>
        )}
      </section>
      <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>
            Fill this form to borrow a copy of this book.
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleBorrow}>
              <label htmlFor="name">Full Name</label>
              <Input
                type="text"
                placeholder="Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <label htmlFor="address">Address</label>
              <Input
              value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
                required
              />

              <DialogFooter>
               
                <Button variant="gradient" color="green" type="submit">
                  <span>Borrow</span>
                </Button>

                
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                  </Button>

              </DialogFooter>
            </form>
          </DialogBody>
        </Dialog>
      </>
    </div>
  );
};

export default BookDetail;
