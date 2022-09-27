import axiosInstance from "./axiosInstance";
import nutritionixModule from "./nutritionix";

export default {
  nutritionix: nutritionixModule(axiosInstance),
};
