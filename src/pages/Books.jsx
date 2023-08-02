

import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Books = () => {
     const [books, setBooks] = useState([]);
     const [loading, setLoading] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};

     const getBooks = async () => {
            setLoading(true);
            const booksRef = collection(db, 'books');
            const snapshot = await getDocs(booksRef);
            const books = snapshot.docs.map(doc => doc.data());
            setBooks(books);
            setLoading(false);
            console.log(books);
        }

        useEffect(() => {
            getBooks();
        }, []);
        
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
       const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convert the search term to lowercase for case-insensitive search
  };

useEffect(() => {
  const filteredResults = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm);
    const categoryMatch =
      selectedCategory === null || book.category === selectedCategory;
    return titleMatch && categoryMatch;
  });
  setSearchResults(filteredResults);
}, [books, searchTerm, selectedCategory]);

        const categories = [
            {
                id: 1,
                name: 'Technology',
            },
            {
                id: 2,
                name: 'Science',
            },
            {
                id: 3,
                name: 'Business',

            },
            {
                id: 4,
                name: 'Health',
            },

            {
                id: 5,
                name: 'Arts',
            },
            {
                id: 6,
                name: 'Biography',
            },
            {
                id: 7,
                name: 'Sports',
            },
            {
                id: 8,
                name: 'Travel',
            },
        ];


  return (
    <div>
      <div class="container mx-auto py-8">
        <input
          class="w-full h-16  rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
          type="search"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={handleChange}
        />

        <div class="flex items-center justify-center">
          <h1 class="text-3xl font-bold leading-tight text-center text-gray-900">
            What Interest you?
          </h1>
        </div>
        <nav class="flex w-full flex-wrap">
          {categories.map((category) => (
            <a
              key={category.id}
              class={`no-underline border rounded-full hover:bg-black hover:text-white text-black py-3 px-4 font-medium mr-3 m-2 ${
                selectedCategory === category.name ? "bg-black text-white" : ""
              }`}
              href="#"
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </a>
          ))}
        </nav>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {loading ? (
              <div class="w-full text-center">
                <h2 class="text-2xl text-gray-800">Loading...</h2>
              </div>
            ) : searchResults.length === 0 ? (
              <div class="w-full text-center">
                <h2 class="text-2xl text-gray-800">
                  No matching results found.
                </h2>
              </div>
            ) : (
              searchResults.map((book) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Books