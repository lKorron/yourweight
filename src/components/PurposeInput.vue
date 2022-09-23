<template>
  <form @submit="submit" class="purpose-input">
    <label for="weight">Желаемый вес</label>
    <input v-model="weight" type="text" name="weight" /> кг

    <button>ок</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits({
  submit: (value) => typeof value === "string",
});

const weight = ref(null);

const submit = (evt) => {
  evt.preventDefault();

  console.log(weight.value);
  emit("submit", weight.value);
};
</script>

<style></style>
