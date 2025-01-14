import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('CurrentUser-->', currentUser?.email);
      if (currentUser?.email) {
        setUser(currentUser);
        // save user to the database
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
            {
              email: currentUser?.email,
              name: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            }
          );
          // Get JWT token
          console.log('Getting JWT token...');
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser?.email,
            },
            { withCredentials: true }
          );
          console.log('JWT token received:', response.data.token);
        } catch (error) {
          console.error('Error during JWT token generation or user saving:', error);
        }
      } else {
        setUser(null); // Ensure user is set to null if not authenticated
        try {

          await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });

        } catch (error) {
          console.error('Error during logout:', error);
        }
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;