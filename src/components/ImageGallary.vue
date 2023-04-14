<script setup>
    const props = defineProps(['images'])
</script>
<template>
    <div class="image-gallary-container">
        <img 
        v-for="image in props.images" 
        :key="image" 
        :src="`https://uixdljegstptfmxqclvx.supabase.co/storage/v1/object/public/images/${image.url}`"
        >
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