<script setup>
import {RouterLink, useRouter} from "vue-router"
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import {ref} from "vue"

const router = useRouter()
const searchUsername = ref("")
const isAuthentication = ref(false)
const onSearch = () =>{
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
        searchUsername.value = ""
    }
}
</script>
<template>
    <div>
        <ALayoutHeader>
            <Container>
                <div class="nav-container">
                    <div class="l-container">
                        <RouterLink to="/">
                            Clone Instagram
                        </RouterLink>
                        <a-input-search
                            v-model:value="searchUsername"
                            placeholder="Найти пользователя"
                            style="width: 200px"
                            @search="onSearch"
                        />
                    </div>
                <div class="r-container" v-if="!isAuthentication">
                    <AuthModal :isLogin="false"/>
                    <AuthModal :isLogin="true"/>
                </div>
                <div class="r-container" v-else>
                    <AButton type="primary">Профиль</AButton>
                </div>
                </div>
            </Container>
        </ALayoutHeader>
    </div>
</template>
<style scoped>
    .nav-container{
        display: flex;
        justify-content: space-between;
    }
    .btn{
        margin-right: 5px;
    }
    .l-container{
        display: flex;
        align-items: center;
    }
    .l-container a {
        margin-right: 10px;
    }
    .r-container{
        display: flex;
        align-items: center;
    }
</style>