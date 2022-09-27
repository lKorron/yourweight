import { def } from "@vue/shared";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/",
  headers: {
    accept: "application/json",
    "x-app-id": "39215a73",
    "x-app-key": "d9068fc98b4ecc7ee3fb129aa352da8d",
  },
});

export default axiosInstance;
