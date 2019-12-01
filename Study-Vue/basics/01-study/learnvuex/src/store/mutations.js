import {
  INCREMENT
} from './mutations-type';

export default {
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
}