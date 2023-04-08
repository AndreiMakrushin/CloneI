<script setup>
    import axios from "axios"
    import {ref} from "vue"
    import Container from './Container.vue'
    import Card from './Card.vue'

    const characters = ref(null)
    const response = await axios.get(`https://rickandmortyapi.com/api/character`);
    characters.value = response.data.results
   
</script>
<template>
    <Container>
        <div class="timeline-container">
            <Card v-for="character in characters" :key="character.id" :character="character"/>
        </div>
    </Container>
</template>
<style scoped>
    .timeline-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }
</style>
/* https://api.minako.moe/anime/image */