import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500",
});

class APIClient {
  endpoint;
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get = () => {
    console.log(this.endpoint);
    return axiosInstance
      .get(this.endpoint)
      .then(res => res.data);
  };

  post = data => {
    return axiosInstance
      .post(this.endpoint, data)
      .then(res => res.data);
  };

  put = data => {
    return axiosInstance
      .put(this.endpoint, data)
      .then(res => res.data);
  };
}

export default APIClient;
