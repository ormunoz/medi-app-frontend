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


export class userRegister {
    constructor(
        public rut: string,
        public password: string,
        public role: string,
        public name: string,
        public last_name: string,
        public city: string,
        public email: string,
        public totalScore: number,
        public option: [],
    ) { }
}