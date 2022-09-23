<template>
  <form @submit="submit" @keydown.enter="submit" class="purpose-input">
    <div class="purpose-input__label">
      <label for="weight">Введите вес, который хотите получить</label>
    </div>

    <div class="purpose-input__input">
      <input v-model="weight" type="text" name="weight" /> кг
    </div>

    <button>ок</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits({
  submit: (value) => typeof value === "object",
});

const weight = ref(null);

const submit = (evt) => {
  evt.preventDefault();

  const parsedWeight = parseInt(weight.value);

  if (isNaN(parsedWeight)) {
    alert("Введите числовые значения!");
    return;
  }

  const purposeInfo = {
    targetWeight: weight.value,
  };

  emit("submit", purposeInfo);
};
</script>

<style lang="scss">
.purpose-input {
  input {
    width: 30px;
    margin-left: 18px;
  }

  > :not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
