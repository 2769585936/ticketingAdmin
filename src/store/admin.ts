import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router/index'

export const useAdminStore = defineStore(
  'admin',
  () => {
    const adminState = ref({})
    const setAdminState = (val: any) => {
      adminState.value = val
    }

    const removeAdminState = () => {
      adminState.value = {}
      localStorage.removeItem('token')
      router.replace('/login')
    }

    const loginAdmin = ({ admin, token }: any) => {
      setAdminState(admin)
      localStorage.setItem('token', token)
      console.log(router)
      router.replace('/index')
    }

    return {
      adminState,
      setAdminState,
      removeAdminState,
      loginAdmin
    }
  },
  {
    persist: true
  }
)
