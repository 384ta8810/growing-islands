import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

require("@/assets/css/setting.scss");

// create a provider

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://my-project.hasura.app/v1/graphql",
  }),
});

Vue.use(VueApollo, gql);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  store,
  render: (h) => h(App),
}).$mount("#app");
