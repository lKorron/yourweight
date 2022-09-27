export default function (axiosInstance) {
  return {
    search() {
      return axiosInstance
        .get("search/instant?query=cheese")
        .catch((error) => console.log(error));
    },
    getNutriens(payload) {
      return axiosInstance
        .post("natural/nutrients", payload)
        .catch((error) => console.log(error));
    },
  };
}
