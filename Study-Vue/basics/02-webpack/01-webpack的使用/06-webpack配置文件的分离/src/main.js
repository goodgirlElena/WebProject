// 1. commonJs 模块化规范
const {add,mul} = require('./js/mathTools.js');
console.log(add(20, 30));
console.log(mul(20, 30));

// 2. ES6 模块化规范
import {name,age,height} from './js/info'

console.log(name);
console.log(age);
console.log(height);

//3.依赖CSS文件
require('./css/normal.css')

//4.使用vue进行开发
import Vue from 'vue';
// import App from './vue/app.js'
//此处的.vue可以省略掉 因为我们在webpack.config.js中配置了 extensions 属性
import App from './vue/App.vue'

const vm = new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }
})