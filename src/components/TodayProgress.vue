<template>
  <div class="today-progress">{{ eatedCalories }}</div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const eatedCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);
</script>

<style lang="scss"></style>
