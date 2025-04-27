<script setup>
import { onMounted } from 'vue'
import { initWebVitals } from './composables/webVitals.js'
import { useStats } from './composables/useStats.js'
useStats()
initWebVitals()
// onMounted(() => {
//   initWebVitals()
// })

</script>
<template>
  <router-view />
</template>
