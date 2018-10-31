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

export const getTrackers = (id) =>
db.ref('users').child(id).child('trackers').child('currentTracker');

export const deleteCurrentTracker = (id) =>
 db.ref('users').child(id).child('trackers').child('currentTracker').remove();


export const setTracker = (uid, tracker) => {
  db.ref('users').child(uid).child('trackers').set({
    currentTracker: tracker,
  })
};

export const addBookToReading = (uid,bookId, title, author, cover) =>{
  db.ref('users').child(uid).child('books').push({
    id: bookId,
    title: title,
    author: author,
    cover: cover,
    category: 'reading',
    comment: 'add your comment',
  })
};

export const addBookToRead = (uid,bookId, title, author, cover) =>{
  db.ref('users').child(uid).child('books').push({
    id: bookId,
    title: title,
    author: author,
    cover: cover,
    category: 'to read',
    comment: 'add your comment',
  })
};




export const findBookById = (uid, bookId) =>
  db.ref('users').child(uid).child('books').orderByChild('id').equalTo(bookId);

export const deleteBookById = (uid, bookId) =>{
let fbBookId =''
findBookById(uid, bookId).on('value', snap =>{
  if(snap.val()!=undefined&&snap.val()!=null){
   fbBookId = Object.keys(snap.val()).toString()
}
})
  db.ref('users').child(uid).child('books').child(fbBookId).remove();
}
