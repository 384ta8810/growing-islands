<template>
  <div id="stars" class="stars">
    <div v-for="n of 5" :key="`small${n}`" class="star -small">
      <img src="../assets/images/bg_star.svg" alt="" />
    </div>
    <div v-for="n of 12" :key="`normal${n}`" class="star -normal">
      <img src="../assets/images/bg_star.svg" alt="" />
    </div>
    <div v-for="n of 1" :key="`large${n}`" class="star -large">
      <img src="../assets/images/bg_star.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Stars",
  mounted() {
    let currentTime = new Date().getHours();
    const starsEl = document.getElementById("stars");
    if (currentTime >= 0 && currentTime < 18) {
      starsEl.style.display = "none";
    }
  },
};
</script>

<style lang="scss" scoped>
.stars {
  display: none;
  width: 100%;
  height: 100vh;
  position: absolute;
  .star {
    position: absolute;
    &.-small {
      width: 0.6%;
    }
    &.-normal {
      width: 1%;
    }
    &.-large {
      width: 1.4%;
    }
    &:nth-of-type(1) {
      top: 28%;
      left: 6%;
    }
    &:nth-of-type(2) {
      bottom: 22%;
      left: 22%;
    }
    &:nth-of-type(3) {
      top: 50%;
      left: 34%;
    }
    &:nth-of-type(4) {
      top: 24%;
      right: 26%;
    }
    &:nth-of-type(5) {
      top: 40%;
      right: 10%;
    }
    &:nth-of-type(6) {
      bottom: 34%;
      left: 4%;
    }
    &:nth-of-type(7) {
      top: 44%;
      left: 14%;
    }
    &:nth-of-type(8) {
      top: 2%;
      left: 12%;
    }
    &:nth-of-type(9) {
      top: 24%;
      left: 26%;
    }
    &:nth-of-type(10) {
      bottom: 10%;
      left: 30%;
    }
    &:nth-of-type(11) {
      top: 10%;
      left: 40%;
    }
    &:nth-of-type(12) {
      top: 3%;
      right: 48%;
    }
    &:nth-of-type(13) {
      bottom: 4%;
      right: 40%;
    }
    &:nth-of-type(14) {
      top: 50%;
      right: 40%;
    }
    &:nth-of-type(15) {
      bottom: 20%;
      right: 24%;
    }
    &:nth-of-type(16) {
      top: 8%;
      right: 24%;
    }
    &:nth-of-type(17) {
      top: 34%;
      right: 8%;
    }
    &:nth-of-type(18) {
      bottom: 10%;
      right: 10%;
    }
  }
}
</style>
