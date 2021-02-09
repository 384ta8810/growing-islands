<template>
  <div class="loading" v-show="$store.state.loading">
    <div id="overlay" class="overlay" :style="overlayPosition">
      <Bg02 />
      <div class="message-box">
        <img
          class="message-image"
          :src="
            require('../assets/images/island_' + filteredItem[0].name + '.svg')
          "
          alt=""
        />
        <div class="message-text">
          <p class="message-title">{{ filteredItem[0].title }}</p>
          <p class="message-description">{{ filteredItem[0].description }}</p>
        </div>
        <div class="container" id="progressbar">
          <div class="progress">
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="percentage">Loading...<br />{{ progress }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";
import Bg02 from "../components/Bg02.vue";

export default {
  name: "Loading",
  components: {
    Bg02,
  },
  data() {
    return {
      islandData,
      overlayPosition: {
        top: "0",
      },
      group: this.$store.getters.getIsland,
      progress: 10,
      completed: false,
      tempo: 32,
    };
  },
  created: function() {
    this.timer(this.tempo);
  },
  computed: {
    filteredItem() {
      return this.islandData.islands.job.filter((island) => {
        return island.name.includes(this.group);
      });
    },
  },
  watch: {
    "$store.state.loading": function(newVal) {
      if (newVal) {
        this.overlayPosition.top = window.pageYOffset + "px";
      }
    },
  },
  mounted() {
    const overlayEl = document.getElementById("overlay");
    let currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 15) {
      overlayEl.classList.add("-noon");
    } else if (currentTime >= 15 && currentTime < 18) {
      overlayEl.classList.add("-evening");
    } else {
      overlayEl.classList.add("-night");
    }
  },
  methods: {
    timer: function(tempo) {
      let vm = this;
      let setIntervalRef = setInterval(function() {
        vm.progress++;
        if (vm.progress == 100) {
          clearInterval(setIntervalRef);
          vm.completed = true;
        }
      }, tempo);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/setting.scss";

.overlay {
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  &.-noon {
    @include bg-noon;
  }
  &.-evening {
    @include bg-evening;
  }
  &.-night {
    @include bg-night;
  }
}

.message-box {
  animation-name: blink;
  animation-duration: 1000ms;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  text-align: center;
  .message-image {
    width: 20%;
  }
  .message-text {
    width: 70%;
    margin: 2rem auto 5rem;
    background: rgba($color: #fff, $alpha: 0.56);
    border-radius: 3rem;
    p {
      width: 80%;
      margin: 0 auto;
    }
    .message-title {
      padding: 2.4rem 0;
      font-size: 2.8rem;
      border-bottom: 4px dashed #000;
    }
    .message-description {
      padding: 3.2rem 0;
      font-size: 2rem;
    }
  }
}

.progress {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0.3rem 0.6rem rgba($color: #000000, $alpha: 0.16);
  width: 44%;
  margin: 0 auto;
}
.progress-bar {
  background: #72c4ff;
  border-radius: 3.4rem;
  height: 1.8rem;
}
.percentage {
  color: #fff;
  font-size: 2.2rem;
  text-align: center;
  text-shadow: 0 0.3rem 0.6rem rgba($color: #000000, $alpha: 0.16);
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
