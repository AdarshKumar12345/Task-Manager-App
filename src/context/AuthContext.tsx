import { StyleSheet, Text, View } from 'react-native'
import {User , onAuthStateChanged} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '@/services/config'

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({children}:any) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

   
  }, [])

  return (
   <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);


const styles = StyleSheet.create({})