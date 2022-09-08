import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({ 
  baseURL: "https://api.rusa.no",
  headers: {
    "Content-type": "application/json"
  }
})

export default apiClient;
