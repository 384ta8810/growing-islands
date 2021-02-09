<template>
  <div id="bg" class="bg">
    <ApolloQuery
      :query="
        (gql) => gql`
          query MyQuery {
            students(
              order_by: { evaluation_aggregate: { count: desc } }
              limit: 10
            ) {
              student_name
              booth_number
              student_id
              group
              job
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
          <Clock />
          <Bg01 />
          <News />

          <div class="arrows">
            <router-link to="/job" class="arrow -left">
              <img
                v-on:mouseover="playSound(mouseOver)"
                src="../assets/images/island_arrow-left.svg"
                alt=""
              />
              <div class="shadow"></div>
            </router-link>
            <!-- <router-link to="/job" class="arrow -right">
              <img src="../assets/images/island_arrow-right.svg" alt="" />
              <div class="shadow"></div>
            </router-link> -->
          </div>

          <div class="islands">
            <button
              v-for="(item, index) in islandData.islands.home"
              :key="index"
              @click="selectIsland(item.name, data.students[0].student_id)"
            >
              <img
                v-on:mouseover="playSound(mouseOver)"
                :src="require('../assets/images/island_' + item.name + '.svg')"
                alt=""
              />
              <div class="shadow"></div>
            </button>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";
import Clock from "../components/Clock.vue";
import Bg01 from "../components/Bg01.vue";
import News from "../components/News.vue";
import mouseOver from "@/assets/sounds/mouseOver_01.mp3";

export default {
  name: "Home",
  components: {
    Clock,
    Bg01,
    News,
  },
  data() {
    return {
      islandData,
      mouseOver,
    };
  },
  mounted() {
    // time - set : bg
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
    selectIsland(group, topId) {
      this.$store.commit("island", { group });
      this.$store.commit("topCount", { topId });
      this.$router.push({ path: "/homeData" });
      console.log(group);
      console.log(topId);
      this.onLoadClick();
    },
    playSound(sound) {
      if (sound) {
        const audio = new Audio(sound);
        const audioPromise = audio.play();
        if (audioPromise !== undefined) {
          audioPromise
            .then(() => {
              audio.play();
              audio.volume = 0.7;
            })
            .catch(() => {});
        }
      }
    },
    loadMessage() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(""), 6000);
      });
    },
    async onLoadClick() {
      this.$store.commit("setLoading", true);
      this.message = await this.loadMessage();
      this.$store.commit("setLoading", false);
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
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  transition: all 0.4s ease-in-out;
  position: relative;
  z-index: 3;
  button {
    height: calc((100vh - 100px) / 5);
    display: flex;
    align-items: flex-end;
    position: relative;
    transition: all 0.4s;
    transform: scale(1.3);
    &:hover {
      transform: scale(1.5);
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
      grid-area: 1/3;
      top: 20%;
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

.shadow {
  width: 7em;
  height: 7em;
  background: #3676bd;
  opacity: 0.2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  animation: grow 1.5s linear infinite alternate;
  transform-origin: center center;
}
</style>
