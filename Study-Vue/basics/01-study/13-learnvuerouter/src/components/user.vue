<template>
 <div>
    <h2>我是用户</h2>
    <p> 我是用户内容，嘿嘿嘿！</p>
 </div>
</template>

<script>
 export default {
  name: 'user',
  created () {
    console.log('user created');
  },
  destroyed () {
    console.log('user destroyed');
  }
 }
</script>

<style scoped>

 
</style>
