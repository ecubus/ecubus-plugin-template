<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import useData from './sdk/data'
const data=useData()
const props = window.$wujie?.props // {data: xxx, methods: xxx}
console.log('props', props)
console.log('parent', window.parent)
const parent=window.parent
const libPath = parent?.electron?.ipcRenderer?.sendSync('ipc-plugin-lib-path')
console.log('libPath', libPath)

let interval:any

onMounted(() => {
  interval = setInterval(() => {
    data['6'] = Math.random()
    console.log('data', data)
  }, 1000)
})

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
