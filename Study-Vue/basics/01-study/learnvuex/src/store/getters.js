export default {
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
}