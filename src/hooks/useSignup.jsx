import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.Config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useGlobalContext } from './useGlobalContext';

function useSignup() {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const { dispatch } = useGlobalContext()

    const signup = (displayName, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (user) => {
                await updateProfile(auth.currentUser, {
                    displayName,
                })

                dispatch({ type: 'LOGIN', payload: user })
                toast("Email added successfully")
            })
            .catch((error) => {
                setError(error)
            })
    }

    return { user, error, signup }
}

export default useSignup