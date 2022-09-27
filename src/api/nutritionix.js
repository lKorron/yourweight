export default function (axiosInstance) {
  return {
    search(query) {
      return axiosInstance
        .get("search/instant", {
          params: {
            query,
            branded: false,
          },
        })
        .catch((error) => console.log(error));
    },
    nutriens(query) {
      return axiosInstance
        .post(
          "natural/nutrients",
          { query },
          {
            headers: {
              "x-remote-user-id": "0",
            },
          }
        )
        .catch((error) => console.log(error));
    },
  };
}
