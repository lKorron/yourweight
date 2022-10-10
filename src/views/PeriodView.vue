<template>
  <content-panel back-button>
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
.period-progress {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
}
</style>
