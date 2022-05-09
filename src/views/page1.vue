<script setup lang="ts">
import { UserStore } from '../store/user'
import { computed } from 'vue'
const user = UserStore()
const count = computed(() => {
  return user.getCount
})
</script>

<template>
  <div>111</div>
  <van-button type='primary' @click='user.doubleCount'>Double</van-button>
  <span>{{count}}</span>
</template>

<style>
</style>
