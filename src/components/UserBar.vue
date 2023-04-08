<script setup>
    const props = defineProps(['name', 'userInfo'])
</script>
<template>
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.name }}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.userInfo.posts }}: post</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.followers }}: followers</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.following }}: following</a-typography-title>
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