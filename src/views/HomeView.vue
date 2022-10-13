<template>
  <content-panel class="main-progress">
    <template #header>Общий прогресс</template>
    <template #default
      ><current-state
        :weight="userData.weight"
        :targetWeight="userData.targetWeight"
      ></current-state>
      <router-link to="weight" class="main-progress__link button"
        ><img src="../assets/weight-scale.png" alt="weight-scale"
      /></router-link>
    </template>
  </content-panel>

  <content-panel>
    <template #header>Расчет калорий</template>
    <template #default
      ><calculated-calories
        :height="userData.height"
        :weight="userData.weight"
        :age="userData.age"
        :targetWeight="userData.targetWeight"
        :coeff="userData.coeff"
        :sex="userData.sex"
      ></calculated-calories
    ></template>
  </content-panel>

  <div class="double-group">
    <content-panel>
      <template #header>Что я сегодня съел?</template>
      <template #default>
        <router-link class="link" to="eatedToday">
          <div v-if="todayData" class="preview preview_today">
            <period-cards today preview></period-cards>
          </div>
          <div v-else class="link__image image-link">
            <img src="../assets/plus.png" alt="plus" />
          </div>
        </router-link>
      </template>
    </content-panel>
    <content-panel>
      <template #header>Прогресс по датам</template>
      <template #default>
        <router-link class="link" to="period">
          <div v-if="isPreviewAvailable" class="preview preview_period">
            <period-cards cards-count="3" preview></period-cards>
          </div>
          <div v-else class="link__image image-link">
            <img src="../assets/calendar.png" alt="plus" />
          </div>
        </router-link>
      </template>
    </content-panel>
  </div>

  <content-panel>
    <template #header>График</template>
    <template #default><period-graph></period-graph></template>
  </content-panel>
</template>

<script setup>
import ContentPanel from "../components/ContentPanel.vue";
import CurrentState from "../components/CurrentState.vue";
import CalculatedCalories from "../components/CalculatedCalories.vue";
import EatedToday from "../components/EatedToday.vue";

import { useStore } from "vuex";
import { computed } from "vue";
import PeriodGraph from "@/components/PeriodGraph.vue";
import PeriodCards from "@/components/PeriodCards.vue";

const store = useStore();
const userData = computed(() => store.getters["userDataModule/getUserData"]);
const periodData = computed(() => store.getters["periodDataModule/getPeriod"]);
const todayData = computed(
  () => store.getters["periodDataModule/getTodayData"]
);

const isPreviewAvailable = computed(() => periodData.value.size > 0);
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/classes";

.double-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  .content-panel {
    width: 100%;
  }
}

.main-progress {
  position: relative;

  &__link {
    display: block;
    @include sizeImgContainer($size: 35px);
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
  }
}

.preview {
  transition: transform 0.25s;
  &:hover {
    transform: scale(1.03);
  }

  &_today {
    margin: 0 auto;
    max-width: 170px;
  }

  &_period {
    display: grid;
    grid-template-columns: repeat(3, 170px);
    gap: 10px;
  }
}

.link {
  display: inline-block;
  color: inherit;
  text-decoration: none;
}
</style>
