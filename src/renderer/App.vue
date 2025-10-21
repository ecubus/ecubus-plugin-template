<script setup lang="ts">
import { onUnmounted } from 'vue'
import useData from '@ecubus-pro/renderer-plugin-sdk'
const data=useData()

const interval = setInterval(() => {
    data['6'] = Math.random()
    console.log('data', data)
  }, 1000)


onUnmounted(() => {
  clearInterval(interval)
})  
</script>

<template>
  <h1>You did it1!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    
    {{ data['6'] }}
  </p>
</template>

<style scoped></style>
