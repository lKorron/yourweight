<template>
  <content-panel back-button>
    <template #header>Период</template>
    <template #default> <period-progress></period-progress> </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "@/components/ContentPanel.vue";
import PeriodProgress from "@/components/PeriodProgress.vue";
</script>

<style></style>
