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

  post = (body) => {
    return axiosInstance
      .post(this.endpoint,body)
      .then((res) => res.data);
  };

  put = (id,body) => {
    return axiosInstance
      .put(`${this.endpoint}/${id}`,body)
      .then((res) => res.data);
  };
}

export default APIClient;