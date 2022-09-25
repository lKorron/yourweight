<template>
  <div class="user-input">
    <Form @submit="onSubmit">
      <div class="user-input__number-group">
        <div class="user-input__height">
          <div class="user-input__number">
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
        </div>

        <div class="user-input__weight">
          <div class="user-input__number">
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
        </div>

        <div class="user-input__age">
          <div class="user-input__number">
            <label for="age">Ваш возраст</label>
            <Field
              v-model="age"
              type="text"
              id="age"
              name="age"
              rules="number"
            />
            {{ ageUnit }}
          </div>
          <ErrorMessage name="age" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
        </div>
      </div>

      <div class="user-input__coeff coeff">
        <label for="">Выберете коэффициент активности:</label>
        <Field v-model="coeff" name="coeff" as="select"
          ><option value="1.2">Минимальный уровень активности — 1.2</option>
          <option value="1.375">Низкий уровень активности — 1.375</option>
          <option value="1.55" selected>
            Средний уровень активности — 1.55
          </option>
          <option value="1.725">Высокий уровень — 1.725</option>
          <option value="1.9">Очень высокий — 1.9</option></Field
        >
      </div>

      <div class="user-input__sex sex">
        <div class="sex__name">Пол</div>
        <Field
          v-model="sex"
          type="radio"
          name="sex"
          id="male"
          value="male"
          rules="sex"
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

        <ErrorMessage name="sex" v-slot="{ message }">
          <div class="error-message">{{ message }}</div>
        </ErrorMessage>
      </div>

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
import { ref, defineEmits, watch } from "vue";
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
const age = ref("");
const coeff = ref(1.2);
const sex = ref("");

const ageUnit = ref("лет");
watch(age, () => {
  const parsedAge = parseInt(age.value);

  if (isNaN(parsedAge)) {
    return;
  }

  const firstDigit = Number(String(parsedAge)[0]);
  const lastDigit = Number(String(parsedAge).slice(-1));

  if (firstDigit != 1 && lastDigit === 1) {
    ageUnit.value = "год";
  } else if (firstDigit != 1 && lastDigit > 1 && lastDigit < 5) {
    ageUnit.value = "года";
  } else {
    ageUnit.value = "лет";
  }
});

function onSubmit(values) {
  const parsedHeight = parseInt(height.value);
  const parsedWeight = parseInt(weight.value);
  const parsedAge = parseInt(age.value);
  const parsedCoeff = parseFloat(coeff.value);

  const userInfo = {
    height: parsedHeight,
    weight: parsedWeight,
    age: parsedAge,
    coeff: parsedCoeff,
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

  &__number-group {
    > :not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__number {
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

  &__coeff {
    margin-top: 15px;
  }

  &__sex {
    margin-top: 15px;
  }
}
</style>
