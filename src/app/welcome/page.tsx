'use client';
import { registerWithEmailAndPassword, logInWithEmailAndPassword, logOutUser } from '@/authService';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);

  const onClick = () => {
    registerWithEmailAndPassword('Rweqwe', 'test@gmail.com', '3cFj49D63@');
  };

  const onClickLogin = async () => {
    logInWithEmailAndPassword('test@gmail.com', '3cFj49D63@');
  };

  if (loading) {
    return <div>Loading</div>;
  }

  console.log(user);

  return (
    <>
      <div>Hello {user?.email || ''}</div>
      <button onClick={onClick}>Register</button>
      <button onClick={onClickLogin}>Login</button>
      <button onClick={logOutUser}>Logout</button>
    </>
  );
}

export default WelcomePage;
