import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import store from "./store";

function enforceLogin(to, from, next) {
    if (store.state.user.user === undefined) next({ name: 'Login' });
    else next();
}

function enforceAdmin(to, from, next) {
    const user = store.state.user.user;
    if (user === undefined) next({ name: 'Login' });
    else if (user.affiliation !== 'admin') next({ name: 'Home' });
    else next();
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import("./views/Home"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("./views/auth/Login"),
    },
    {
        path: "/signup",
        name: "Signup",
        component: () =>
            import("./views/auth/Signup"),
    },
    {
        path: "/challenges",
        name: "Challenges",
        component: () =>
            import("./views/Challenges"),
    },
    {
        path: "/challenges/solo",
        beforeEnter: enforceLogin,
        name: "BrowseTopics",
        component: () =>
            import("./views/Challenges/SoloChallenge"),
    },
    {
        // TODO: make nested route
        path: "/challenges/solo/confirm/:topicId",
        beforeEnter: enforceLogin,
        name: "SoloChallengeConfirm",
        component: () =>
            import("./views/Challenges/SoloChallenge/SoloChallengeConfirm"),
    },
    {
        path: "/challenges/solo/:challengeId",
        beforeEnter: enforceLogin,
        name: "SoloChallengeExam",
        component: () =>
            import("./views/Challenges/SoloChallenge/SoloChallengeExam"),
    },
    {
        path: "/challenges/dual/dualTypes",
        beforeEnter: enforceLogin,
        name: "DualTypes",
        component: () =>
            import("./views/Challenges/DualChallenge/DualTypes"),
    },
    {
        path: "/challenges/dual/dualTopics",
        beforeEnter: enforceLogin,
        name: "DualTopics",
        component: () =>
            import("./views/Challenges/DualChallenge/DualTopics"),
    },
    {
        path: "/challenges/dual/duellers",
        beforeEnter: enforceLogin,
        name: "Duellers",
        component: () =>
            import("./views/Challenges/DualChallenge/Duellers"),
    },
    {
        // TODO: make nested route
        path: "/challenges/dual/confirm/:topicId",
        beforeEnter: enforceLogin,
        name: "DualConfirm",
        component: () =>
            import("./views/Challenges/DualChallenge/DualConfirm"),
    },
    {
        path: "/challenges/dual/:examId",
        beforeEnter: enforceLogin,
        name: "DualExam",
        component: () =>
            import("./views/Challenges/DualChallenge/DualExam"),
    },
    {
        path: "/challenges/dual/result/:examId",
        beforeEnter: enforceLogin,
        name: "DualResult",
        component: () =>
            import("./views/Challenges/DualChallenge/DualResult"),
    },
    {
        path: "/admin",
        beforeEnter: enforceAdmin,
        name: "Admin",
        component: () =>
            import("./views/Admin"),
    },
    {
        path: "/admin/add-quiz",
        beforeEnter: enforceAdmin,
        name: "AddQuiz",
        component: () =>
            import("./views/modifyChallenges/AddQuiz"),
    },
    {
        path: "/admin/create-problem",
        beforeEnter: enforceAdmin,
        name: "CreateProblem",
        component: () =>
            import("./views/modifyChallenges/CreateProblem"),
    },
    {
        path: "/problems",
        name: "ProblemTopics",
        component: () =>
            import("./views/ProblemTopics"),
    },
    {
        path: "/problems/:topic",
        name: "Problems",
        component: () =>
            import("./views/Problems"),
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
        component: () =>
            import("./views/Problem"),
        props: true,
    },
    {
        path: "/submission/:id",
        name: "Submission",
        component: () =>
            import("./views/Submission"),
    },
    {
        path: "/profile/:id",
        name: "Profile",
        component: () =>
            import("./views/Profile"),
        props: true,
    },
    {
        path: "/rank",
        name: "Rank",
        component: () =>
            import("./views/Rank"),
    },
    {
        path: "/todo",
        name: "ToDo",
        component: () =>
            import("./views/ToDo"),
    },




    { path: '/404', component: () => import("./views/NotFound") },
    { path: '*', redirect: '/404' },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;