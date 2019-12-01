<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈！</p>
    <router-link to='/home/news'>新闻</router-link>
    <router-link to='/home/message'>消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      path: '/home/news'
    }
  },
  // created(){
  //   console.log('Home created');
  // },
  // destroyed () {//当离开当前组件时，就会执行destoryed这个生命周期函数
  //   console.log('Home destoryed');
  // },
  activated(){//此函数在使用<keep-alive>标签时，才有作用
    console.log('Home activated');
    this.$router.push(this.path);
    console.log(this.$route.path);
  },
  beforeRouteLeave(to, from, next){
    // console.log( this.$route.path);
    this.path = this.$route.path;
    next();
  }
}
</script>

<style scope>

</style>