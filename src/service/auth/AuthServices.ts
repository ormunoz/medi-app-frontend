import { useAuthStore } from "../stores/auth";
import { getEnvConfig } from "@/configs/UrlConfig";
import { User, UserSession, userLogin } from "./types";
import { Response } from "../types";
import { getResponse, keysToSnake } from "../utils";
export class AuthService {
    async login(userLogin: userLogin): Promise<Response<UserSession>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/login`
        return getResponse(url, undefined, 'POST', keysToSnake(userLogin), undefined)
    }

    async getProfile(token: string): Promise<Response<User>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/me`
        return getResponse(url, token)
    }

    // async logout(token: string): Promise<Response<any>>{
    //     const url = `${getEnvConfig().apiURL}/auth/logout`

    //     return getResponse(url, token, 'POST')
    // }

    // async register(userInfo: object): Promise<Response<User>>{
    //     const url = `${getEnvConfig().apiURL}/auth/register`
    //     return getResponse(url, undefined, 'POST', userInfo)
    // }

    /**
     * Valida que la sesion del usuario es valida.
     * @returns Retorna True si la sesión es valida y False en caso contrario
     */
    async hasValidUserSession() {
        const authStore = useAuthStore()
        if (authStore.token) {
            const response = await this.getProfile(authStore.token)
            if (response.success) {
                return true
            }
            else {
                authStore.logout()
                return false
            }
        }
        return false
    }
}