<template>
  <div class="toJob" @click="toJob()">
    <div class="islands">
      <div v-for="(item, index) in islandData.islands.job" :key="index">
        <img
          :src="require('../assets/images/island_' + item.name + '.svg')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";

export default {
  name: "toJob",
  data() {
    return {
      islandData,
    };
  },
  methods: {
    toJob() {
      this.$router.push({ path: "/job" });
    },
  },
};
</script>

<style lang="scss" scoped>
.toJob {
  position: absolute;
  top: 2rem;
  left: 2rem;
  width: 14vw;
  background: url(../assets/images/toTop.svg) no-repeat center;
  cursor: pointer;
  .islands {
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;
    z-index: 3;
    div {
      display: flex;
      align-items: flex-end;
      position: relative;
      img {
        display: block;
        width: 100%;
        z-index: 2;
        position: relative;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      &:nth-of-type(1) {
        grid-area: 1/2;
        top: 40%;
      }
      &:nth-of-type(2) {
        grid-area: 2/1;
      }
      &:nth-of-type(3) {
        grid-area: 2/3;
      }
      &:nth-of-type(4) {
        grid-area: 3/2;
        bottom: 40%;
      }
    }
  }
}
</style>
