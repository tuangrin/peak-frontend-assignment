import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: () => import('../pages/Home/Home.vue'),
    },
    {
      path: '/',
      component: () => import('../pages/Layout/Layout.vue'),
      children: [
        {
          path: '',
          redirect: '/products',
        },
        {
          path: 'products',
          name: 'product-lists',
          component: () => import('../pages/ProductLists/ProductLists.vue'),
        },
        {
          path: 'products/:id',
          name: 'product-detail',
          component: () => import('../pages/ProductDetail/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'cart-page',
          component: () => import('../pages/Cart/Cart.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  if (to.matched.length === 0) {
    return '/products'
  }
})

export default router
