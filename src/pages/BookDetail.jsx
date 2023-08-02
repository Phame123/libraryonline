import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';

const BookDetail = () => {
  const {id} = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  //fetch book from firestore using title

useEffect(() => {
  const getBook = async () => {
    try {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);
      setBook(docSnap.data());
      setLoading(false); // Set loading to false once the data is retrieved
      console.log(docSnap.data());
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading to false if there's an error as well
    }
  };


  getBook();
  
}, [id]);

console.log(book);


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
                  ISBN:  {book?.ISBN}
                  </span>
                </div>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <span class="text-gray-600 ml-3">
                       Book location:
                      {book?.location}</span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    Copies:{
                      book?.copies > 0 ? (
                        <h2>
                          {book?.copies}
                        </h2>
                      ) : (
                        <h2>
                          Book not available
                        </h2>
                      )
                    }
                  </span>
                </div>
                <p class="leading-relaxed">{book?.description}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div class="flex ml-6 items-center">
                    <span class="mr-3">Pages {book?.pages}</span>
                  </div>
                </div>
                {/* <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div> */}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BookDetail