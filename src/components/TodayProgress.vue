<template>
  <div class="today-progress">{{ commonCalories }}/{{ targetCalories }}</div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);
const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);
</script>

<style lang="scss"></style>
