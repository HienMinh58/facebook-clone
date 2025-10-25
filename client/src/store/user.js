import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      token: null,

      // ---- SET USERS ----
      setUsers: (users) => set({ users }),

      // ---- REGISTER ----
      registerUser: async (newUser) => {
        if (!newUser.email || !newUser.password) {
          return { success: false, message: "Please provide email and password." };
        }
        try {
          const res = await fetch("/auth/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newUser),
          });
          if (!res.ok) throw new Error("Registration failed!");
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

      // ---- LOGIN ----
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
          if (!res.ok) throw new Error("Login failed");
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

      // ---- LOGOUT ----
      logoutUser: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('profileUser');
        set({ currentUser: null, token: null });
      },

      // ---- PERMISSIONS ----
      hasPermission: (permission) => {
        const role = get().currentUser?.role || "guest";
        const permissions = {
          user: ["message", "like", "share", "post"]
        };
        return permissions[role]?.includes(permission) || false;
      },
    }),
    {
      name: "user-storage", // key để lưu trong localStorage
      partialize: (state) => ({
        currentUser: state.currentUser,
        token: state.token,
      }),
    }
  )
);
