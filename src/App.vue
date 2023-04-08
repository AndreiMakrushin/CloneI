<script setup>
import Nav from './components/Nav.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
    <Nav/>
    <RouterView/>
  </main>
</template>

<style scoped>
  .btn{
    width: 100%;
  }
</style>
