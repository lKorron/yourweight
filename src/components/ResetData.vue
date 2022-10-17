<template>
  <Form @submit="onSubmit" v-slot="{ meta }" class="reset-form">
    <label for="reset-input"
      >Чтобы сбросить данные, введите: "Сбросить данные"</label
    >
    <Field
      id="reset-input"
      type="input"
      name="reset-input"
      rules="danger:Сбросить данные"
    ></Field>
    <Field
      type="submit"
      name="button"
      value="Сбросить"
      class="reset-form__button button"
      :disabled="!meta.valid"
    ></Field>
    <ErrorMessage name="reset-input" v-slot="{ message }"
      ><div class="error-message">{{ message }}</div></ErrorMessage
    >
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = () => {
  localStorage.clear();
  router.go();
};

defineRule("danger", (value, [sentance]) => {
  if (value !== sentance) {
    return "Значения должны совпадать";
  }

  return true;
});
</script>

<style lang="scss" scoped>
.reset-form {
  &__button {
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }

  label {
    display: block;
  }

  > :not(:last-child) {
    margin-bottom: 20px;
  }
}

.error-message {
  color: red;
}
</style>
