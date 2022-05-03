<template>
  <table>
    <colgroup>
      <col
        v-for="item in tableHeader"
        :class="`${item.id}_col`"
        :key="`${item.id}_col`"
      />
    </colgroup>

    <thead>
      <tr>
        <th
          v-for="item in tableHeader"
          :id="`${item.id}`"
          :key="`${item.id}_header`"
          @click="sortTable"
        >
          <div class="table_header__content">
            <p>{{ item.field }}</p>
            <img
              class="sorting_pointer"
              :class="sortField === item.id && sortOrder"
              src="../assets/pointer.svg"
              alt="#"
            />
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="index in tableRange" :key="pageItems[index - 1]?.id">
        <td class="row_id">{{ pageItems[index - 1]?.id }}</td>
        <td class="row_title">{{ pageItems[index - 1]?.title }}</td>
        <td class="row_body">{{ pageItems[index - 1]?.body }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const tableHeader = [
  { id: "id", field: "ID" },
  { id: "title", field: "Заголовок" },
  { id: "body", field: "Описание" },
];

const currentPage = computed(() => Number(route.params.id) || 1);
const tableData = computed(() => store.getters.getData);
const tableRange = computed(() => store.getters.getTableRange);
const sortField = computed(() => store.getters.getCurrentSortField);
const sortOrder = computed(() => store.getters.getSortOrder);

/* Slicing and sorting items for current page */
const pageItems = computed(() => {
  const firstItem = (currentPage.value - 1) * tableRange.value;
  const lastItem = currentPage.value * tableRange.value;

  const dataPack = tableData.value.slice(firstItem, lastItem);

  if (sortOrder.value === "ascend") {
    dataPack.sort((a, b) => (a[sortField.value] > b[sortField.value] ? 1 : -1));
  }

  if (sortOrder.value === "descend") {
    dataPack.sort((a, b) => (a[sortField.value] < b[sortField.value] ? 1 : -1));
  }

  return dataPack;
});

function sortTable(e) {
  store.dispatch("setSort", e.target.id);
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

.id_col {
  width: 115px;
}

.title_col {
  width: 525px;
}

.body_col {
  width: 430px;
}

tr {
  height: 55px;
}

th {
  font-size: 14px;
  color: white;
  background-color: var(--main-dark);
  cursor: pointer;
  vertical-align: middle;
}

.table_header__content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 35px;
  border-bottom: solid 1px transparent;
  pointer-events: none;
}

.table_header__content.sorted {
  border-bottom-color: white;
}

.sorting_pointer {
  width: 15px;
}

.sorting_pointer {
  visibility: hidden;
}

.sorting_pointer.ascend {
  visibility: visible;
}

.sorting_pointer.descend {
  visibility: visible;
  transform: rotate(180deg);
}

td {
  padding: 20px 10px;
  font-size: 13px;
  vertical-align: middle;
  color: var(--main-dark);
  border: solid 1px var(--border-color);
}

.row_id {
  text-align: center;
}
</style>
