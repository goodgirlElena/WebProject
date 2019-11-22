<template>
  <div>
    <h1>我是cpn标题</h1>
    <p>我是cpn段落</p>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
  export default {
    name: "Cpn",
    data(){
      return {
        name: 'Elena_K'
      }
    },
    methods: {
      btnClick(){}
    }
  }
</script>

<style scoped>

</style>