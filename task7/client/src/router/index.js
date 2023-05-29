import { createRouter, createWebHistory } from 'vue-router'
import nodes from '../views/NodesViev.vue'
import AddNode from '../views/AddNode.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "nodes",
      component: nodes,
    },{
      path: "/AddNode",
      name: "AddNode",
      component: AddNode,
    },
  ]
})

export default router
