<script setup>
import { ref , reactive} from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const {errorMessage} = storeToRefs(userStore)

const props = defineProps(["isLogin"]);
const visible = ref(false);


const userCredentials = reactive({
  email: "",
  password: "",
  username: ""
})

const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  userStore.handleSignup(userCredentials)
};
const title = props.isLogin ? "Войти" : "Зарегистрироваться";

</script>
<template>
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{
      title
    }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username"/>
      <a-input class="input" v-model:value="userCredentials.password" placeholder="Pass" />
      <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
      <a-typography-text type="danger" v-if="errorMessage">{{ errorMessage }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
  margin-left: 10px;
}
.input {
  margin-top: 10px;
}
</style>
