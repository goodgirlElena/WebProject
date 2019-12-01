<template>
 <div class="tabbar-item" @click="itemClick">
    <div v-if='!isActive'>
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="activeStyle">
      <slot name='item-text'></slot>
    </div>
 </div>
</template>

<script>
 export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return {
      // isActive: false
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path);
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {};
    }
  }
 }
</script>

<style scoped>
  .tabbar-item {
      height: 49px;
      flex: 1;
      text-align: center;
    }
  .active {
    color: rgb(255, 87, 119);
  }
 
</style>
