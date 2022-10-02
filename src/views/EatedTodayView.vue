<template>
  <content-panel back-button>
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
</script>

<style></style>
