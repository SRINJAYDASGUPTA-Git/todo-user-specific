'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);

    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logOut = ()=>{
        signOut(auth);

    
    }

    useEffect (()=>{
        const unSub = onAuthStateChanged(auth, (currentUser)=>{
             setUser(currentUser);
        })
        return() => unSub()
    }, [user])
    

    return(
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth= ()=>{
    return useContext(AuthContext);
}