<template>
  <div class="home">
    <div class="clock">
      <div class="clock-inner">
        <img class="clock-image" src="../assets/images/clock_sun.svg" alt="" />
        <p class="clock-text">
          <span>{{ date }}</span>
          <span>{{ time }}</span>
        </p>
      </div>
    </div>
    <div class="arrows">
      <button
        @click.prevent="
          playSound(
            'http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3'
          )
        "
        class="arrow -left"
      >
        <img src="../assets/images/island_arrow-left.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button class="arrow -right">
        <img src="../assets/images/island_arrow-right.svg" alt="" />
        <div class="shadow"></div>
      </button>
    </div>
    <div class="clouds">
      <div class="cloud -type01">
        <img src="../assets/images/cloud_01.svg" alt="" />
      </div>
      <div class="cloud -type02">
        <img src="../assets/images/cloud_02.svg" alt="" />
      </div>
      <div class="cloud -type03">
        <img src="../assets/images/cloud_03.svg" alt="" />
      </div>
      <div class="cloud -type04">
        <img src="../assets/images/cloud_04.svg" alt="" />
      </div>
      <div class="cloud -type05">
        <img src="../assets/images/cloud_05.svg" alt="" />
      </div>
      <div class="cloud -type06">
        <img src="../assets/images/cloud_06.svg" alt="" />
      </div>
    </div>
    <div class="islands">
      <button v-on:click="selectIsland('eat')">
        <img src="../assets/images/island_eat.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('decorate')">
        <img src="../assets/images/island_decorate.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('bteam')">
        <img src="../assets/images/island_bteam.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('rg')">
        <img src="../assets/images/island_rg.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('giftlier')">
        <img src="../assets/images/island_giftlier.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('django')">
        <img src="../assets/images/island_django.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('peach')">
        <img src="../assets/images/island_peach.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('root8')">
        <img src="../assets/images/island_root8.svg" alt="" />
        <div class="shadow"></div>
      </button>
      <button v-on:click="selectIsland('study')">
        <img src="../assets/images/island_study.svg" alt="" />
        <div class="shadow"></div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/setting.scss";

.home {
  width: 100%;
  height: 100vh;
  @include bg-noon;
}

.islands {
  width: 60vw;
  margin: 0 auto;
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  transition: all 0.4s ease-in-out;
  position: relative;
  z-index: 3;
  // &:hover {
  //   button img:not(:hover) {
  //     opacity: 0.5;
  //     transition: all 0.4s ease-in;
  //   }
  // }
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
      animation: fly 1.5s linear infinite alternate;
      z-index: 2;
      position: relative;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    &:nth-of-type(1) {
      grid-area: 1/3;
      top: 40%;
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
      bottom: 30%;
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

.clock {
  position: absolute;
  bottom: -26%;
  left: -2%;
  z-index: 3;
  width: 30vw;
  height: 30vw;
  .clock-inner {
    position: relative;
    text-align: center;
    .clock-image {
      width: 86%;
    }
    .clock-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%, -50%);
      color: #fff;
      text-shadow: -1px -1px #aaa, -2px -2px #999, -3px -3px #888,
        -4px -4px rgb(95, 95, 95);
      span {
        display: block;
        margin: 0 auto 1.6rem;
        &:nth-of-type(1) {
          font-size: 3.2rem;
        }
        &:nth-of-type(2) {
          font-size: 6rem;
        }
        @media screen and (max-width: 1600px) {
          &:nth-of-type(1) {
            font-size: 2.4rem;
          }
          &:nth-of-type(2) {
            font-size: 4.6rem;
          }
        }
      }
    }
  }
}

.arrows {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 2;
  .arrow {
    width: 9vw;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    animation: fly 1.5s linear infinite alternate;
    img {
      position: relative;
      z-index: 2;
      width: 100%;
    }
    &.-left {
      left: 4%;
    }
    &.-right {
      right: 4%;
    }
  }
}

.clouds {
  width: 100%;
  height: 100vh;
  position: absolute;
  .cloud {
    position: absolute;
    animation: fly 2.2s linear infinite alternate;
    &.-type01 {
      bottom: 4%;
      right: 30%;
    }
    &.-type02 {
      bottom: 26%;
      left: 80%;
    }
    &.-type03 {
      top: 2%;
      left: 2%;
    }
    &.-type04 {
      bottom: 26%;
      left: 6%;
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

<script>
export default {
  name: "Home",
  data() {
    return {
      date: "",
      time: "",
    };
  },
  mounted() {
    // clock
    setInterval(this.updateTime, 1000);
    // prevent : scroll
    function noScroll(event) {
      event.preventDefault();
    }
    document.addEventListener("mousewheel", noScroll, { passive: false });
  },
  methods: {
    selectIsland(group) {
      this.$store.commit("island", { group });
      console.log(group);
      this.$router.push({ path: "/about" });
    },
    // clock
    updateTime() {
      let currentDate = new Date();
      this.time =
        this.zeroPadding(currentDate.getHours(), 2) +
        ":" +
        this.zeroPadding(currentDate.getMinutes(), 2);
      this.date =
        this.zeroPadding(currentDate.getFullYear(), 4) +
        "/" +
        this.zeroPadding(currentDate.getMonth() + 1, 2) +
        "/" +
        this.zeroPadding(currentDate.getDay(), 2);
    },
    zeroPadding(num, len) {
      let zero = "";
      for (let i = 0; i < len; i++) {
        zero += "0";
      }
      return (zero + num).slice(-len);
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
  },
};
</script>
