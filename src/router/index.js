import { createRouter, createWebHashHistory } from "vue-router";
import TableView from "../views/TableView.vue";

const routes = [
  { path: "/", component: TableView },
  { path: "/:id", component: TableView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
