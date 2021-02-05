<template>
  <div id="bg" class="bg">
    <Clock />
    <Cloud />
    <Star />

    <div class="arrows">
      <router-link to="/" class="arrow -left">
        <img src="../assets/images/island_arrow-left.svg" alt="" />
        <div class="shadow"></div>
      </router-link>
      <button class="arrow -right">
        <img src="../assets/images/island_arrow-right.svg" alt="" />
        <div class="shadow"></div>
      </button>
    </div>

    <div class="islands">
      <button
        v-for="(item, index) in islandData.islands.job"
        :key="index"
        @click="selectIsland(`${item.name}`)"
      >
        <img
          :src="require('../assets/images/island_' + item.name + '.svg')"
          alt=""
        />
        <div class="shadow"></div>
      </button>
    </div>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";
import Clock from "../components/Clock.vue";
import Cloud from "../components/Cloud.vue";
import Star from "../components/Star.vue";

export default {
  name: "Job",
  components: {
    Clock,
    Cloud,
    Star,
  },
  data() {
    return {
      islandData,
    };
  },
  mounted() {
    // time - set : bg & clockImg
    const bgEl = document.getElementById("bg");
    let currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 15) {
      bgEl.classList.add("-noon");
    } else if (currentTime >= 15 && currentTime < 18) {
      bgEl.classList.add("-evening");
    } else {
      bgEl.classList.add("-night");
    }
  },
  methods: {
    selectIsland(group) {
      this.$store.commit("island", { group });
      console.log(group);
      this.$router.push({ path: "/jobData" });
    },
    // method - sound
    playSound(sound) {
      if (sound) {
        const audio = new Audio(sound);
        audio.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/setting.scss";

.islands {
  width: 66vw;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  transition: all 0.4s ease-in-out;
  position: relative;
  z-index: 3;
  button {
    height: calc((100vh - 100px) / 5);
    display: flex;
    align-items: flex-end;
    position: relative;
    transition: all 0.4s;
    &:hover {
      transform: scale(1.3);
      transition: all 0.4s;
    }
    img {
      display: block;
      width: 100%;
      animation: float 1.5s linear infinite alternate;
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
    }
  }
}

.shadow {
  width: 9em;
  height: 9em;
  background: #3676bd;
  opacity: 0.2;
  position: absolute;
  top: 42%;
  left: 50%;
  margin: 0 auto;
  animation: grow 1.5s linear infinite alternate;
  transform-origin: center center;
}
</style>
