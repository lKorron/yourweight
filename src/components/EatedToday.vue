<template>Я сегодня съел много чего</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  getData();
});

function getData() {
  const axios = require("axios");

  const options = {
    method: "GET",
    params: { branded: false },
    headers: {
      "x-app-id": "39215a73",
      "x-app-key": "d9068fc98b4ecc7ee3fb129aa352da8d",
    },
  };

  const options2 = {
    headers: {
      "content-type": "application/json",
      "x-app-id": "39215a73",
      "x-app-key": "d9068fc98b4ecc7ee3fb129aa352da8d",
      "x-remote-user-id": "0",
    },

    data: {
      query: "egg",
    },
  };

  //   axios
  //     .get(
  //       "https://trackapi.nutritionix.com/v2/search/instant?query=cheese",
  //       options
  //     )
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });

  axios
    .post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query: "egg" },
      {
        headers: {
          "content-type": "application/json",
          "x-app-id": "39215a73",
          "x-app-key": "d9068fc98b4ecc7ee3fb129aa352da8d",
          "x-remote-user-id": "0",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
</script>

<style></style>
