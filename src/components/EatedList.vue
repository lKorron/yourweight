<template>
  <ul v-if="isListActive" class="eated-list">
    <li
      v-for="foodItem in foodList"
      :key="foodItem.name"
      class="eated-list__item item"
    >
      <div class="item__number">
        {{ foodItem.servingCount }}
        <span v-if="!preview">{{ foodItem.servingUnit }}</span>
      </div>

      <div class="item__image">
        <img :src="foodItem.imageUrl" alt="food image" />
      </div>
      <div class="item__name">{{ foodItem.name }}</div>
      <div v-if="!preview" class="item__calories">
        {{ foodItem.calories }} Ккал
      </div>
      <div v-if="!preview" class="item__delete delete">
        <button
          @click="deleteItem(foodItem.name)"
          class="delete__button button"
        >
          <img src="../assets/minus.png" alt="minus" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, computed } from "vue";

const props = defineProps({
  foodList: {
    type: Array,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
  },
});

const isListActive = computed(() => {
  if (!foodList) {
    return false;
  }
  if (foodList.value.length <= 0) {
    return false;
  }
  return true;
});

const emit = defineEmits({
  "delete-item": (value) => typeof value === "string",
});

const { foodList, preview } = toRefs(props);

const deleteItem = (name) => {
  emit("delete-item", name);
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
.eated-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  max-width: 500px;
  margin: 0 auto;

  &__item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid #000;
    }

    :first-child {
      padding-left: 5px;
    }
  }
  .delete {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    &__button {
      @include sizeImgContainer($size: 20px);
      background: none;
      padding: 0;

      img {
        padding: 0;
      }
    }
  }
}

.item {
  &__image {
    padding: 5px;
    height: 50px;
    img {
      height: 50px;
    }

    @media (max-width: $md3) {
      padding-left: 0;
      padding-right: 0;

      height: 30px;
      img {
        height: 30px;
      }
    }
  }

  &__name {
    font-size: 14px;
  }

  :last-child {
    padding-right: 5px;
  }
}
</style>
