import { auth } from './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

  //get current users
export const getCurrentUserId = () =>
auth.currentUser

  // Sign out
export const doSignOut = () =>
  auth.signOut();

  //optional
  // Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
