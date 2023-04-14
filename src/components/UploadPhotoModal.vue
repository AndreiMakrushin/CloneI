<script setup>
import {  ref } from 'vue';
import {supabase} from '../supabase'
import{useUserStore} from '../stores/users'
import { storeToRefs } from 'pinia';


    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)

    const props = defineProps(['addNewPost'])
    const loading = ref(false)
    const visible = ref(false);
    const caption = ref("")
    const file = ref(null)

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = async (e) => {
      loading.value = true
      const fileNAme = Math.floor(Math.random() * 1000000000)
      let filePath
      if (file.value) {
       const {data, error} = await supabase.storage.from("images").upload('public/' + fileNAme, file.value)
       if (data) {
        filePath = data.path
        await supabase.from("posts").insert({
          url: filePath,
          caption: caption.value,
          owner_id: user.value.id
        })
       }
      }
      loading.value = false
      visible.value = false
      caption.value = ""
      
      props.addNewPost({
          url: filePath,
          caption: caption.value
      })
    }
    const handleUploadChange = (e) =>{
      if (e.target.files[0]) {
        file.value = e.target.files[0]
      }
    }
</script>
<template>
    <div>
      <a-button  @click="showModal">Загрузить фотографию</a-button>
      <a-modal v-model:visible="visible" width="1000px" title="Загрузить фотографию" @ok="handleOk">
        <div v-if="!loading"> 
          <input type="file" accept=".jpeg,.png" @change="handleUploadChange">
        <input type="text" v-model="caption" placeholder="Название" class="textContent"/>
        </div>
        <div v-else>
          <ASpin />
        </div>
      </a-modal>
    </div>
  </template>
  <style scoped>
    .textContent{
      width: 100%;
      margin-top: 5px;
      
    }
  </style>
 