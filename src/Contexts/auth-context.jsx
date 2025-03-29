import { createContext, useContext, useState, useEffect } from 'react';
import { fireBaseAuth, signInWithGoogle, signOutWithGoogle } from "../auth/firebase";

const CustomAuthContext = createContext();

const useFirebaseAuthContext = () => {
    return useContext(CustomAuthContext);
}

const FireBaseAuthContext = ({children}) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    const googleLogin = async () => {
        const response = await signInWithGoogle();
        return response;
    }

    const googleLogout = async () => {
        const response = await signOutWithGoogle();
        return response
    }

    useEffect(() => {
        const unsubscribe = fireBaseAuth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authValues = {
        user,
        googleLogin,
        googleLogout
    };

    return(
        <CustomAuthContext.Provider value={authValues}>
            {!loading && children}
        </CustomAuthContext.Provider>
    )
}

export { FireBaseAuthContext, useFirebaseAuthContext };