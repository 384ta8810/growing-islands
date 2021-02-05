<template>
  <div :key="componentKey" id="bg" class="bg">
    <ApolloQuery
      :query="
        (gql) => gql`
          query allStudents($group: String) {
            students(
              where: { job: { _eq: $group } }
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
          <div class="island">
            <img
              :src="require('../assets/images/island_' + group + '.svg')"
              alt=""
            />
            <div v-for="student in data.students" :key="student.id">
              <img
                :src="
                  require('../assets/images/avatar/avatar_' +
                    student.student_id +
                    '.svg')
                "
                alt=""
              />
            </div>
          </div>
          <ul class="data">
            <li
              v-for="student in data.students"
              :key="student.id"
              class="data-item"
            >
              <p class="data-title">
                {{ student.booth_number }}
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
                  width="100%"
                  :options="chartOptions"
                  :series="[1, 1, 1, 1]"
                ></apexchart>
              </div>
              <div v-else>
                <apexchart
                  type="donut"
                  width="100%"
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
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "AllStudents",
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
      componentKey: 0,
      group: this.$store.getters.getIsland,
      series: [],
      chartOptions: {
        chart: {
          type: "donut",
        },
        legend: {
          show: false,
        },
        colors: ["#F56582", "#445771", "#00B5B2", "#FFCC56"],
        dataLabels: {
          enabled: true,
          textAnchor: "left",
          style: {
            fontSize: "14px",
          },
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
              labels: {
                show: true,
                value: {
                  show: true,
                },
                total: {
                  show: true,
                  label: "総合",
                  style: {
                    fontSize: "2px",
                  },
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
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/setting.scss";

::-webkit-scrollbar {
  width: 1rem;
  height: 2rem;
}
::-webkit-scrollbar-track {
  background: #cbcbcb;
  border-radius: 1.3rem;
  // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
  background: #29abe2;
  border-radius: 1.3rem;
  // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.block {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.4fr 1.2fr;
}

.island {
  position: relative;
  height: 100vh;
  img {
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.data {
  overflow-x: hidden;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.2rem 4.2rem;
  padding: 5rem;
  background: #fff;
  border-radius: 5rem 0 0 5rem;
  box-shadow: -0.4rem 0 0.6rem rgba($color: #000000, $alpha: 0.16);
  border-right: 20px solid #fff;
  .data-item {
    width: 100%;
    background: #e7e8ea;
    border-radius: 1.2rem;
    box-shadow: 0 -0.4rem 0.6rem rgba($color: #000000, $alpha: 0.16);
    padding: 2.4rem 2.6rem;
    .data-title,
    .data-name {
      font-family: kosugi-maru, Helvetica, Arial, sans-serif;
    }
    .data-title {
      font-size: 1.8rem;
      text-align: center;
      height: 2em;
    }
    .data-name {
      font-size: 2.4rem;
      text-align: center;
      margin: 1.2rem 0;
    }
    .data-image {
      width: 18%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
