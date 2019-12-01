<template>
  <div id="app">
    <h2>--------- App组件内容 ---------------</h2>
    <h1>{{$store.state.info}}</h1>
    <button @click='updateInfo'>修改信息</button>
    <h1>{{$store.state.counter}}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    
    <h2>----------------getters内容------------------</h2>
    <p>{{$store.getters.more20age}}</p>
    <p>{{$store.getters.more20age.length}}</p>
    <p>{{$store.getters.moreAge(16)}}</p>
    <h2>---------------- Hello Vuex组件内容 ---------------</h2>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from 'components/HelloVuex';
import {
  INCREMENT
} from './store/mutations-type'
export default {
  name: 'App',
  components: {
    HelloVuex
  },
  methods: {
    add(){
      this.$store.commit(INCREMENT);//提交vuex中store中的mutations里面的increment方法，用来跟踪数据的变化
    },
    sub(){
      this.$store.commit('decrement')//提交vuex中store中的mutations里面的decrement方法，用来跟踪数据的变化
    },
    //mutation中函数的第一种传参方式
    // addCount(count){
    //   this.$store.commit('addCount',count);
    // }
   // mutation中函数的第二种传参方式
    addCount(count){
      this.$store.commit({
        type: 'addCount',
        count
      })
    },
    updateInfo(){
      // this.$store.commit('updateInfo');
      // this.$store.dispatch('aupdateInfo',{
      //   payload: '我是携带的信息',
      //   success(){
      //     console.log('里面的信息已经处理完毕！')
      //   }
      // });

      this.$store
      .dispatch('aupdateInfo',  '我是携带的信息')
      .then((res) => {
        console.log('里面已经处理完毕！');
        console.log(res);
      })
    }
  }
}
</script>

<style>

</style>
