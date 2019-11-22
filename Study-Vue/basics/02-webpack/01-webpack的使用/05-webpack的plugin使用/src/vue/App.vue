<template>
  <div>
    <h1 class="title">{{message}}</h1>
    <button @click="btnClick">按钮</button>
    <Cpn></Cpn>
  </div>
</template>

<script>
  import Cpn from './Cpn'
  export default {
    name: "App",
    components: {
      Cpn
    },
    data(){
      return {
        message: 'Hello Webpack'
      }
    },
    methods: {
      btnClick(){
        console.log('我是按钮');
      }
    }
  }
</script>

<style scoped>
.title {
  color: green;
}
</style>