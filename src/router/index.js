import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Courses from "../views/Courses";
import Blog from "../views/Blog";
import Challenges from "../views/Challenges/";
import SoloChallenge from "../views/Challenges/SoloChallenge/";
import SoloChallengeConfirm from "../views/Challenges/SoloChallenge/SoloChallengeConfirm";
import SoloChallengeExam from "../views/Challenges/SoloChallenge/SoloChallengeExam";
import DualTypes from "../views/Challenges/DualChallenge/DualTypes";
import DualTopics from "../views/Challenges/DualChallenge/DualTopics";
import Duellers from "../views/Challenges/DualChallenge/Duellers";
import Invitations from "../views/Challenges/DualChallenge/Invitations";
import DualConfirm from "../views/Challenges/DualChallenge/DualConfirm";
import DualResult from "../views/Challenges/DualChallenge/DualResult";
import Instructors from "../views/Instructors";
import Problems from "../views/Problems";
import ProblemTopics from "../views/ProblemTopics";
import Problem from "../views/Problem";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import CreateProblem from "../views/modifyChallenges/CreateProblem";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: Challenges,
  },
  {
    path: "/challenges/soloChallenge/",
    name: "BrowseTopics",
    component: SoloChallenge,
  },
  {
    path: "/challenges/soloChallenge/confirm/:topicId",
    name: "SoloChallengeConfirm",
    component: SoloChallengeConfirm,
  },
  {
    path: "/challenges/soloChallenge/:challengeId",
    name: "SoloChallengeExam",
    component: SoloChallengeExam,
  },
  {
    path: "/challenges/dualChallenge/dualTypes/",
    name: "DualTypes",
    component: DualTypes,
  },
  {
    path: "/challenges/dualChallenge/dualTopics/",
    name: "DualTopics",
    component: DualTopics,
  },
  {
    path: "/challenges/dualChallenge/duellers/",
    name: "Duellers",
    component: Duellers,
  },
  {
    path: "/challenges/dualChallenge/invitations/",
    name: "Invitations",
    component: Invitations,
  },
  {
    path: "/challenges/dualChallenge/confirm/:topicId",
    name: "DualConfirm",
    component: DualConfirm,
  },
  {
    path: "/challenges/dualChallenge/result/:challengeId",
    name: "DualResult",
    component: DualResult,
  },
  {
    path: "/instructors",
    name: "Instructors",
    component: Instructors,
  },
  {
    path: "/problems",
    name: "ProblemTopics",
    component: ProblemTopics,
  },
  {
    path: "/problems/:topic",
    name: "Problems",
    component: Problems,
    props: (route) => ({ ...route.params, ...route.query }),
  },
  {
    path: "/problem/:id",
    name: "Problem",
    component: Problem,
    props: true,
  },
  {
    path: "/admin/create-problem",
    name: "CreateProblem",
    component: CreateProblem,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
