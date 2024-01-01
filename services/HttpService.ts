import axios from "axios";

export default class HttpService {
  constructor() {}

  get(url: string) {
    return axios.get(url);
  }
}
