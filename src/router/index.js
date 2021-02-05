import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Job from "../views/Job.vue";
import HomeData from "../views/HomeData.vue";
import JobData from "../views/JobData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/homeData",
    name: "HomeData",
    component: HomeData,
  },
  {
    path: "/job",
    name: "Job",
    component: Job,
  },
  {
    path: "/jobData",
    name: "JobData",
    component: JobData,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
