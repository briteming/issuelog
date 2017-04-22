import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/:page(\\d+)?',
      name: 'home',
      component: require('@/pages/index.vue')
    },
    {
      path: '/post/:id(\\d+)',
      component: require('@/pages/post.vue'),
      name: 'post'
    },
    {
      path: '/labels',
      component: require('@/pages/labels.vue'),
      name: 'labels'
    },
    {
      path: '/label/:label',
      component: require('@/pages/index.vue'),
      name: 'label'
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
