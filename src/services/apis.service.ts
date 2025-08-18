import axios, { Axios } from "axios";

export interface Hook {
  id?: string,
  tipo: "TS" | "TF",
  titulo: string,
  conteudo: string,
  status?: "P" | "L"
}

export class ApiService {
  private readonly axiosInstance: Axios;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async list(filter: any) {
    try {
      const response = await this.axiosInstance.post("/hooks/list", filter);
      return response.data;
    } catch (error) {
      throw new Error(`Error listing data: ${error}`);
    }
  }

  async create(hookData: Hook) {
    try {
      const response = await this.axiosInstance.post("/hooks/create", hookData);
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      throw new Error(`Error creating data: ${error}`);
    }
  }

  async update(hookData: Hook, id: string) {
    try {
      const response = await this.axiosInstance.post(`/hooks/update/${id}`, hookData);
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      throw new Error(`Error updating data: ${error}`);
    }
  }
}