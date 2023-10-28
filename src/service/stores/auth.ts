import { User, UserSession, UserLocal } from "@/service/auth/types";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => {
        const localStorageUser = localStorage.getItem("user")
        const localStorageUserSession = localStorage.getItem("userSession")

        let user: UserLocal | null = null
        let userSession: UserSession | null = null;

        if (localStorageUser) {
            user = JSON.parse(localStorageUser)
        }
        if (localStorageUserSession) {
            userSession = JSON.parse(localStorageUserSession)
        }

        return {
            token: localStorage.getItem("token"),
            user: user,
            userSession: userSession,
        }
    },

    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.setItem("token", token)
        },

        setUser(user: UserLocal) {
            this.user = user
            localStorage.setItem("user", JSON.stringify(user))
        },

        setUserSession(userSession: UserSession) {
            this.userSession = userSession
            localStorage.setItem("userSession", JSON.stringify(userSession));
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        
    },

    getters: {
        userIsAuthenticated(state): boolean {
            return state.user != null
        }
    }
})

export type AuthStore = ReturnType<typeof useAuthStore>
