<template>
  <div class="bg02">
    <div id="clouds" class="clouds">
      <div class="cloud -type02">
        <img src="../assets/images/bg_cloud_02.svg" alt="" />
      </div>
      <div class="cloud -type03">
        <img src="../assets/images/bg_cloud_03.svg" alt="" />
      </div>
      <div class="cloud -type04">
        <img src="../assets/images/bg_cloud_01.svg" alt="" />
      </div>
      <div class="cloud -type05">
        <img src="../assets/images/bg_cloud_04.svg" alt="" />
      </div>
      <div class="cloud -type06">
        <img src="../assets/images/bg_cloud_02.svg" alt="" />
      </div>
    </div>

    <div id="stars" class="stars">
      <div v-for="n of 4" :key="`small${n}`" class="star -small">
        <img src="../assets/images/bg_star.svg" alt="" />
      </div>
      <div v-for="n of 9" :key="`normal${n}`" class="star -normal">
        <img src="../assets/images/bg_star.svg" alt="" />
      </div>
      <div v-for="n of 1" :key="`large${n}`" class="star -large">
        <img src="../assets/images/bg_star.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bg02",
  mounted() {
    let currentTime = new Date().getHours();
    const cloudsEl = document.getElementById("clouds");
    const starsEl = document.getElementById("stars");
    if (
      (currentTime >= 18 && currentTime < 24) ||
      (currentTime >= 0 && currentTime < 6)
    ) {
      cloudsEl.style.display = "none";
    }
    if (currentTime >= 6 && currentTime < 18) {
      starsEl.style.display = "none";
    }
  },
};
</script>

<style lang="scss" scoped>
.clouds {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  .cloud {
    position: absolute;
    img {
      width: 60%;
    }
    &.-type02 {
      bottom: 12%;
      right: 2%;
      img {
        width: 36%;
      }
    }
    &.-type03 {
      top: 12%;
      left: 8%;
    }
    &.-type04 {
      bottom: 6%;
      left: 10%;
    }
    &.-type05 {
      top: 26%;
      right: 10%;
    }
    &.-type06 {
      top: 12%;
      left: 22%;
    }
  }
}

.stars {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
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
      top: 24%;
      right: 26%;
    }
    &:nth-of-type(4) {
      top: 40%;
      right: 10%;
    }
    &:nth-of-type(5) {
      bottom: 34%;
      left: 4%;
    }
    &:nth-of-type(6) {
      top: 44%;
      left: 14%;
    }
    &:nth-of-type(7) {
      top: 2%;
      left: 12%;
    }
    &:nth-of-type(8) {
      top: 24%;
      left: 26%;
    }
    &:nth-of-type(9) {
      top: 10%;
      left: 40%;
    }
    &:nth-of-type(10) {
      top: 3%;
      right: 48%;
    }
    &:nth-of-type(11) {
      bottom: 4%;
      right: 40%;
    }
    &:nth-of-type(12) {
      top: 8%;
      right: 24%;
    }
    &:nth-of-type(13) {
      top: 34%;
      right: 8%;
    }
    &:nth-of-type(14) {
      bottom: 10%;
      right: 10%;
    }
  }
}
</style>
