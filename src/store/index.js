import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    island: "",
    loading: false,
    topCount: "",
  },
  mutations: {
    island(state, payload) {
      state.island = payload.group;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    topCount(state, payload) {
      state.topCount = payload.topId;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getIsland: (state) => {
      return state.island;
    },
    getTopCount: (state) => {
      return state.topCount;
    },
  },
  plugins: [createPersistedState()],
});
