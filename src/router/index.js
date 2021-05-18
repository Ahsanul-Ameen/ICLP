import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import Blog from '../views/Blog.vue'
import Challenges from '../views/Challenges/'
import BrowseTopics from '../views/Challenges/SoloChallenge/BrowseTopics.vue'
import Instructors from '../views/Instructors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/challenges',
    name: 'Challenges',
    component: Challenges
  },
  {
    path: '/challenges/soloChallenge/browseTopics',
    name: 'BrowseTopics',
    component: BrowseTopics
  },
  {
    path: '/instructors',
    name: 'Instructors',
    component: Instructors
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
