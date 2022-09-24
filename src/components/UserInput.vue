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
          :rules="{ between: { min: 1, max: 500 } }"
        />
        см
      </div>
      <ErrorMessage name="height" v-slot="{ message }">
        <span class="error-message">{{ message }}</span>
      </ErrorMessage>
      <div class="user-input__weight">
        <label for="weight">Ваш вес</label>
        <Field v-model="weight" type="text" id="weight" name="weight" />
        кг
      </div>

      <div class="user-input__sex sex">
        <div class="sex__name">Пол</div>
        <Field v-model="sex" type="radio" name="sex" id="male" value="male" />
        <label for="male">Мужской</label>

        <Field
          v-model="sex"
          type="radio"
          name="sex"
          id="female"
          value="female"
        />
        <label for="female">Женский</label>
      </div>
      <div>Ввдеите числовые значения</div>
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
import { digits } from "@vee-validate/rules";

defineRule("digits", digits);

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

const reset = (message) => {
  alert(message);
  height.value = "";
  weight.value = "";
};

function onSubmit(values) {
  if (Object.values(values).includes("")) {
    alert("Заполните все поля!");
    return;
  }
}

// const submit = (evt) => {
//   evt.preventDefault();

//   if (
//     height.value.trim() === "" ||
//     weight.value.trim() === "" ||
//     sex.value.trim() === ""
//   ) {
//     reset("Заполните все пропуски");
//     return;
//   }

//   const parsedHeight = parseInt(height.value);
//   const parsedWeight = parseInt(weight.value);

//   if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
//     reset("Введите числа");
//     return;
//   }

//   const userInfo = {
//     height: parsedHeight,
//     weight: parsedWeight,
//     sex: sex.value,
//   };

//   // Object.entries(userInfo).forEach(([key, value]) => {
//   //   if (value === "") {
//   //     alert("Заполните все пропуски");
//   //     height.value = "";
//   //     weight.value = "";
//   //     sex.value = "";
//   //     return;
//   //   }
//   // });

//   emit("submit", userInfo);
// };
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
