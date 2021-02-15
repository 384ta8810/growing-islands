<template>
  <div id="news" class="news">
    <ApolloQuery
      :query="
        (gql) => gql`
          query MyQuery {
            evaluate(order_by: { id: desc }, limit: 1) {
              comment
              created_at
              booth_number
              evaluation {
                student_name
              }
            }
          }
        `
      "
      :pollInterval="200000"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">ローディング ...</div>
        <div v-else-if="error">404</div>
        <div v-if="data" class="block-news">
          <SumAllDay />
          <SumDay />
          <p class="label">news</p>
          <p v-if="data.evaluate.length === 0" class="text">
            制作展が始まりました！！！！！
          </p>
          <div v-for="item in data.evaluate" :key="item.id">
            <p class="text">
              たった今、{{ item.evaluation.student_name }}さんが応援されました！
            </p>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import SumAllDay from "../components/SumAllDay.vue";
import SumDay from "../components/SumDay.vue";

export default {
  components: {
    SumAllDay,
    SumDay,
  },
};
</script>

<style lang="scss" scoped>
.news {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 2%;
  background: url(../assets/images/news_board.svg) no-repeat center center;
  padding: 4rem 5.4rem;
  &::before {
    content: "";
    background: url(../assets/images/news_rope.svg) no-repeat center;
    position: absolute;
    z-index: 2;
    top: -5.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 10rem;
  }
}

.label {
  display: inline-block;
  color: #fff;
  font-size: 1.5rem;
  background: #d35555;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  margin: 0 0 1rem 0;
}

.text {
  font-size: 1.4rem;
  padding: 0 0 2.6rem 0;
}
</style>
