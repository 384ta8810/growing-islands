<template>
  <div id="clouds" class="clouds">
    <div
      class="cloud -type01"
      @click.prevent="playSound('../assets/sounds/kousin.mp3')"
    >
      <img src="../assets/images/bg_cloud_01.svg" alt="" />
    </div>
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
</template>

<script>
export default {
  name: "Cloud",
  mounted() {
    let currentTime = new Date().getHours();
    const cloudsEl = document.getElementById("clouds");
    if (
      (currentTime >= 18 && currentTime < 24) ||
      (currentTime >= 0 && currentTime < 6)
    ) {
      cloudsEl.style.display = "none";
    }
  },
};
</script>

<style lang="scss" scoped>
.clouds {
  width: 100%;
  height: 100vh;
  position: absolute;
  .cloud {
    position: absolute;
    animation: float 2.2s linear infinite alternate;
    img {
      width: 100%;
    }
    &.-type01 {
      bottom: 1%;
      right: 20%;
    }
    &.-type02 {
      bottom: 20%;
      left: 80%;
    }
    &.-type03 {
      top: 2%;
      left: 2%;
    }
    &.-type04 {
      bottom: 20%;
      left: 2%;
    }
    &.-type05 {
      top: 6%;
      right: 10%;
    }
    &.-type06 {
      top: 12%;
      left: 12%;
    }
  }
}
</style>
