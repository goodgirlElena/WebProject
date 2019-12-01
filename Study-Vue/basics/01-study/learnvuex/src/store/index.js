import Vue from 'vue';
import Vuex from 'vuex';
import {
  INCREMENT
} from './mutations-type';
import moduleA from './modules/moduleA';

//1. 安装插件，导入Vuex对象
Vue.use(Vuex);

const moduleA = {
  state: {
    name: 'Elena_K'
  },
  mutations: {
    updatedName (state) {
      state.name = 'Ann';
    }
  },
  getters: {
    fullName(state){
      state.name + 'aaa';
    }
  },
  actions: {
    aupdateName(context){
      setTimeout(() => {
        context.commit('updatedName');
      },1000)
    }
  }
}

//2. 创建vuex实例
const store = new Vuex.Store({
  state: {
    counter: 100,
    student: [
      {id: 110, name: 'Anny', age: 18},
      {id: 111, name: 'Ann', age: 20},
      {id: 112, name: 'Elena_K', age: 23},
      {id: 113, name: 'Jin', age: 16}
    ],
    info: {name: 'John', age: 22, height: 1.98}
  },
  mutations: {
    [INCREMENT](state){
      state.counter++;
    },
    decrement(state){
      state.counter--;
    },
    //mutation中函数的第一种传参方式
    // addCount(state,count){
    //   state.counter += count;
    // }
    //mutation中函数的第二种传参方式
    addCount(state,payload){
      state.counter += payload.count;
    },
    updateInfo(state){
      Vue.set(state.info,'address','China');
      Vue.delete(state.info,'age');
    }
  },
  actions: {
    // aupdateInfo(context,paras){
    //   setTimeout(() => {  
    //     context.commit('updateInfo');
    //     console.log(paras.payload);
    //     paras.success();
    //   },1000)
    // }

    aupdateInfo(context,payload){
      return new Promise((resolve,reject) => {
        setTimeout(() => {  
              context.commit('updateInfo');
              console.log(payload);
              resolve('success!');
            },1000)
      })
    }
  },
  getters: {
    powerCounter(state){
      state.counter*state.counter;
    },
    more20age(state){
      return state.student.filter(s => s.age > 18);
    },
    more20ageLength(state,getters){
      return getters.more20age.length;
    },
    moreAge(state){
      return (age) => {
        return state.student.filter(s => s.age > age);
      }
    }
  },
  modules: {
    a: moduleA
  }
})

//3. 导出vuex的store对象
export default store;