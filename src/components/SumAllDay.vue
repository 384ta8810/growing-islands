<template>
  <div :key="componentKey" class="sumAllDay">
    <ApolloQuery
      :query="
        (gql) => gql`
          query MyQuery {
            evaluate_aggregate {
              aggregate {
                count
              }
            }
          }
        `
      "
      :pollInterval="2000"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">ローディング ...</div>
        <div v-else-if="error">404</div>
        <div v-if="data">
          <p class="sum">
            <span>今までのプレゼン回数</span>
            <span>{{ data.evaluate_aggregate.aggregate.count }}</span>
            <span>回</span>
          </p>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "SumAllDay",
  mounted() {
    this.forceRerender();
  },
  data() {
    return {
      componentKey: 0,
      group: this.$store.getters.getIsland,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.sum {
  padding: 1.8rem 0;
  text-align: center;
  span {
    font-size: 1.8rem;
    &:nth-of-type(2) {
      font-size: 3rem;
      padding: 1.4rem;
    }
  }
}
</style>
