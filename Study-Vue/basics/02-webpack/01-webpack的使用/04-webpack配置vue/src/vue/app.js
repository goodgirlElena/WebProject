export default {
  template: `
  <div>
    <h1>{{message}}</h1>
    <button @click="btnClick">按钮</button>
  </div>
  `,
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