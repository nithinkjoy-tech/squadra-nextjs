import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// class APIClient {
//   endpoint;
//   constructor(endpoint) {
//     this.endpoint = endpoint;
//   }

//   get = (params) => {
//     console.log(this.endpoint,"ep");
//     return axiosInstance
//       .get(this.endpoint+params)
//       .then(res => res.data);
//   };

//   post = data => {
//     return axiosInstance
//       .post(this.endpoint, data)
//       .then(res => res.data);
//   };

//   put = data => {
//     return axiosInstance
//       .put(this.endpoint, data)
//       .then(res => res.data);
//   };
// }

// export default APIClient;
