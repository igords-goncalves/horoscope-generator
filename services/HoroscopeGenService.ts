import { AxiosResponse } from "axios";
import HttpService from "./HttpService";
import "dotenv/config"

const BASE_API_URL = process.env.BASE_URL || ""

export default class HoroscopeGenService extends HttpService {
  #baseUrl: string;

  constructor() {
    super();
    this.#baseUrl = BASE_API_URL;
  }

  get(endpoint: string): Promise<AxiosResponse<any, any>> {
    const url = [this.#baseUrl, endpoint].join("")
    return super.get(url);
  }
}
