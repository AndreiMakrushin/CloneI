<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users";

const userStore = useUserStore();
const {errorMessage, handleSignup} = userStore
const props = defineProps(["isLogin"]);

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const title = props.isLogin ? "Войти" : "Зарегистрироваться";

const name = ref("");
const pass = ref("");
const email = ref("");
</script>
<template>
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{
      title
    }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <a-input
        class="input"
        v-if="!isLogin"
        v-model:value="name"
        placeholder="Username"
      />
      <a-input class="input" v-model:value="pass" placeholder="Pass" />
      <a-input class="input" v-model:value="email" placeholder="Email" />
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
