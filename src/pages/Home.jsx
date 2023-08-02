import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import { collection, getDocs, limit, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    setLoading(true);
    const fetchBooks = () => {
      const booksRef = collection(db, 'books');
      const limitedBooksQuery = query(booksRef, limit(4)); // Limit the data to 4 records
      
      // Set up a real-time listener with onSnapshot
      const unsubscribe = onSnapshot(limitedBooksQuery, (snapshot) => {
        const booksData = [];
        snapshot.forEach((doc) => {
          booksData.push(doc.data());
        });
        setBooks(booksData);
        setLoading(false);
        console.log(booksData);
        });

        return unsubscribe;

    };
    fetchBooks();

    }, []);

        
        




  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to our online community library! Explore a world of
              knowledge and imagination right at your fingertips{" "}
              <br class="hidden lg:inline-block" />
            </h1>
            <p class="mb-8 leading-relaxed">
              From classic literature to contemporary bestsellers, we have
              curated a diverse collection of books, all accessible with just a
              click. Join fellow book lovers and embark on literary journeys
              that will inspire, educate, and entertain you.{" "}
            </p>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-20">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Recommended Books For You
              </h1>
              <div class="h-1 w-20 bg-gray-500 rounded"></div>
            </div>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
          </div>
          <div class="flex flex-wrap -m-4">
            {books.map((book) => (
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-64 rounded overflow-hidden">
                  <Link to={`/details/${book.id}`}>
                    <img
                      alt="ecommerce"
                      class="object-cover object-center w-full h-full block"
                      src={book.imageUrl}
                    />
                  </Link>
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-900 text-xs tracking-widest title-font mb-1">
                    {book.author}
                  </h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    {book.title}
                  </h2>
                  <div className="flex justify-between">
                    <p class="mt-1">{book.category}</p>
                    <p class="mt-1">
                      {book.copies > 0 ? (
                        <h2>Available</h2>
                      ) : (
                        <h2>Not Available</h2>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home