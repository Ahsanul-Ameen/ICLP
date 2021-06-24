import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/auth/Login"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("./views/auth/Signup"),
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("./views/Courses"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("./views/Blog"),
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import("./views/Challenges"),
  },
  {
    path: "/challenges/solo",
    name: "BrowseTopics",
    component: () => import("./views/Challenges/SoloChallenge"),
  },
  {
    // TODO: make nested route
    path: "/challenges/solo/confirm/:topicId",
    name: "SoloChallengeConfirm",
    component: () =>
      import("./views/Challenges/SoloChallenge/SoloChallengeConfirm"),
  },
  {
    path: "/challenges/solo/:challengeId",
    name: "SoloChallengeExam",
    component: () =>
      import("./views/Challenges/SoloChallenge/SoloChallengeExam"),
  },
  {
    path: "/challenges/dual/dualTypes",
    name: "DualTypes",
    component: () => import("./views/Challenges/DualChallenge/DualTypes"),
  },
  {
    path: "/challenges/dual/dualTopics",
    name: "DualTopics",
    component: () => import("./views/Challenges/DualChallenge/DualTopics"),
  },
  {
    path: "/challenges/dual/duellers",
    name: "Duellers",
    component: () => import("./views/Challenges/DualChallenge/Duellers"),
  },
  {
    // TODO: make nested route
    path: "/challenges/dual/confirm/:topicId",
    name: "DualConfirm",
    component: () => import("./views/Challenges/DualChallenge/DualConfirm"),
  },
  {
    path: "/challenges/dual/:examId",
    name: "DualExam",
    component: () => import("./views/Challenges/DualChallenge/DualExam"),
  },
  {
    path: "/challenges/dual/result/:examId",
    name: "DualResult",
    component: () => import("./views/Challenges/DualChallenge/DualResult"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./views/Admin"),
  },
  {
    path: "/admin/create-problem",
    name: "AddQuiz",
    component: () => import("./views/modifyChallenges/AddQuiz"),
  },
  {
    path: "/admin/add-quiz",
    name: "CreateProblem",
    component: () => import("./views/modifyChallenges/CreateProblem"),
  },
  {
    path: "/problems",
    name: "ProblemTopics",
    component: () => import("./views/ProblemTopics"),
  },
  {
    path: "/problems/:topic",
    name: "Problems",
    component: () => import("./views/Problems"),
    props: ({ params, query }) => ({
      ...params,
      solved: query.solved !== "false",
      unsolved: query.unsolved !== "false",
      easy: query.easy !== "false",
      medium: query.medium !== "false",
      hard: query.hard !== "false",
    }),
  },
  {
    path: "/problem/:id",
    name: "Problem",
    component: () => import("./views/Problem"),
    props: true,
  },
  {
    path: "/submission/:id",
    name: "Submission",
    component: () => import("./views/Submission"),
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("./views/Profile"),
    props: true,
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import("./views/Rank"),
  },
  {
    path: "/todo",
    name: "ToDo",
    component: () => import("./views/ToDo"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
