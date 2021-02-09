<template>
  <div class="toHome" @click="toHome()">
    <div class="islands">
      <div v-for="(item, index) in islandData.islands.home" :key="index">
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
  name: "toHome",
  data() {
    return {
      islandData,
    };
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.toHome {
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
        grid-area: 1/3;
        top: 50%;
      }
      &:nth-of-type(2) {
        grid-area: 2/2;
      }
      &:nth-of-type(3) {
        grid-area: 2/4;
      }
      &:nth-of-type(4) {
        grid-area: 3/1;
      }
      &:nth-of-type(5) {
        grid-area: 3/3;
      }
      &:nth-of-type(6) {
        grid-area: 3/5;
      }
      &:nth-of-type(7) {
        grid-area: 4/2;
      }
      &:nth-of-type(8) {
        grid-area: 4/4;
      }
      &:nth-of-type(9) {
        grid-area: 5/3;
        bottom: 20%;
      }
    }
  }
}
</style>
