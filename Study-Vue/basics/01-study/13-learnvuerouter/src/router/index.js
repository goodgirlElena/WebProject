import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/Home'
// import About from '../components/About'
// import user from '../components/user'

//路由懒加载方式
const Home = () => import('../components/Home');
const HomeMessage = () => import('../components/HomeMessage');
const HomeNews = () => import('../components/HomeNews');

const About = () => import('../components/About');
const user = () => import('../components/user');
const Profile = () => import('../components/Profile');

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        // {
        //   path: '',
        //   redirect: 'news'
        // },
        {
          path: 'news',
          component: HomeNews
        },
        {
          path: 'message',
          component: HomeMessage
        }
      ],
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: '关于'
      }
    },
    {
      path: '/user/:userId',
      component: user,
      meta: {
        title: '用户'
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        title: '档案'
      }
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title; //router的全局导航守卫
  // console.log(to);
  next();
})

export default router