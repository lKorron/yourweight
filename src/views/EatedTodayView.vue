<template>
  <content-panel backButton @back-button-click="onBackButtonClick">
    <template #header>Что я сегодня съел?</template>
    <template #default>
      <eated-today></eated-today>
    </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import EatedToday from "../components/EatedToday.vue";
import router from "@/router";

const onBackButtonClick = () => {
  router.push({ name: "home" });
};
</script>

<style></style>
