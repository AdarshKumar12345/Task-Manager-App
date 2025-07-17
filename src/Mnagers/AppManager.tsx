
import HomeScreen from '@/app/(tabs)/TaskScreen';
import LoginScreen from '@/app/(auth)/Login';
import SignUpScreen from '@/app/(auth)/SignUp'; // Replace with actual SignUpScreen when available
import AddTaskScreen from '@/app/(tabs)/AddTask'; // Replace with actual SignUpScreen when available
import React from 'react';
import { StyleSheet } from 'react-native';





const AppManager = () => {
  const [currentScreen, setCurrentScreen] = React.useState('login'); // Default to login screen
  return (
    <>
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'signup' && <SignUpScreen />}
     
    </>
  )
}

export default AppManager

const styles = StyleSheet.create({})