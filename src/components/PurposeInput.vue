<template>
  <Form @submit="onSubmit" class="purpose-input">
    <div class="purpose-input__label">
      <label for="weight">Введите вес, который хотите получить</label>
    </div>

    <div class="purpose-input__input">
      <Field v-model="weight" type="text" name="weight" rules="number" /> кг
      <ErrorMessage name="weight" v-slot="{ message }">
        <div class="error-message">{{ message }}</div>
      </ErrorMessage>
    </div>

    <button class="button">ок</button>
  </Form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";

const emit = defineEmits({
  submit: (value) => typeof value === "object",
});

const weight = ref(null);

const onSubmit = () => {
  const parsedWeight = parseInt(weight.value);

  const purposeInfo = {
    targetWeight: parsedWeight,
  };

  emit("submit", purposeInfo);
};
</script>

<style lang="scss" scoped>
.purpose-input {
  input {
    width: 30px;
    margin-left: 18px;
  }

  > :not(:last-child) {
    margin-bottom: 10px;
  }
}

.error-message {
  color: red;
}
</style>
