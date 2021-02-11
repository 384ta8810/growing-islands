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
            <router-link to="/" class="arrow -right">
              <img
                v-on:mouseover="playSound(mouseOver)"
                src="../assets/images/island_arrow-right.svg"
                alt=""
              />
              <div class="shadow"></div>
            </router-link>
          </div>

          <div class="islands">
            <button
              v-for="(item, index) in islandData.islands.job"
              :key="index"
              @click="
                selectIsland(
                  item.name,
                  data.students[0].student_id,
                  data.students[1].student_id,
                  data.students[2].student_id
                )
              "
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
    <Clock />
    <Bg01 />
    <News />
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";
import Clock from "../components/Clock.vue";
import Bg01 from "../components/Bg01.vue";
import News from "../components/News.vue";
import mouseOver from "@/assets/sounds/mouseOver_01.mp3";

export default {
  name: "Job",
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
    selectIsland(group, gold, silver, bronze) {
      this.$store.commit("island", { group });
      this.$store.commit("ranking", [gold, silver, bronze]);
      this.$router.push({ path: "/jobData" });
      this.onLoadClick();
    },
    // method - sound
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
  padding: 14rem 0 5rem;
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
    transform: scale(1.1);
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
    &::before {
      content: "";
      position: absolute;
      bottom: 76%;
      left: 28%;
      z-index: 3;
      width: 100%;
      height: 100%;
      animation: float 1.5s linear infinite alternate;
    }
    &:nth-of-type(1) {
      grid-area: 1/2;
      top: 40%;
      &::before {
        background: url(../assets/images/flag_engineer.svg) no-repeat center;
      }
    }
    &:nth-of-type(2) {
      grid-area: 2/1;
      &::before {
        background: url(../assets/images/flag_designer.svg) no-repeat center;
      }
    }
    &:nth-of-type(3) {
      grid-area: 2/3;
      &::before {
        background: url(../assets/images/flag_business.svg) no-repeat center;
      }
    }
    &:nth-of-type(4) {
      grid-area: 3/2;
      &::before {
        background: url(../assets/images/flag_director.svg) no-repeat center;
      }
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
