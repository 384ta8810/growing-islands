<template>
  <div :key="componentKey" class="sumDay">
    <ApolloQuery
      :query="
        (gql) => gql`
          query MyQuery($date: date) {
            evaluate_aggregate(where: { created_at: { _eq: $date } }) {
              aggregate {
                count
              }
            }
          }
        `
      "
      :pollInterval="2000"
      :variables="{
        date,
      }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">ローディング ...</div>
        <div v-else-if="error">404</div>
        <div v-if="data">
          <p class="sum">
            <span>本日のプレゼン回数</span>
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
  name: "SumDay",
  mounted() {
    this.forceRerender();
  },
  data() {
    return {
      componentKey: 0,
      group: this.$store.getters.getIsland,
      date:
        this.zeroPadding(new Date().getFullYear(), 4) +
        "-" +
        this.zeroPadding(new Date().getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(new Date().getDate(), 2),
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    zeroPadding(num, len) {
      let zero = "";
      for (let i = 0; i < len; i++) {
        zero += "0";
      }
      return (zero + num).slice(-len);
    },
  },
};
</script>

<style lang="scss" scoped>
.sum {
  padding: 0 0 1.8rem 0;
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
