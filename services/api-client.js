import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

class APIClient {
  endpoint

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = (queryString) => {
    return axiosInstance
      .get(this.endpoint+queryString)
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance
      .get(this.endpoint)
      .then((res) => res.data);
  };
}

export default APIClient;