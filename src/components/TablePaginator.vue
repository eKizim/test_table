<template>
  <div class="table_paginator">
    <router-link
      :to="`/${currentPage - 1}`"
      class="table_paginator__link"
      :class="currentPage === 1 && 'disabled'"
    >
      Назад
    </router-link>

    <div class="table_paginator__container">
      <router-link
        v-for="index in paginationRange"
        :to="`/${index}`"
        :key="`${index}-item`"
        class="table_paginator__item"
        :class="currentPage === index && 'active'"
      >
        {{ index }}
      </router-link>
    </div>

    <router-link
      :to="`/${currentPage + 1}`"
      class="table_paginator__link"
      :class="currentPage === paginationRange && 'disabled'"
    >
      Вперед
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const currentPage = computed(() => Number(route.params.id) || 1);

/* Computing numbers of pages */
const paginationRange = computed(() => {
  const dataLength = store.getters.getData.length ? store.getters.getData.length : 1;
  return Math.ceil(dataLength / store.getters.getTableRange);
});
</script>

<style scoped>
.table_paginator {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table_paginator__container {
  display: flex;
  gap: 20px;
}

.table_paginator__item {
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
  color: var(--main-dark);
  text-decoration: none;
  transition: 0.1s;
  cursor: pointer;
}

.table_paginator__item.active {
  pointer-events: none;
  color: var(--active-color);
}

.table_paginator__item:hover {
  color: var(--active-color);
}

.table_paginator__link {
  font-size: 24px;
  border: none;
  color: var(--main-dark);
  background-color: transparent;
  text-decoration: none;
  transition: 0.1s;
}

.table_paginator__link.disabled {
  pointer-events: none;
  color: gray;
}

.table_paginator__link:hover {
  color: var(--active-color);
}
</style>
