import { createSessionStorage } from '@utils/cache'
import { defineStore } from 'pinia'

const storage = createSessionStorage()
const redirectUrl = 'REDIRECT_URL'
export const useLoginStore = defineStore('login', {
  state() {
    return {
      redirect: storage.get(redirectUrl) || ''
    }
  },
  actions: {
    setRedirect(url: string) {
      storage.set(redirectUrl, url)
      this.redirect = url
    }
  }
})
