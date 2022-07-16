import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export interface ValueContext {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: User | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassword: (email: string) => void;
  isLoading: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<ValueContext | null>(null);

export const useAuth = () => useContext(AuthContext);

const signUp = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const login = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const logOut = () => signOut(auth);

const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        login,
        logOut,
        user,
        isLoading,
        setIsLoading,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
