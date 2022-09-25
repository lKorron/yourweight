<template>calculated {{ bmr }}</template>

<script setup>
import { defineProps, computed, ref, toRefs } from "vue";
const props = defineProps({
  height: Number,
  weight: Number,
  age: Number,
  targetWeight: Number,
  coeff: Number,
  sex: String,
});

const { height, weight, age, targetWeight, coeff, sex } = toRefs(props);

const bmr = computed(() => {
  if (Object.values(props).includes(null)) {
    return "-";
  }

  if (sex.value === "male") {
    const result =
      66.5 + 13.75 * weight.value + 5.003 * height.value - 6.775 * age.value;
    return Math.round(result);
  }

  if (sex.value === "female") {
    const result =
      655.1 + 9.563 * weight.value + 1.85 * height.value - 4.676 * age.value;
    return Math.round(result);
  }

  return "-";
});
</script>

<style lang="scss"></style>
