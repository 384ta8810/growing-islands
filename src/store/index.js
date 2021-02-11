import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    island: "",
    loading: false,
    ranking: [],
  },
  mutations: {
    island(state, payload) {
      state.island = payload.group;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    ranking(state, payload) {
      state.ranking = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getIsland: (state) => {
      return state.island;
    },
    getRanking: (state) => {
      return state.ranking;
    },
  },
  plugins: [createPersistedState()],
});
