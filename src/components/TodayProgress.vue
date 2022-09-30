<template>
  <div class="today-progress">{{ eatedCalories }}</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const eatedCalories = ref(0);
</script>

<style lang="scss"></style>
