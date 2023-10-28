import { Response } from "../types";
import { AuthenticatedService } from "../auth/AuthenticatedServices";
import { Profesional, Patient, ProfesionalAdd, patientOne} from "./types";
import { userRegister } from "../auth/types";
import { getResponse, keysToSnake } from "../utils";
import { getEnvConfig } from "@/configs/UrlConfig";

export class UserService extends AuthenticatedService {

    async getProfesional(): Promise<Response<Profesional>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/all_profesional`
        return getResponse(url, this.token)
    }
    

    async getOneUser(userId: Number): Promise<Response<patientOne>> {
        const params = {
            id : userId
        }
        const url = `${getEnvConfig().apiURL}/api/v1/auth/one`
        return getResponse(url, this.token, 'POST', params)
    }

    async getPatient(): Promise<Response<Patient>> {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/all_patients`
        return getResponse(url, this.token)
    }

    async addProfesional(profesionalAdd: ProfesionalAdd) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/register`
        return getResponse(url, this.token, "POST", keysToSnake(profesionalAdd))

    }

    async addPatient(profesionalAdd: userRegister) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/register`
        return getResponse(url, undefined, "POST", keysToSnake(profesionalAdd))

    }

    async updateProfesional(profesionalAdd: ProfesionalAdd) {
        const id = profesionalAdd.id
        const url = `${getEnvConfig().apiURL}/api/v1/auth/update/${id}`;
        return getResponse(url, this.token, "PUT", keysToSnake(profesionalAdd));
    }

    async deleteProfesional(profesionalId: Number) {
        const url = `${getEnvConfig().apiURL}/api/v1/auth/delete/${profesionalId}`
        return getResponse(url, this.token, "DELETE")

    }


    async getUserOption(patentsId: Number): Promise<Response<Patient>> {
        const params = {
            id: patentsId
        }
        const url = `${getEnvConfig().apiURL}/api/v1/auth/one_option_patient`
        return getResponse(url, this.token, "POST", params)
    }
}