import Vue from 'vue'
import App from './App'
import {request} from './network/request'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

//封装axios发送请求方式一
// request({
//   url: '/category'
// }).then(res => {
//   console.log(res);
// }).catch( err => {
//   console.log(err);
// })

//封装axios发送请求方式二
// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })

//封装axios发送请求方式三
// request({
//   url: '/home/multidata'
// },res => {
//   console.log(res);
// },err => {
//   console.log(err);
// })

//封装axios发送请求方式四
request({
  baseConfig: {
    url: '/home/multidata'
  },
  success(res){
    console.log(res);
  },
  faliure(err){
    console.log(err);
  }
})
