<script setup>
import Profile from '../components/Profile.vue';
</script>

<template>
  <main>
    <Suspense><Profile :key="$route.params.username"/></Suspense>
    
  </main>
</template>
