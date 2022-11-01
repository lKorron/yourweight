<template>
  <content-panel back-button class="top-panel">
    <template #header>Обновить вес</template>
    <template #default> <weight-input></weight-input> </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "@/components/ContentPanel.vue";
import WeightInput from "@/components/WeightInput.vue";
</script>

<style lang="scss" scoped>
@import "../styles/_classes.scss";
</style>
