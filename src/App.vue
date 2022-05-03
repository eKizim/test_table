<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("setupData");
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

:root {
  --main-dark: #474955;
  --light-dark: #5a5c66;
  --border-color: #e3e6ec;
  --active-color: #7ebc3c;
}

#app {
  width: 1230px;
  padding: 20px 80px;
  margin: 50px auto;
  box-shadow: 0 0 3px 2px var(--border-color);
}
</style>
