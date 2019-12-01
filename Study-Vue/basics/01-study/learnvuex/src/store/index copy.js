import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import moduleA from './modules/moduleA';
import getters from './getters';

//1. 安装插件，导入Vuex对象
Vue.use(Vuex);

const state = {
  counter: 100,
  student: [
    {id: 110, name: 'Anny', age: 18},
    {id: 111, name: 'Ann', age: 20},
    {id: 112, name: 'Elena_K', age: 23},
    {id: 113, name: 'Jin', age: 16}
  ],
  info: {name: 'John', age: 22, height: 1.98}
}

//2. 创建vuex实例
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    a: moduleA
  }
})

//3. 导出vuex的store对象
export default store;