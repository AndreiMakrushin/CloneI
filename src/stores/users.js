import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const loading = ref(false)
  const loadingUser = ref(false)


  //валидация почты
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //вход в систему
  const handleLogin = async (credentials) => {
    const {email, password} = credentials

    if(!validateEmail(email)){
      return errorMessage.value = "проверьте правильность заполнения электронной почты"
    }
    if (!password.length) {
      return errorMessage.value = "Пароль не может быть пустым"
    }

    loading.value = true
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }
    const {data: existingUser} = await supabase
    .from("users")
    .select()
    .eq('email', email)
    .single()

    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id
    }
    
    loading.value = false
  }
//регистрация в системе

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
    const {data: newUser} = await supabase
    .from("users")
    .select()
    .eq('email', email)
    .single()
    loading.value = false

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getUser = async () => {
    loadingUser.value = true;
    const {data} = await supabase.auth.getUser();

    if(!data.user) {
      loadingUser.value = false;
      return user.value = null
    }

    const {data: userWithEmail} = await supabase
      .from("users")
      .select()
      .eq("email", data.user.email)
      .single()
    
    user.value = {
      username: userWithEmail.username,
      email: userWithEmail.email,
      id: userWithEmail.id
    }

    loadingUser.value = false
  }

  const clearMessage = () =>{
    errorMessage.value = ""
  }
  
  return { user, errorMessage, loading, user, handleLogin, handleSignup, handleLogout, getUser, clearMessage}
})
