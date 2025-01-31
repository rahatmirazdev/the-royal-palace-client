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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      // console.log('CurrentUser', currentUser)
      if (currentUser?.email) {
        setUser(currentUser)

        // Get JWT token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
        // console.log('JWT Token-->', response.data.token)

        // Check if user exists in the database
        try {
          const userResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`,
            { withCredentials: true }
          )
          if (!userResponse.data) {
            // Add user to the database
            await axios.post(
              `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`,
              {
                email: currentUser.email,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                timestamp: Date.now(),
                role: 'user'
              },
              { withCredentials: true }
            )
            setUser({ ...currentUser, role: 'user' })
          } else {
            setUser({ ...currentUser, role: userResponse.data.role })
          }
        } catch (error) {
          console.error('Error checking or adding user:', error)
        }
      } else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        })
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])


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