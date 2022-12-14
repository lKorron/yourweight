<template>
  <Line
    class="graph"
    v-if="isGraphAvailable"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  ></Line>
  <div v-else>Заполните хотя бы два дня, чтобы отобразить график</div>
</template>

<script setup>
import { computed, defineProps, reactive } from "vue";
import { useStore } from "vuex";
import { Line } from "vue-chartjs";
import {
  normalWeightColor,
  purposeWeightColor,
  caloriesColor,
} from "../styles/_export.module.scss";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

const props = defineProps({
  chartId: {
    type: String,
    default: "line-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Object,
    default: () => {},
  },
});

const store = useStore();

const days = computed(() => store.getters["periodDataModule/getDays"]);
const calories = computed(() => store.getters["periodDataModule/getCalories"]);

const commonCalories = computed(
  () => store.getters["caloriesModule/getCommonCalories"]
);

const targetCalories = computed(
  () => store.getters["caloriesModule/getTargetCalories"]
);

const isGraphAvailable = computed(() => {
  return days.value.length >= 2;
});

const createPointLine = (value, pointCount) => {
  const pointArray = [];
  for (let i = 0; i < pointCount; i++) {
    pointArray.push(value);
  }

  return pointArray;
};

const chartData = reactive({
  labels: days.value,
  datasets: [
    {
      label: "Калории для изменения веса",
      backgroundColor: purposeWeightColor,
      borderColor: purposeWeightColor,
      data: createPointLine(targetCalories.value, days.value.length),
    },
    {
      label: "Калории для поддержания веса",
      backgroundColor: normalWeightColor,
      borderColor: normalWeightColor,
      data: createPointLine(commonCalories.value, days.value.length),
    },
    {
      label: "Калории",
      backgroundColor: caloriesColor,
      borderColor: caloriesColor,
      data: calories.value,
    },
  ],
});

const chartOptions = {
  responsive: true,
};
</script>

<style lang="scss" scoped>
.graph {
  margin: 0 auto;
  max-width: 500px;
}
</style>
