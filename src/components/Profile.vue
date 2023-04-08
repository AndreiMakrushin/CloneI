<script setup>
    import axios from "axios"
    import {ref} from "vue"
    import { useRoute } from 'vue-router';
    import Container from './Container.vue'
    import UserBar from "./UserBar.vue"
    import ImageGallary from './ImageGallary.vue'
    const route = useRoute()
    
    const characters = ref(null)
    const response = await axios.get(`https://rickandmortyapi.com/api/character`);
    characters.value = response.data.results

    
    const userName = route.params.username
    const user = characters.value.filter(user => user.name.toLowerCase().includes(userName.toLowerCase()))
 
    
</script>
<template>
    <Container>
        <div class="profile-container" v-for="people in user" :key="people.id">
            <UserBar :people="people"/>
            <ImageGallary :images="people.image"/>
        </div>
    </Container>
</template>
<style scoped>
    .profile-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }
</style>