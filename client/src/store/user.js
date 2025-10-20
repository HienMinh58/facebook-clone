import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    currentUser: null,
    setUsers: (users) => set({ users }),
    registerUser: async (newUser) => {
        if(!newUser.email || !newUser.password) {
            return { success: false, message: "Please provide email and password." };
        }
        try {
            const res = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newUser),
            });
            if( !res.ok ) {
                throw new Error("Registration");
            }
            const data = await res.json();
            set((state) => ({
                users: [...state.users, data.user],
                currentUser: data.user,
            }));
            return { success: true, message: "User registered successfully!" };
        } catch (error) {
            return { success: false, message: error.message || "An error occurred during registration." };
        }
    },
    loginUser: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
            return { success: false, message: "Please provide username or email and password." };
        }
        try {
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            if (!res.ok) {
                throw new Error("Login failed");
            }
            const data = await res.json();
            set({
                currentUser: data.data,
                token: data.token,
            });
            return { success: true, message: "User logged in successfully!" };
        } catch (error) {
            return { success: false, message: error.message || "An error occurred during login." };
        }
    },
    logoutUser: () => set({ currentUser: null, token: null }),
}))