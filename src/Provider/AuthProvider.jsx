/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../FireBase/Firebase.init";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Create new user
    const CreateNewUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating user: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // User login
    const userLogin = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login error: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Google login
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google login error: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logOut = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } catch (error) {
            console.error("Logout error: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateUserProfile = async (updatedData) => {
        setLoading(true);
        try {
            return await updateProfile(auth.currentUser, updatedData);
        } catch (error) {
            console.error("Error updating profile: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const authInfo = {
        user,
        setUser,
        CreateNewUser,
        logOut,
        userLogin,
        loading,
        updateUserProfile,
        handleGoogleLogin,
    };

    // Listen for auth state changes
    useEffect(() => {
        const undo = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser)); // Optionally store user data
            } else {
                localStorage.removeItem('user');
            }
        });

        return () => undo();
    }, []);

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
