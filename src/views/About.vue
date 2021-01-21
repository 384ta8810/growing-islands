<template>
  <div class="student" :key="componentKey">
    <ApolloQuery
      :query="
        (gql) => gql`
          query allStudents($group: String) {
            students(
              where: { group: { _eq: $group } }
              order_by: { student_id: asc }
            ) {
              student_name
              student_id
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
        <div v-if="data">
          <div class="islands">
            <button v-on:click="selectIsland('eat')">
              <img src="../assets/images/island_eat.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('decorate')">
              <img src="../assets/images/island_decorate.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('bteam')">
              <img src="../assets/images/island_bteam.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('rg')">
              <img src="../assets/images/island_rg.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('giftlier')">
              <img src="../assets/images/island_giftlier.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('django')">
              <img src="../assets/images/island_django.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('peach')">
              <img src="../assets/images/island_peach.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('root8')">
              <img src="../assets/images/island_root8.svg" alt="" />
            </button>
            <button v-on:click="selectIsland('study')">
              <img src="../assets/images/island_study.svg" alt="" />
            </button>
          </div>
          <div>
            <div
              class="block"
              v-for="student in data.students"
              :key="student.id"
            >
              <!-- <div v-for ="item in student" :key="item.id">
                            {{item}}
                          </div> -->
              {{ student.student_id }}
              {{ student.student_name }}
              <div
                v-if="
                  student.evaluation_aggregate.aggregate.sum.design === null
                "
              >
                <apexchart
                  type="donut"
                  width="380"
                  :options="chartOptions"
                  :series="[1, 1, 1, 1]"
                ></apexchart>
              </div>
              <div v-else id="chart">
                <apexchart
                  type="donut"
                  width="380"
                  :options="chartOptions"
                  :series="[
                    student.evaluation_aggregate.aggregate.sum.design,
                    student.evaluation_aggregate.aggregate.sum.coding,
                    student.evaluation_aggregate.aggregate.sum.presentation,
                    student.evaluation_aggregate.aggregate.sum.plan,
                  ]"
                ></apexchart>
              </div>
              <div class="point-sum">
                <div class="point-title">
                  <p>デザイン</p>
                  <p>
                    {{ student.evaluation_aggregate.aggregate.sum.design }}
                    <span>点</span>
                  </p>
                </div>
                <div class="point-title">
                  <p>コーディング</p>
                  <p>
                    {{ student.evaluation_aggregate.aggregate.sum.coding }}
                    <span>点</span>
                  </p>
                </div>
                <div class="point-title">
                  <p>プレゼンテーション</p>
                  <p>
                    {{
                      student.evaluation_aggregate.aggregate.sum.presentation
                    }}
                    <span>点</span>
                  </p>
                </div>
                <div class="point-title">
                  <p>企画</p>
                  <p>
                    {{ student.evaluation_aggregate.aggregate.sum.plan }}
                    <span>点</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else><h2>頑張ってください！</h2></div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// import ApexCharts from 'vue-apexcharts'

export default {
  name: "AllStudents",
  // components:{
  //   apexchart: ApexCharts
  // },
  mounted() {
    this.forceRerender();
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
        dataLabels: {
          enabled: true,
          textAnchor: "left",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 350,
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
                  label: "トータル",
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
      console.log(group);
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
      // this.$router.push({ path: "/about2" });
      // location.reload();
    },
  },
};
</script>
<style scoped>
.student {
  padding-top: 110px;
}
.point-sum {
  margin: 10px auto;
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px 20px;
}
.point-title p:nth-child(1) {
  font-size: 13px;
  font-weight: 900;
  text-align: left;
  color: black;
  height: 20px;
}
.point-title p:nth-child(2) {
  font-size: 20px;
  color: white;

  border-radius: 30px;
  padding: 8px;
  margin: 5px 0;
}
.point-title p:nth-child(2) span {
  font-size: 12px;
}
.evaluate-list {
  width: 300px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 2px 3px 2px #e3e3e3;
  padding: 5px;
}
.point-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.point-list div p:nth-child(1) {
  font-size: 8px;
  height: 10px;
  font-weight: bolder;
}
.point-list div p:nth-child(2) {
  width: 45px;
  font-size: 40px;

  border-radius: 50%;
  margin: 10px auto;
  color: white;
}
.point-list div p:nth-child(2) span {
  font-size: 13px;
}
.author p {
  text-align: end;
  margin-right: 10px;
}
.grade_1 {
  background-color: #dd8800;
  border: 5px solid #ff9d00;
}
.grade_2 {
  background-color: #018fd0;
  border: 5px solid #05b1ff;
}
#chart {
  text-align: left;
  width: 350px;
  margin: 0 auto;
}
.block {
  background: #05b1ff;
  margin: 10px;
}
</style>
