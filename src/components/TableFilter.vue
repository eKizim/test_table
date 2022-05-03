<template>
  <div class="table_filter">
    <input class="table_filter__input" placeholder="Поиск" @input="setFilter" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

function setFilter(e) {
  /* Move to the first page */
  router.push("/");
  store.dispatch("setFilter", e.target.value);
}
</script>

<style scoped>
.table_filter {
  margin-bottom: 15px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

::placeholder {
  opacity: 0.5;
  color: white;
}

.table_filter::after {
  width: 21px;
  height: 21px;
  position: absolute;
  right: 25px;
  content: url("../assets/search.svg");
}

.table_filter__input {
  width: 630px;
  height: 50px;
  padding: 25px 20px;
  display: flex;
  color: white;
  background-color: var(--light-dark);
  border: none;
}
</style>
