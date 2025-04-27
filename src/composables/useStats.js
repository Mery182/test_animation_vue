// src/composables/useStats.js
import Stats from 'stats.js'
import { onMounted, onBeforeUnmount } from 'vue'

export function useStats() {
  let stats, rafId

  onMounted(() => {
    // 1️⃣ Create the panel
    stats = new Stats()
    stats.showPanel(0) // 0: FPS, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom)

    // 2️⃣ Kick off the loop
    function loop() {
      stats.begin()
      stats.end()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
  })

  onBeforeUnmount(() => {
    // 3️⃣ Cleanup
    cancelAnimationFrame(rafId)
    if (stats?.dom.parentNode) {
      stats.dom.parentNode.removeChild(stats.dom)
    }
  })
}
