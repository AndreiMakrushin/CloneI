<script setup>
  import {useRouter} from "vue-router"
  const {character} = defineProps(['character'])

  const router = useRouter()
</script>
<template>
    <a-card hoverable style="width: 240px" class="card" @click="router.push(`/profile/${character.name}`)">
      <template #cover>
        <img alt="example" :src="character.image" />
      </template>
      <a-card-meta :title="character.name">
        <template #description>{{ character.description }}</template>
      </a-card-meta>
    </a-card>
  </template>
  <style scoped>
    .card{
        margin-bottom: 20px;
    }
  </style>