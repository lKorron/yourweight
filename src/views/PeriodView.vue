<template>
  <content-panel back-button class="top-panel">
    <template #header>Период</template>
    <template #default>
      <div class="period-progress">
        <period-cards></period-cards>
      </div>
    </template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "@/components/ContentPanel.vue";
import PeriodCards from "@/components/PeriodCards.vue";
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/classes";
.period-progress {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: $md1) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $md2) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
