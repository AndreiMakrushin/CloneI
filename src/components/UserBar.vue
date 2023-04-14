<script setup>
    import UploadPhotoModal from './UploadPhotoModal.vue';
    import { useRoute } from 'vue-router';
    import { useUserStore } from '../stores/users';
    import { storeToRefs } from 'pinia';
    const route = useRoute()
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    const {username: profileUsername} = route.params

    const props = defineProps(['people', 'addNewPost', 'images']);
</script>
<template>
    
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.people}}</a-typography-title>
            <div>
                <UploadPhotoModal 
                    v-if="user && profileUsername === user.username"
                    :addNewPost="addNewPost"
                />
                <AButton v-else>Follow</AButton>
            </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.images.length }} : post</a-typography-title>
            <a-typography-title :level="5"><!-- {{ people.species }} -->0 : followers</a-typography-title>
            <a-typography-title :level="5"><!-- {{ people.url }} -->0 : following</a-typography-title>
        </div>
    </div>
</template>
<style scoped>
    .userbar-container{
        padding-bottom: 75px;
        min-width: 100%;
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
    .top-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>