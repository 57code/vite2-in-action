<template>
  <div>
    <HelloWorld msg="hello vue3 + vite"></HelloWorld>
    <router-link to="/home/1">detail1</router-link>
    <router-link to="/home/2">detail2</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import HelloWorld from '/@/components/HelloWorld.vue';
</script>

<style scoped>

</style>