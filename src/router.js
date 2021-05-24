import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('./views/Home'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('./views/auth/Login'),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import('./views/auth/Signup'),
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import('./views/Courses'),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import('./views/Blog'),
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import('./views/Challenges'),
  },
  {
    path: "/challenges/soloChallenge/",
    name: "BrowseTopics",
    component: () => import("../views/Challenges/SoloChallenge/"),
  },
  {
    path: "/challenges/soloChallenge/confirm/:topicId",
    name: "SoloChallengeConfirm",
    component: () => import('./views/Challenges/SoloChallenge/SoloChallengeConfirm'),
  },
  {
    path: "/challenges/soloChallenge/:challengeId",
    name: "SoloChallengeExam",
    component: () => import('./views/Challenges/SoloChallenge/SoloChallengeExam'),
  },
  {
    path: "/challenges/dualChallenge/dualTypes/",
    name: "DualTypes",
    component: () => import('./views/Challenges/DualChallenge/DualTypes'),
  },
  {
    path: "/challenges/dualChallenge/dualTopics/",
    name: "DualTopics",
    component: () => import('./views/Challenges/DualChallenge/DualTopics'),
  },
  {
    path: "/challenges/dualChallenge/duellers/",
    name: "Duellers",
    component: () => import('./views/Challenges/DualChallenge/Duellers'),
  },
  {
    path: "/challenges/dualChallenge/invitations/",
    name: "Invitations",
    component: () => import('./views/Challenges/DualChallenge/Invitations'),
  },
  {
    path: "/challenges/dualChallenge/confirm/:topicId",
    name: "DualConfirm",
    component: () => import('./views/Challenges/DualChallenge/DualConfirm'),
  },
  {
    path: "/challenges/dualChallenge/result/:challengeId",
    name: "DualResult",
    component: () => import('./views/Challenges/DualChallenge/DualResult'),
  },
  {
    path: "/instructors",
    name: "Instructors",
    component: () => import('./views/Instructors'),
  },
  {
    path: "/problems",
    name: "ProblemTopics",
    component: () => import('./views/ProblemTopics'),
  },
  {
    path: "/problems/:topic",
    name: "Problems",
    component: () => import('./views/Problems'),
    props: (route) => ({ ...route.params, ...route.query }),
  },
  {
    path: "/problem/:id",
    name: "Problem",
    component: () => import('./views/Problem'),
    props: true,
  },
  {
    path: "/admin/create-problem",
    name: "CreateProblem",
    component: () => import('./views/modifyChallenges/CreateProblem'),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
