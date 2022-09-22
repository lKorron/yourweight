<template>
  <h1>yourweight</h1>
  <async-popup ref="inputPopup">
    <user-input @submit="handleSubmit"></user-input>
  </async-popup>
</template>

<script setup>
import UserInput from "./components/UserInput.vue";
import AsyncPopup from "./components/AsyncPopup.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  openPopup();
});

const inputPopup = ref(null);

const openPopup = async () => {
  const popupResult = await inputPopup.value.open();

  if (popupResult) {
    console.log("resulted");
  }
};

const handleSubmit = (userInfo) => {
  console.log(userInfo);
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  $bg-size: 370px;
  background-color: #fff;
  background-image: url("./assets/background.jpeg");
  background-repeat: repeat;
  background-size: $bg-size;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  cursor: pointer;
}
</style>
