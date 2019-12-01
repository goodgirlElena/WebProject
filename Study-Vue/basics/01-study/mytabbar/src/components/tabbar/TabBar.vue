<template>
 <div id="tabbar">
   <slot></slot>
 </div>
</template>

<script>
 export default {
  name: 'TabBar',
 }
</script>

<style scoped>
  #tabbar {
    height: 49px;
    background-color: #f6f6f6;
    box-shadow: 0 -2px 3px rgba(255,255,255,0.2);
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
 
</style>
