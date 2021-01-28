<template>
  <h1>{{ msg }}</h1>
  <p>{{$store.state.counter}}</p>
  <el-button @click="state.count++">count is: {{ state.count }}</el-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from "vue";
import request from 'utils/request'

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });

try {
  const users = await request('/users')
  console.log(users);
  
} catch (error) {
  console.log(error);
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
