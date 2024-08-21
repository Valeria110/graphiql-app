'use client';
import { auth } from "@/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function WelcomePage() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading</div>;
    }

    console.log(user)

    return (
        <>
            <div>Hello {user?.email || ''}</div>
            <button>Register</button>
            <button>Login</button>
            <button>Logout</button>
        </>
    );
}

export default WelcomePage;