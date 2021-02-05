<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <router-view />
  </div>
</template>

<script>
import noon from "@/assets/sounds/bgm_noon.mp3";
import evening from "@/assets/sounds/bgm_evening.mp3";
import night from "@/assets/sounds/bgm_night.mp3";

export default {
  name: "app",
  data() {
    return {
      noon,
      evening,
      night,
      bgm: this.noon,
    };
  },
  mounted() {
    // bgm
    let currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 15) {
      this.bgm = this.noon;
    } else if (currentTime >= 15 && currentTime < 18) {
      this.bgm = this.evening;
    } else {
      this.bgm = this.night;
    }
    this.playSound(this.bgm);
  },
  methods: {
    // method - sound
    playSound(sound) {
      if (sound) {
        const audio = new Audio(sound);
        const audioPromise = audio.play();
        if (audioPromise !== undefined) {
          audioPromise
            .then(() => {
              audio.play();
              audio.loop = true;
            })
            .catch(() => {});
        }
      }
    },
  },
};
</script>
<style></style>
