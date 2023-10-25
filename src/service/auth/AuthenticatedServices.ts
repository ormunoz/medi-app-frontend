import { useAuthStore } from "../stores/auth";


export class AuthenticatedService {

    authStore = useAuthStore();

    constructor(){
        this.authStore = useAuthStore()
    }

    /**
     * Token del usuario autenticado. En caso de no estar autenticado, se
     * genera una excepción
     */
    get token(): string{
        if(!this.authStore.token){
            throw new Error("Usuario no autenticado")
        }

        return this.authStore.token!
    }
}
