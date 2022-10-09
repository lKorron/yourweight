<template>
  <div>graph</div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();

const periodMap = computed(() => store.getters["periodDataModule/getPeriod"]);

console.log(periodMap);
</script>

<style lang="scss" scoped></style>
