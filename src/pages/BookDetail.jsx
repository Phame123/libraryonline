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


  //get user details from localstorage
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
  console.log()

 const handleBorrow = async (e) => {
   e.preventDefault();
   console.log("borrowing book");
   //send data to firestore
    try {
      const docRef = await addDoc(collection(db, "borrowedBooks"), {
        fullName,
        address,
        title: book.title,
        id:book.id,
        author: book.author,
        ISBN: book.ISBN,
        imageUrl: book.imageUrl,
        category: book.category,
        email: currentUser.email,
       // phone: currentUser.phone,
       // email: currentUser.email,

        
        borrowedDate: new Date(),

        //three days from borrowed date
        returnDate: new Date(new Date().setDate(new Date().getDate() + 3)),

        
      });

      //update book copies
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, {
        copies: book.copies - 1,
      });

      //save the document data to localstorage

      localStorage.setItem("borrowedBook", JSON.stringify(docRef));      

      console.log("Document written with ID: ", docRef.id);
      alert("Book borrowed successfully");
      handleOpen();
    }
    catch (e) {
      console.error("Error adding document: ", e);
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
                    Category:
                    <span class="text-gray-600 ml-3">{book?.category}</span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    ISBN: {book?.ISBN}
                  </span>
                </div>
                <div class="flex mb-4">
                  
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    Copies:
                    {book?.copies > 0 ? (
                      <h2>{book?.copies}</h2>
                    ) : (
                      <h2>Book not available</h2>
                    )}
                  </span>
                </div>
                <h1 class="font-bold">
                  Description
                </h1>
                <p class="leading-relaxed">{book?.description}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div class="flex ml-6 items-center">
                    <span class="mr-3">Pages {book?.pages}</span>
                  </div>
                </div>

                {currentUser ? (
                  <Button
                    onClick={handleOpen}
                    variant="black"
                    className="bg-black"
                    disabled={book?.copies < 1}
                  >
                    {
                      book?.copies < 1 ? (
                        <span>Book not available</span>
                      ) : (
                        <span>Borrow</span> 
                      )
                    }


                  </Button>
                ) : (
                  <Button
                    variant="black"
                    className="bg-black"
                    onClick={() => alert("Please login to borrow a book")}
                  >
                    <span>
                      Login to borrow
                    </span>
                  </Button>

                )}
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
