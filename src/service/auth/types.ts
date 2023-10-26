export interface UserSession {
    data: {
        token: string
        user: {
            id: number,
            rut: string,
            role: string,
        }
    }
}

export interface UserLocal {
    id: number,
    rut: string,
    role: string,
}

export interface User {
    id: number,
    rut: string,
    role: string,
}



export class userLogin {
    constructor(
        public rut: string,
        public password: string
    ) { }
}