import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    router.replace('/Login'); // 👈 instantly redirects to login
  }, []);

  return null; // no UI
}