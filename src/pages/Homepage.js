import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import WorkspacesScreen from '../screens/WorkspacesScreen';
import LoginScreen from '../screens/LoginScreen';

function Homepage() {
  const [user, loadingState] = useAuthState(auth);

  return (
    !user ? <LoginScreen /> : <WorkspacesScreen />
  )
}

export default Homepage