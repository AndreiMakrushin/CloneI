<script setup>
    const props = defineProps(['people'])
</script>
<template>
    <div class="userbar-container" v-for="people in props" :key="people.id">
        <div class="top-content">
            <a-typography-title :level="2">{{ people.name}}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5"><!-- {{ people.status }} -->0 : post</a-typography-title>
            <a-typography-title :level="5"><!-- {{ people.species }} -->0 : followers</a-typography-title>
            <a-typography-title :level="5"><!-- {{ people.url }} -->0 : following</a-typography-title>
        </div>
    </div>
</template>
<style scoped>
    .userbar-container{
        padding-bottom: 75px;
    }
    .bottom-content{
        display: flex;
        align-items: center;
    }
    .bottom-content h5{
        margin: 0 !important;
        padding: 0;
        margin-right: 30px !important;
        align-items: center;
    }
</style>