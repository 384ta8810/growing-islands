import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    island: "",
  },
  mutations: {
    island(state, payload) {
      state.island = payload.group;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getIsland: (state) => {
      return state.island;
    },
  },
  plugins: [createPersistedState()],
});
