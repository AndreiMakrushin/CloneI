<script setup>
    const props = defineProps(['images'])
</script>
<template>
    <div class="image-gallary-container">
        <img v-for="image in props" :key="image" :src="image" alt="">
    </div>
</template>

<style scoped>
    .image-gallary-container{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
    img{
        margin: 5px;
        width: 200px;
    }
</style>