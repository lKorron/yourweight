<template>
  <div class="user-input">
    <Form @submit="onSubmit">
      <div class="user-input__height">
        <label for="height">Ваш рост</label>
        <Field
          v-model="height"
          type="text"
          id="height"
          name="height"
          rules="number"
        />
        см
      </div>
      <ErrorMessage name="height" v-slot="{ message }">
        <span class="error-message">{{ message }}</span>
      </ErrorMessage>

      <div class="user-input__weight">
        <label for="weight">Ваш вес</label>
        <Field
          v-model="weight"
          type="text"
          id="weight"
          name="weight"
          rules="number"
        />
        кг
      </div>
      <ErrorMessage name="weight" v-slot="{ message }">
        <span class="error-message">{{ message }}</span>
      </ErrorMessage>

      <div class="user-input__sex sex">
        <div class="sex__name">Пол</div>
        <Field
          v-model="sex"
          type="radio"
          name="sex"
          id="male"
          value="male"
          rules="required"
        />
        <label for="male">Мужской</label>

        <Field
          v-model="sex"
          type="radio"
          name="sex"
          id="female"
          value="female"
          rules="sex"
        />
        <label for="female">Женский</label>
      </div>
      <ErrorMessage name="sex" v-slot="{ message }">
        <div class="error-message">{{ message }}</div>
      </ErrorMessage>
      <button>Готово</button>
    </Form>
  </div>
</template>

<script>
export default {
  name: "UserInput",
};
</script>

<script setup>
import { ref, defineEmits } from "vue";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";

const emit = defineEmits({
  submit: (userInfo) => {
    if (userInfo.height && userInfo.weight && userInfo.sex) {
      return true;
    }
    return false;
  },
});

const height = ref("");
const weight = ref("");
const sex = ref("");

function onSubmit(values) {
  const parsedHeight = parseInt(height.value);
  const parsedWeight = parseInt(weight.value);

  const userInfo = {
    height: parsedHeight,
    weight: parsedWeight,
    sex: sex.value,
  };

  emit("submit", userInfo);
}

defineRule("sex", (value) => {
  if (value) {
    return true;
  }

  return "Выберете ваш пол";
});
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.error-message {
  color: red;
}

.user-input {
  border: 1px solid $mainColor;
  border-radius: 10px;
  padding: 10px;

  form {
    > :first-child {
      margin-bottom: 5px;
    }
  }

  &__height,
  &__weight {
    display: flex;
    justify-content: center;

    :first-child {
      margin-right: 10px;
    }

    input {
      width: 30px;
      margin-right: 10px;
    }
  }

  &__sex {
    margin-top: 30px;
  }
}
</style>
