import { createStore } from "vuex";
import fetchData from "../api/fetchData";

const store = createStore({
  state() {
    return {
      data: [],
      currentRange: 10,
      filter: "",
      sortField: "id",
      sortOrder: "ascend",
    };
  },

  getters: {
    getData(state) {
      const data = state.data.filter(
        (item) =>
          item.id === Number(state.filter) ||
          item.title.includes(state.filter) ||
          item.body.includes(state.filter)
      );

      return data;
    },

    getTableRange(state) {
      return state.currentRange;
    },

    getCurrentSortField(state) {
      return state.sortField;
    },

    getSortOrder(state) {
      return state.sortOrder;
    },
  },

  mutations: {
    SETUP_DATA(state, payload) {
      state.data = payload;
    },

    SET_FILTER(state, payload) {
      state.filter = payload;
    },

    SET_SORT_FIELD(state, payload) {
      state.sortField = payload;
    },

    SET_SORT_ORDER(state, payload) {
      state.sortOrder = payload;
    },
  },

  actions: {
    async setupData({ commit }) {
      const data = await fetchData();
      commit("SETUP_DATA", data);
    },

    setFilter({ commit }, payload) {
      commit("SET_FILTER", payload);
    },

    setSort({ state, commit }, payload) {
      if (state.sortField === payload) {
        const toggleOrder = state.sortOrder === "ascend" ? "descend" : "ascend";
        commit("SET_SORT_ORDER", toggleOrder);
      } else {
        commit("SET_SORT_FIELD", payload);
        commit("SET_SORT_ORDER", "ascend");
      }
    },
  },
});

export default store;
