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
    user_id: number;
    password: string;
    rut: string;
    especiality: string;
    name: string;
    lastName: string;
    minScore: number;
    maxScore: number;
}


export class PatientOption {
    id: number;
    patients_id: number;
    option_id: number;
    patients: {
        id: number;
        email: string;
        city: string;
        last_name: string;
        name: string;
        total_score: number;
        user_id: number;
        assigned_professional: number;
    };
    option: {
        id: number;
        text: string;
        score: number;
        indice: number;
        question_id: number;
        questions: {
            id: number;
            indice: number;
            question: string;
        };
    }[];

    constructor(
        id: number,
        patients_id: number,
        option_id: number,
        patients: {
            id: number;
            email: string;
            city: string;
            last_name: string;
            name: string;
            total_score: number;
            user_id: number;
            assigned_professional: number;
        },
        option: {
            id: number;
            text: string;
            score: number;
            indice: number;
            question_id: number;
            questions: {
                id: number;
                indice: number;
                question: string;
            }
        }[]
    ) {
        this.id = id;
        this.patients_id = patients_id;
        this.option_id = option_id;
        this.patients = patients;
        this.option = option;
    }
}




export class patientOne {
    id: number;
    rut: string;
    email: string;
    city: string;
    last_name: string;
    name: string;
    total_score: number;
    assigned_professional: number;
    especiality: string;
    profesional_name: string;
    profesional_last_name: string;
  data: any;

    constructor(
        id: number,
        rut: string,
        patients: {
            email: string,
            city: string,
            last_name: string,
            name: string,
            total_score: number,
            assigned_professional: number,
            profesional: {
                especiality: string;
                name: string;
                last_name: string;
            }
        }
    ) {
        this.id = id;
        this.rut = rut;
        this.email = patients.email;
        this.city = patients.city;
        this.last_name = patients.last_name;
        this.name = patients.name;
        this.total_score = patients.total_score;
        this.assigned_professional = patients.assigned_professional;
        this.especiality = patients.profesional.especiality;
        this.profesional_name = patients.profesional.name;
        this.profesional_last_name = patients.profesional.last_name;
    }
}
