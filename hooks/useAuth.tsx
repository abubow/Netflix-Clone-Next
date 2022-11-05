import { async } from "@firebase/util";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";


interface AuthContextType {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }


const AuthContext = createContext<AuthContextType | null>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  });

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

    useEffect(
        () =>
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // Logged in...
              setUser(user)
              setLoading(false)
            } else {
              // Not logged in...
              setUser(null)
              setLoading(true)
              router.push('/login')
            }
    
            setInitialLoading(false)
          }),
        [auth]
      ) 

	const SignUp = async (email: string, password: string) => {
		setLoading(true);
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
			.then((userCredential) => {
				setUser(userCredential.user);
				setLoading(false);
				router.push("/");
			})
			.catch((error) => {
				alert(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const SignIn = async (email: string, password: string) => {
		setLoading(true);
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
			.then((userCredential) => {
				setUser(userCredential.user);
				setLoading(false);
				router.push("/");
			})
			.catch((error) => {
				alert(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const SignOut = async () => {
		setLoading(true);
		await signOut(auth)
			.then(() => {
				setUser(null);
				setLoading(false);
				router.push("/");
			})
			.catch((error) => {
				alert(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
    const value = useMemo(
        () => ({
            user,
            signUp: SignUp,
            signIn: SignIn,
            logout: SignOut,
            error: error,
            loading,
        }),
        [user, loading]
    );
    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default function useAuth () {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}