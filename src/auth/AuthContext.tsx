import React, { createContext, useEffect, useEffectEvent, useState} from "react";
import type { UserAuth, AuthState, StoredUserDataType } from "../types/types";
// import { useNavigate } from "@tanstack/react-router";

const AuthContext = createContext<AuthState | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  const restoreSession = useEffectEvent(() => {
    const storedUser = localStorage.getItem('auth-user');
    if(storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  })

  useEffect(() => {
    restoreSession();
   
  }, [])

  const login = async (email: string, password: string) => {
    const rawUsers = localStorage.getItem('users');
    const users: StoredUserDataType[] = rawUsers ? JSON.parse(rawUsers) : [];

    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    )

    if(!existingUser) {
      throw new Error('User not found')
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = existingUser

    setUser(safeUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth-user', JSON.stringify(safeUser))
  }

  const logout = () => {
    console.log("grbhtabny")
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth-user');
    console.log("logging out")
  
    // navigate({ to: "/login"})
  }


  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext };

