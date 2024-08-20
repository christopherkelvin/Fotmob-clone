import axios from "axios";
import { QueryClient } from "react-query";
const apiClient = axios.create({
  baseURL: "http://localhost:5173/",
});
const queryClient = new QueryClient();

export { apiClient, queryClient };