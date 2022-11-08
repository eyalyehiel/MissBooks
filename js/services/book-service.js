
import { storageService } from './async-storage.service.js'
import gBooks from '../../data/books.json' assert {type: 'json'}
import {utilService} from './util.service.js'

export const bookService = {
  query,
  getById,
  addReview,
  removeReview
}

const BOOKS_KEY = 'booksDB'

_createBooks()
function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if(!books || !books.length) {
      books = gBooks
      utilService.saveToStorage(BOOKS_KEY, books)
    }
}

function query() {
  return storageService.query(BOOKS_KEY)
}

function getById(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function addReview(bookId, review) {
  review.id = utilService.makeId()
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      if (!book.reviews) book.reviews = []
      book.reviews.push(review)
      return storageService.put(BOOKS_KEY, book)
    })
}

function removeReview(bookId, reviewId) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      book.reviews = book.reviews.filter(review => review.id !== reviewId)
      return storageService.put(BOOKS_KEY, book)
    })
}