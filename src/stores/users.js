import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const user = ref(null)

  const handleLogin = () => {}
  const handleSignup = () => {}
  const handleLogout = () => {}
  const getUser = () => {}
  
  return { user, handleLogin, handleSignup, handleLogout, getUser}
})
