<template>
  <content-panel>
    <template #header>Что я сегодня съел?</template>
    <template #default>
      <eated-today></eated-today>
    </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import EatedToday from "../components/EatedToday.vue";
</script>

<style></style>
