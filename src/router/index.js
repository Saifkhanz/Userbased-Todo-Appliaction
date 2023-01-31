import { createRouter, createWebHistory } from 'vue-router'
import newList from '../components/newList.vue';
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import TodoView from '@/views/TodoView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: login
  },
  {

    path: '/signup',
    name: "signup",
    component: signup

  },
  {
    path: '/new/:id',
    name: 'new',
    component:newList
  },
  {
    path: '/todoview/:id',
    name: 'todoview',
    component:TodoView
  }
  // {
  //   path: '/usertask/:id',
  //   name: 'userTask',
  //   component: userTask,
  //   meta: {
  //     auth: true
  //   }
  // }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
