<template>
  <div :key="componentKey" id="bg" class="bg">
    <ApolloQuery
      :query="
        (gql) => gql`
          query allStudents($group: String) {
            students(
              where: { group: { _eq: $group } }
              order_by: { evaluation_aggregate: { count: desc } }
            ) {
              student_id
              student_name
              booth_number
              work_title
              evaluation(order_by: { created_at: desc }) {
                author
                plan
                coding
                design
                presentation
                created_at
                comment
              }
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
            evaluate_aggregate(
              where: { evaluation: { group: { _eq: $group } } }
            ) {
              aggregate {
                count
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
          <ToHome />
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
                v-on:mouseover="playSound(mouseOver)"
              >
                <img src="../assets/images/arrow_upperLeft.svg" alt="" />
              </button>
              <button
                class="pad-key -upperRight"
                v-if="!(filteredItem[0].relatedIslands[1].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[1].name}`)
                "
                v-on:mouseover="playSound(mouseOver)"
              >
                <img src="../assets/images/arrow_upperRight.svg" alt="" />
              </button>
              <button
                class="pad-key -lowerRight"
                v-if="!(filteredItem[0].relatedIslands[2].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[2].name}`)
                "
                v-on:mouseover="playSound(mouseOver)"
              >
                <img src="../assets/images/arrow_lowerRight.svg" alt="" />
              </button>
              <button
                class="pad-key -lowerLeft"
                v-if="!(filteredItem[0].relatedIslands[3].name === '')"
                @click="
                  selectIsland(`${filteredItem[0].relatedIslands[3].name}`)
                "
                v-on:mouseover="playSound(mouseOver)"
              >
                <img src="../assets/images/arrow_lowerLeft.svg" alt="" />
              </button>
            </div>

            <div class="avatars">
              <div
                v-for="(item, idx) in filteredItem[0].members"
                :key="idx"
                class="avatar"
                :class="`avatar-${item.id}`"
                :style="`left: ${item.xy[0]}%; bottom: ${item.xy[1]}%`"
                v-on:mouseover="mouseOverAction(idx)"
                v-on:mouseleave="mouseLeaveAction(idx)"
              >
                <img
                  class="avatar-image"
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
            <!-- <p class="data-count">
              プレゼン回数：{{ data.evaluate_aggregate.aggregate.count }}回
            </p> -->
            <ul class="data-list">
              <li
                v-for="student in data.students"
                :key="student.id"
                class="data-item"
              >
                <div class="column">
                  <div class="data-icon">
                    <img
                      :src="
                        require('../assets/images/icon/icon_' +
                          student.student_id +
                          '.png')
                      "
                      alt=""
                    />
                  </div>
                  <p class="data-work">
                    <span>{{ student.booth_number }}.</span>
                    <span>{{ student.work_title }}</span>
                  </p>
                </div>
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
                <p class="data-count">
                  <span>今までのプレゼン回数：</span>
                  <span>{{ student.evaluation.length }}</span>
                  <span>回</span>
                </p>
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
import ToHome from "../components/ToHome.vue";
import Loading from "../components/LoadingHome.vue";
import mouseOver from "@/assets/sounds/mouseOver_02.mp3";

export default {
  name: "AllStudents",
  components: {
    ToHome,
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

    console.log(this.rank);
    console.log(this.rank[0]);
    console.log(this.rank[1]);
    console.log(this.rank[2]);

    // addClass - top1
    for (let i = 0; i < this.filteredItem[0].members.length; i++) {
      setTimeout(() => {
        if (
          document.querySelectorAll(".avatar")[i].classList[1] ===
          `avatar-${this.rank[0]}`
        ) {
          document.querySelectorAll(".avatar")[i].classList.add("gold");
        }
        if (
          document.querySelectorAll(".avatar")[i].classList[1] ===
          `avatar-${this.rank[1]}`
        ) {
          document.querySelectorAll(".avatar")[i].classList.add("silver");
        }
        if (
          document.querySelectorAll(".avatar")[i].classList[1] ===
          `avatar-${this.rank[2]}`
        ) {
          document.querySelectorAll(".avatar")[i].classList.add("bronze");
        }
      }, 1000);
    }
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
      mouseOver,
      componentKey: 0,
      group: this.$store.getters.getIsland,
      rank: this.$store.getters.getRanking,
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
                  fontSize: "22px",
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
    },
    mouseOverAction(index) {
      this.hoverFlag = true;
      this.hoverIndex = index;
    },
    mouseLeaveAction() {
      this.hoverFlag = false;
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
      height: 7.2rem;
      cursor: pointer;
      &:hover {
        animation: bounce 0.8s linear infinite alternate;
      }
      &.gold,
      &.silver,
      &.bronze {
        &::before {
          content: "";
          position: absolute;
          z-index: 2;
          top: 0;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 8rem;
          height: 3rem;
        }
      }
      &.gold {
        &::before {
          background: url(../assets/images/crown_gold.png) no-repeat center;
          background-size: contain;
        }
      }
      &.silver {
        &::before {
          background: url(../assets/images/crown_silver.png) no-repeat center;
          background-size: contain;
        }
      }
      &.bronze {
        &::before {
          background: url(../assets/images/crown_bronze.png) no-repeat center;
          background-size: contain;
        }
      }
      img {
        height: 100%;
        display: block;
        position: relative;
        z-index: -1;
      }
      .avatar-message {
        position: absolute;
        top: 0%;
        left: 50%;
        z-index: 3;
        padding: 2rem;
        background: #fff;
        border-radius: 2rem;
        transform: translate(-50%, -120%);
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
            font-family: kosugi-maru, Helvetica, Arial, sans-serif;
            font-size: 1.4rem;
            text-align: right;
            margin: 0.6rem 0 0 0;
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
</style>
