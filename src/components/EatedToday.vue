<template>Я сегодня съел много чего</template>

<script setup>
import { onMounted, inject } from "vue";

const api = inject("api");

onMounted(() => {
  //api.nutritionix.search("milk").then((response) => console.log(response));
  api.nutritionix.nutriens("milk").then((res) => console.log(res));
});
</script>

<style></style>
