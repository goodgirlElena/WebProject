<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <!-- 参数传递 1 -->
    <!-- <router-link :to="'/user/' + userId">用户</router-link>  -->
    <!-- <router-link to='/profile'>档案</router-link> -->
    <!-- 参数传递 2-->
    <!-- <router-link :to="{path: '/profile', query: {name:'Elena_k',age: 18}}">
      档案
    </router-link> -->

    <!-- 参数传递 3 -->
    <button @click='userClick'>用户</button>
    <button @click='profileClick'>档案</button>

    <keep-alive exclude="Profile,user">
      <!-- <router-view></router-view> -->
      <router-view />
    </keep-alive>
    <span>{{getUserId}}</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      userId: 'Elena_K'
    }
  },
  computed: {
    getUserId(){
      return this.$route.params.userId;
    }
  },
  methods: {
    userClick(){
      this.$router.push('/user/' + this.userId);
    },
    profileClick(){
      this.$router.push({
        path: '/profile',
        query: {
          name: 'Elena_k',
          age: 18
        }
      })
    }
  }
}
</script>

<style>
 .active {
   color: #f00;
 }
</style>
