<template>
  <div class="clock">
    <div class="clock-inner">
      <img
        class="clock-image"
        :src="require('@/assets/images/clock_' + clockImg + '.svg')"
        alt=""
      />
      <p class="clock-text">
        <span>{{ date }}</span>
        <span>{{ time }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      clockImg: "noon",
      date: "",
      time: "",
    };
  },
  mounted() {
    // time - update
    setInterval(this.updateTime, 1000);
    // time - set : homeBg & clockImg
    let currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 15) {
      this.clockImg = "noon";
      // this.clockImg = "night";
    } else if (currentTime >= 15 && currentTime < 18) {
      this.clockImg = "evening";
    } else {
      this.clockImg = "night";
    }
  },
  methods: {
    // method - time
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
        this.zeroPadding(currentDate.getDate(), 2);
    },
    zeroPadding(num, len) {
      let zero = "";
      for (let i = 0; i < len; i++) {
        zero += "0";
      }
      return (zero + num).slice(-len);
    },
  },
};
</script>

<style lang="scss" scoped>
.clock {
  position: absolute;
  bottom: -30%;
  left: -2%;
  z-index: 3;
  width: 30vw;
  height: 30vw;
  .clock-inner {
    position: relative;
    text-align: center;
    .clock-image {
      width: 76%;
    }
    .clock-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-40%, -84%);
      color: #fff;
      span {
        display: block;
        margin: 0 auto 1rem;
        &:nth-of-type(1) {
          font-size: 3.2rem;
        }
        &:nth-of-type(2) {
          font-size: 6rem;
        }
        @media screen and (max-width: 1600px) {
          &:nth-of-type(1) {
            font-size: 2.2rem;
          }
          &:nth-of-type(2) {
            font-size: 4.4rem;
          }
        }
      }
    }
  }
}
</style>
