export class Patient {
    email: string;
    id: number;
    lastName: string;
    city: number;
    totalScore: number;
    name: string;
    assignedProfessional: number;
    user: {
        id: number;
        rut: string;
        password: string;
        role: string;
    };
    profesional: {
        id: number;
        name: string;
        lastName: string;
        especiality: string;
    };
    userId: number;
    data: any;

    constructor(data: any) {
        this.email = data.email || '';
        this.id = data.id || 0;
        this.lastName = data.lastName || '';
        this.city = data.city || '';
        this.totalScore = data.totalScore || 0;
        this.assignedProfessional = data.assignedProfessional || 0;
        this.name = data.name || '';
        this.user = data.user || {
            id: 0,
            rut: '',
            password: '',
            role: '',
        };
        this.profesional = data.profesional || {
            id: 0,
            name: '',
            lastName: '',
            especiality: '',
        };
        this.userId = data.userId || 0;
    }
}

export class Profesional {
    especiality: string;
    id: number;
    lastName: string;
    maxScore: number;
    minScore: number;
    name: string;
    user: {
        id: number;
        rut: string;
        password: string;
        role: string;
    };
    userId: number;
    data: any;

    constructor(data: any) {
        this.especiality = data.especiality || '';
        this.id = data.id || 0;
        this.lastName = data.lastName || '';
        this.maxScore = data.maxScore || 0;
        this.minScore = data.minScore || 0;
        this.name = data.name || '';
        this.user = data.user || {
            id: 0,
            rut: '',
            password: '',
            role: '',
        };
        this.userId = data.userId || 0;
    }
}


export interface ProfesionalAdd {
    [x: string]: any;
    id: number;
    role: string;
    user_id:number;
    password: string;
    rut: string;
    especiality: string;
    name: string;
    lastName: string;
    minScore: number;
    maxScore: number;
}

