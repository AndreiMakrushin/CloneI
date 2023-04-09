import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {}

  const handleSignup = async (credentials) => {
    const {email, password, username} = credentials

    if (password.length < 6) {
      return errorMessage.value = "Пароль слишком короткий"
    }
    if (username.length < 4) {
      return errorMessage.value = "Имя пользователя, слишком короткое"
    }
    if(!validateEmail(email)){
      return errorMessage.value = "проверьте правильность заполнения электронной почты"
    }
    loading.value = true
    const {data: userExistsWithUsername} = await supabase
    .from("users")
    .select()
    .eq('email', email)
    .single()

   if (userExistsWithUsername) {
    loading.value = false
    return errorMessage.value = "Такая электронная почта уже зарегистрирована"
   } 
   errorMessage.value = ""
    //user//
    const {error} = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }
    
    await supabase.from("users").insert({
      email,
      username
    })
    loading.value = false
  }

  const handleLogout = () => {}

  const getUser = () => {}

  const clearMessage = () =>{
    errorMessage.value = ""
  }
  
  return { user, errorMessage, loading, handleLogin, handleSignup, handleLogout, getUser, clearMessage}
})
