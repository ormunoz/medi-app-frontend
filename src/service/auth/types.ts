export interface UserSession {
    data: {
        token: string
        user: {
            id: number,
            userName: string,
            role: string,
        }
    }
}

export interface UserLocal {
    id: number,
    userName: string,
    role: string,
}

export interface User {
    id: number,
    userName: string,
    role: string,
}



export class userLogin {
    constructor(
        public userName: string,
        public password: string
    ) { }
}