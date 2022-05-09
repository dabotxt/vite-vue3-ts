import { defineStore } from 'pinia'
import { store } from './index'
interface UserState {
  count: number
}
export const userStore = defineStore('user', {
  state: (): UserState => ({
    count: 1
  }),
  getters: {
    getCount(): number {
      return this.count
    }
  },
  actions: {
    doubleCount() {
      this.count = this.count * 2
    }
  }
})
export function UserStore() {
  return userStore(store)
}