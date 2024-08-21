import { logOutUser } from '@/authService';
import { auth } from '@/firebase';
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

export function SignOutBtn() {
  const [user] = useAuthState(auth);

  function handleLogOut(): void {
    logOutUser();
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleLogOut} sx={{ marginTop: 2 }} disabled={!user}>
        Log out (temp)
      </Button>
    </div>
  );
}
