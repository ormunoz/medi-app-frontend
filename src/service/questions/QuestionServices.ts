import { Response } from "../types";
import { AuthenticatedService } from "../auth/AuthenticatedServices";
import { QuestionOption } from "./types";
import { getResponse, keysToSnake } from "../utils";
import { getEnvConfig } from "@/configs/UrlConfig";

export class QuestionService extends AuthenticatedService {

    async getQuestion(): Promise<Response<QuestionOption>> {
        const url = `${getEnvConfig().apiURL}/api/v1/question/all`
        return getResponse(url, this.token)
    }

    async questioAdd(question: String, indice: any) {
        const dataToSend = {
            indice: parseInt(indice),
            question,
        };
        const url = `${getEnvConfig().apiURL}/api/v1/question/register_question`
        return getResponse(url, this.token, "POST", dataToSend)
    }

    async optionAdd(score: any, text: string, indice: string, questionId:any) {
        const dataToSend = {
            indice: parseInt(indice),
            text,
            score: parseInt(score),
            question_id: parseInt(questionId)
        };
        const url = `${getEnvConfig().apiURL}/api/v1/question/register_option`;
        return getResponse(url, this.token, "POST", dataToSend);
    }


    async questioUpdate(id: Number, question: String, indice: any) {
        const dataToSend = {
            indice: parseInt(indice),
            question,
        };
        const url = `${getEnvConfig().apiURL}/api/v1/question/update_question/${id}`
        return getResponse(url, this.token, "PUT", dataToSend)
    }

    async optionUpdate(id: Number, score: any, text: string, indice: any) {
        const dataToSend = {
            indice: parseInt(indice),
            text,
            score: parseInt(score)
        };
        const url = `${getEnvConfig().apiURL}/api/v1/question/update_option/${id}`;
        return getResponse(url, this.token, "PUT", dataToSend);
    }

    async questionDelete(id: Number) {
        const url = `${getEnvConfig().apiURL}/api/v1/question/delete_question/${id}`;
        return getResponse(url, this.token, "DELETE", );
    }

    async optionDelete(id: Number) {
        const url = `${getEnvConfig().apiURL}/api/v1/question/delete_option/${id}`;
        return getResponse(url, this.token, "DELETE", );
    }

}