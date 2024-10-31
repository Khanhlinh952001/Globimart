"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, fireStore } from "@/libs/firebase";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { UserInfo, Address } from '@/types/user';

// Update interface to include addresses
interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  checkUserRule: () => Promise<void>;
  updateUserInfo: (userInfo: Partial<UserInfo>) => Promise<void>; // Change to Partial<UserInfo>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  resetPassword: async () => {},
  loginWithGoogle: async () => {},
  checkUserRule: async () => {},
  updateUserInfo: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(fireStore, 'customers', authUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserInfo;
            setUser({ ...userData, uid: authUser.uid }); // Ensure uid is set
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkUserRule = async () => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(fireStore, 'customers', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.rule === 'customer') {
            router.push('/');
          } else {
            await signOut(auth);
            router.push('/shop-registration');
            toast.error('You are not registered as a customer. Please register as a shop.');
          }
        }
      } catch (error) {
        console.error('Error checking user rule:', error);
        toast.error('An error occurred while checking user permissions.');
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await checkUserRule();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please check your credentials.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(fireStore, 'customers', user.uid), {
        email,
        uid:user.uid,
        displayName,
        rule: 'customer',
        addresses: [], // Thêm trường address là một mảng rỗng
        createdAt: new Date(),
      });

      await updateProfile(user, { displayName });
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send password reset email. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await setDoc(doc(fireStore, 'customers', user.uid), {
        email: user.email,
        rule: 'customer',
        displayName: user.displayName,
        createdAt: new Date(),
      }, { merge: true });

      await checkUserRule();
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to log in with Google. Please try again.');
    }
  };

  const updateUserInfo = async (userInfo: Partial<UserInfo>) => {
    if (user) {
      try {
        // Update Firebase Auth profile
        if (userInfo.displayName) {
          await updateProfile(auth.currentUser!, { displayName: userInfo.displayName });
        }

        // Update Firestore document
        const userDocRef = doc(fireStore, 'customers', user.uid);
        const updateData: Partial<UserInfo> = {
          ...userInfo,
          updatedAt: new Date().toISOString(),
        };
        await updateDoc(userDocRef, updateData);

        // Update local user state
        setUser({ ...user, ...updateData });

        toast.success('User information updated successfully');
      } catch (error) {
        console.error('Update user info error:', error);
        toast.error('Failed to update user information. Please try again.');
      }
    } else {
      toast.error('No user is currently logged in');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    resetPassword,
    loginWithGoogle,
    checkUserRule,
    updateUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
       <Toaster position="top-center" reverseOrder={false} />
      {children}
    </AuthContext.Provider>
  );
};
