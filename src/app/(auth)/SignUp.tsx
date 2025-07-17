import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Button } from 'react-native-paper'
import {auth } from '@/services/config' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { set } from 'firebase/database'



const SignUpScreen = () => {
  const [loading , setLoading ] = useState(false);

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () =>{
    setLoading( true);
    if( !username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === ""){
      setLoading(false);
      return alert("Please fill all fields");
    }
    if(password.length < 6){
      setLoading(false);
      return alert("Password must be at least 6 characters long");
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(auth , email, password);
      const user = userCredential.user;
      const id = user.uid;
       
      console.log("User created successfully:", user);
      setLoading(false);
      
      
      router.replace('/Home');


    } catch (error) {
      alert("Error creating account");
      console.error("Sign Up Error", error);
    }
  
    console.log("Sign Up" , {username , email , password});
    
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign Up</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Button onPress={() => handleSignUp()}>Sign Up</Button>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link} onPress={() => { router.push('/Login') }}>Login</Text>
      </Text>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EBD3',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#555879',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#DED3C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#DED3C4',
    color: '#555879',
  },
  button: {
    backgroundColor: '#98A1BC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#F4EBD3',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555879',
  },
  link: {
    color: '#98A1BC',
    fontWeight: '500',
  },
})
