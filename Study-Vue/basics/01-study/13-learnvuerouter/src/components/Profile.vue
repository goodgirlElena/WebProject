<template>
 <div>
   <h2>我是档案</h2>
   <h1>{{$route.query.name}}</h1>
   <h1>{{$route.query.age}}</h1>
 </div>
</template>

<script>
 export default {
  name: 'Profile',
  created () {
    console.log('Profile created');
  },
  destroyed () {
    console.log('Profile destroyed');
  }
 }
</script>

<style scoped>

 
</style>
