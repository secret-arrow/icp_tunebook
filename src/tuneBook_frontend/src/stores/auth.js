import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', () => {
//   const userIdentity = ref("")
//   const userProfile = ref({});

//   function setUserProfile (userData) {
//     userProfile.value = userData;
//   }
//   function setIdentity (identity) {
//     userIdentity.value = identity;
//   }

//   return { userProfile, userIdentity, setIdentity, setUserProfile }
// })


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userIdentity: "",
    userProfile: {}
  }),
  actions: {
      setUserProfile(userData) {
          this.userProfile = userData
      },
      setIdentity(identity) {
        this.userIdentity = identity
      }
  },
  persist: {
      enabled: true,
      strategies: [
          { 
              key: 'my_store',
              storage: localStorage
          }
      ]
  }
})