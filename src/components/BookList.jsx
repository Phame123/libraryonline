import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection } from 'firebase/firestore'


const BookList = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    //from firestore
    try{
      const fetchBooks = async () => {
        const response = await db.collection('books').get()
        const allBooks = []
        response.forEach(doc => {
          allBooks.push(doc.data())
        })
        setBooks(allBooks)
        setLoading(false)
      }
      fetchBooks()
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log(books)

    

    
  return (
    <div>

    </div>
  )
}

export default BookList