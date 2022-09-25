<template>calculated</template>

<script setup>
import { defineProps, computed, ref, toRefs } from "vue";
const props = defineProps({
  height: Number,
  weight: Number,
  targetWeight: Number,
  coeff: Number,
  sex: String,
});

const { height, weight, targetWeight, coeff, sex } = toRefs(props);

console.log(
  height.value,
  weight.value,
  targetWeight.value,
  coeff.value,
  sex.value
);
</script>

<style lang="scss"></style>
