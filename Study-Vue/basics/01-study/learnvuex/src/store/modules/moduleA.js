export default {
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