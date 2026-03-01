"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    email: string;
    name?: string;
    token?: string;
    expiryDate?: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Simple client-side persistence using localStorage for now.
        // In a production app, verify this session via an HTTP-only cookie with a JWT.
        const storedUser = localStorage.getItem("gym_user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Check if the 30-day expiration date has passed
                if (parsedUser.expiryDate && new Date().getTime() < parsedUser.expiryDate) {
                    setUser(parsedUser);
                } else {
                    // Token expired
                    localStorage.removeItem("gym_user");
                }
            } catch (e) {
                localStorage.removeItem("gym_user");
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Protect routes other than /auth
        if (!isLoading) {
            if (!user && !pathname.startsWith("/auth")) {
                router.push("/auth");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = (userData: User) => {
        // Calculate 30 days from now in milliseconds
        const expiryDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
        const dataToStore = { ...userData, expiryDate };

        setUser(userData);
        localStorage.setItem("gym_user", JSON.stringify(dataToStore));
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("gym_user");
        router.push("/auth");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
