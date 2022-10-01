<template>
  <div class="today-progress">
    {{ commonCalories }}/{{ targetCalories }}
    <div class="progress-container">
      <ProgressBar :bgcolor="'#6a1b9a'" :completed="30"></ProgressBar>
      <ProgressBar :bgcolor="'#6a1b9a'" :completed="100"></ProgressBar>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";

import ProgressBar from "./ProgressBar.vue";

const store = useStore();

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);
const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);
</script>

<style lang="scss">
.progress-container {
  margin: 0 auto;
  width: 400px;

  :not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
