<template>
  <div :key="componentKey" id="bg" class="bg">
    <ApolloQuery
      :query="
        (gql) => gql`
          query allStudents($group: String) {
            students(
              where: { group: { _eq: $group } }
              order_by: { student_id: asc }
            ) {
              student_id
              student_name
              booth_number
              work_title
              evaluation_aggregate {
                aggregate {
                  sum {
                    coding
                    design
                    plan
                    presentation
                  }
                }
              }
            }
          }
        `
      "
      :variables="{
        group,
      }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">ローディング ...</div>
        <div v-else-if="error">404</div>
        <div v-if="data" class="block">
          <Loading />
          <ToTop />
          <div class="island">
            <div class="island-image">
              <img
                :src="require('../assets/images/island_' + group + '.svg')"
                alt=""
              />
            </div>
            <div class="pad">
              <button
                class="pad-key -upperLeft"
                v-if="!(filteredItem[0].relatedIslands[0].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[0].name}`)
                "
              >
                <img src="../assets/images/arrow_upperLeft.svg" alt="" />
              </button>
              <button
                class="pad-key -upperRight"
                v-if="!(filteredItem[0].relatedIslands[1].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[1].name}`)
                "
              >
                <img src="../assets/images/arrow_upperRight.svg" alt="" />
              </button>
              <button
                class="pad-key -lowerRight"
                v-if="!(filteredItem[0].relatedIslands[2].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[2].name}`)
                "
              >
                <img src="../assets/images/arrow_lowerRight.svg" alt="" />
              </button>
              <button
                class="pad-key -lowerLeft"
                v-if="!(filteredItem[0].relatedIslands[3].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[3].name}`)
                "
              >
                <img src="../assets/images/arrow_lowerLeft.svg" alt="" />
              </button>
            </div>
            <div class="avatars">
              <div
                v-for="(item, idx) in filteredItem[0].members"
                :key="idx"
                class="avatar"
                :style="`left: ${item.xy[0]}%; top: ${item.xy[1]}%`"
                v-on:mouseover="mouseOverAction(idx)"
                v-on:mouseleave="mouseLeaveAction(idx)"
              >
                <img
                  :src="
                    require('../assets/images/avatar/avatar_' +
                      item.id +
                      '.svg')
                  "
                  alt=""
                />
                <div
                  v-show="hoverFlag && idx === hoverIndex"
                  class="avatar-message"
                >
                  <p>{{ item.message }}</p>
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="data">
            <p class="data-title">{{ filteredItem[0].title }}</p>
            <ul class="data-list">
              <li
                v-for="student in data.students"
                :key="student.id"
                class="data-item"
              >
                <p class="data-work">
                  {{ student.booth_number }}.
                  {{ student.work_title }}
                </p>
                <p class="data-name">
                  {{ student.student_name }}
                </p>
                <div
                  v-if="
                    student.evaluation_aggregate.aggregate.sum.design === null
                  "
                >
                  <apexchart
                    type="donut"
                    :options="chartOptions"
                    :series="[1, 1, 1, 1]"
                  ></apexchart>
                </div>
                <div v-else>
                  <apexchart
                    type="donut"
                    :options="chartOptions"
                    :series="[
                      student.evaluation_aggregate.aggregate.sum.design,
                      student.evaluation_aggregate.aggregate.sum.coding,
                      student.evaluation_aggregate.aggregate.sum.presentation,
                      student.evaluation_aggregate.aggregate.sum.plan,
                    ]"
                  ></apexchart>
                </div>
                <div class="data-image">
                  <img
                    :src="
                      require('../assets/images/avatar/avatar_' +
                        student.student_id +
                        '.svg')
                    "
                    alt=""
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import islandData from "../assets/json/islands.json";
import ToTop from "../components/ToTop.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "AllStudents",
  components: {
    ToTop,
    Loading,
  },
  computed: {
    filteredItem() {
      return this.islandData.islands.home.filter((island) => {
        return island.name.includes(this.group);
      });
    },
  },
  mounted() {
    this.forceRerender();
  },
  updated() {
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
  data() {
    return {
      islandData,
      componentKey: 0,
      group: this.$store.getters.getIsland,
      hoverFlag: false,
      hoverIndex: null,
      series: [
        {
          name: "デザイン",
          data: "",
        },
        {
          name: "コーディング",
          data: "",
        },
        {
          name: "プレゼン",
          data: "",
        },
        {
          name: "企画",
          data: "",
        },
      ],
      chartOptions: {
        chart: {
          type: "donut",
        },
        legend: {
          show: false,
        },
        colors: ["#F56582", "#445771", "#FFCC56", "#00B5B2"],
        dataLabels: {
          enabled: true,
          formatter: function(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return [name, opts.w.config.series[opts.seriesIndex]];
          },
          textAnchor: "left",
          style: {
            fontSize: "14px",
            fontFamily: "nicoca",
            fontWeight: "bold",
          },
          dropShadow: {
            enabled: false,
          },
        },
        stroke: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 20000,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels: ["デザイン", "コーディング", "プレゼン", "企画"],
        plotOptions: {
          pie: {
            donut: {
              size: "40%",
              labels: {
                show: true,
                name: {
                  show: true,
                  color: "#373d3f",
                },
                value: {
                  show: true,
                  fontFamily: "nicoca",
                  color: "#373d3f",
                  fontWeight: "bold",
                },
                total: {
                  show: true,
                  label: "総合",
                  fontFamily: "nicoca",
                  color: "#373d3f",
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              },
            },
          },
        },
      },
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    selectIsland(group) {
      this.$store.commit("island", { group });
      this.$router.go({ path: this.$router.currentRoute.path });
      // this.$router.push({ path: "/homeData" });
    },
    mouseOverAction(index) {
      this.hoverFlag = true;
      this.hoverIndex = index;
    },
    mouseLeaveAction() {
      this.hoverFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/setting.scss";

.island {
  position: relative;
  height: 100vh;
  .island-image,
  .avatars {
    width: 68%;
    position: absolute;
    bottom: 4%;
    left: 50%;
    transform: translateX(-50%);
  }
  .island-image {
    img {
      width: 100%;
    }
  }
  .avatars {
    height: 100vh;
    .avatar {
      position: absolute;
      height: 9.2rem;
      cursor: pointer;
      img {
        height: 100%;
      }
      .avatar-message {
        position: relative;
        z-index: 2;
        padding: 2rem;
        background: #fff;
        border-radius: 2rem;
        transform: translate(-40%, -180%);
        width: 16vw;
        height: auto;
        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -15px;
          border: 15px solid transparent;
          border-top: 15px solid #fff;
        }
        p {
          &:nth-of-type(1) {
            font-size: 2rem;
          }
          &:nth-of-type(2) {
            font-size: 1.6rem;
            text-align: right;
          }
        }
      }
    }
  }
  .pad {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    .pad-key {
      width: 9rem;
      position: absolute;
      transition: all 0.4s;
      &:hover {
        transition: all 0.4s;
        transform: scale(1.3);
      }
      &.-upperLeft {
        bottom: 38%;
        left: 10%;
      }
      &.-upperRight {
        bottom: 38%;
        right: 10%;
      }
      &.-lowerRight {
        bottom: 4%;
        right: 10%;
      }
      &.-lowerLeft {
        bottom: 4%;
        left: 10%;
      }
    }
  }
}

.data {
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5rem;
  background: #fff;
  border-radius: 5rem 0 0 5rem;
  box-shadow: -0.4rem 0 0.6rem rgba($color: #000000, $alpha: 0.16);
  border-right: 20px solid #fff;
  .data-title {
    font-size: 6rem;
    text-align: center;
    margin: 0 0 5rem 0;
  }
  .data-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.2rem 4.2rem;
    .data-item {
      width: 100%;
      background: #e7e8ea;
      border-radius: 1.2rem;
      box-shadow: 0 -0.4rem 0.6rem rgba($color: #000000, $alpha: 0.16);
      padding: 2.4rem 0;
      .data-work,
      .data-name {
        font-family: kosugi-maru, Helvetica, Arial, sans-serif;
        height: 3em;
        padding: 0 2.6rem;
      }
      .data-work {
        font-size: 1.8rem;
        text-align: center;
      }
      .data-name {
        font-size: 2.4rem;
        text-align: center;
        margin: 1.2rem 0 0 0;
      }
      .data-image {
        position: relative;
        z-index: 2;
        width: 18%;
        margin: -2rem 2rem 0 auto;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
