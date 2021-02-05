<template>
  <div class="loading" v-show="$store.state.loading">
    <div class="overlay" :style="overlayPosition">
      <div class="message-box">
        <p>{{ filteredItem[0].title }}</p>
        <img
          :src="
            require('../assets/images/island_' + filteredItem[0].name + '.svg')
          "
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";

export default {
  name: "Loading",
  data() {
    return {
      islandData,
      overlayPosition: {
        top: "0",
      },
      group: this.$store.getters.getIsland,
    };
  },
  computed: {
    filteredItem() {
      return this.islandData.islands.home.filter((island) => {
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
};
</script>

<style lang="scss" scoped>
.overlay {
  background-color: rgba(0, 0, 0, 1);
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-box {
  color: #fff;
  animation-name: blink;
  animation-duration: 1000ms;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  // animation-iteration-count: infinite;
  p {
    font-size: 2.8rem;
  }
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
