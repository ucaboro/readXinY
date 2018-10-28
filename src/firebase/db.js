import { db } from './firebase';

// User API

export const doCreateUser = (id, email) =>
  db.ref(`users/${id}`).set({
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const userBooks = (id) =>
db.ref('users').child(id).child('books');

export const addBookToReading = (uid,bookId, title, author, cover) =>{
  db.ref('users').child(uid).child('books').push({
    id: bookId,
    title: title,
    author: author,
    cover: cover,
    category: 'reading',
    comment: 'add your comment',
  })
}

export const addBookToRead = (uid,bookId, title, author, cover) =>{
  db.ref('users').child(uid).child('books').push({
    id: bookId,
    title: title,
    author: author,
    cover: cover,
    category: 'to read',
    comment: 'add your comment',
  })
}


export const addCoinToCardId = (id, coin, amount, exchange, invested) => {
  const dbRef=db.ref().child(id).child(id);
  dbRef.push({
    coin: coin,
    amount: amount,
    exchange: exchange,
    invested: invested
  })
}