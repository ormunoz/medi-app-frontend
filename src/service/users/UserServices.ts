import { Response } from "../types";
import { AuthenticatedService } from "../auth/AuthenticatedServices";
import { Profesional, Patient, ProfesionalAdd, patientOne } from "./types";
import { userRegister } from "../auth/types";
import { getResponse, keysToSnake } from "../utils";
import { getEnvConfig } from "@/configs/UrlConfig";

export class UserService extends AuthenticatedService {

    // Get a list of professionals (users with the role 'PROFESSIONAL')
    async getProfesional(): Promise<Response<Profesional>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/all_profesional`;
        return getResponse(url, this.token);
    }
    
    // Get information for a specific user by their ID
    async getOneUser(userId: Number) {
        const params = {
            id: userId
        };
        const url = `${getEnvConfig().apiURL}/api/v1/auth/one`;
        return getResponse(url, this.token, 'POST', params);
    }

    // Get a list of patients (users with the role 'PATIENT')
    async getPatient(): Promise<Response<Patient>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/all_patients`;
        return getResponse(url, this.token);
    }

    // Add a new professional to the system
    async addProfesional(profesionalAdd: ProfesionalAdd) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/register`;
        return getResponse(url, this.token, "POST", keysToSnake(profesionalAdd));
    }

    // Add a new patient to the system
    async addPatient(profesionalAdd: userRegister) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/register`;
        return getResponse(url, undefined, "POST", keysToSnake(profesionalAdd));
    }

    // Update an existing professional's information
    async updateProfesional(profesionalAdd: ProfesionalAdd) {
        const id = profesionalAdd.id;
        const url = `${getEnvConfig().apiURL}/api/v1/auth/update/${id}`;
        return getResponse(url, this.token, "PUT", keysToSnake(profesionalAdd));
    }

    // Delete a professional from the system
    async deleteProfesional(profesionalId: Number) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/delete/${profesionalId}`;
        return getResponse(url, this.token, "DELETE");
    }

    // Get options for a specific patient by their ID
    async getUserOption(patentsId: Number): Promise<Response<Patient>> {
        const params = {
            id: patentsId
        };
        const url = `${getEnvConfig().apiURL}/api/v1/auth/one_option_patient`;
        return getResponse(url, this.token, "POST", params);
    }
}
