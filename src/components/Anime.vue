<template>
  <div>
    <header>
      <h2>AnimeJS</h2>
      <router-link to="/">
        <button id="button-two">CSS animation</button>
      </router-link>
      <router-link to="/js">
        <button id="button-two">JS animation</button>
      </router-link>
      <router-link to="/gsap">
        <button id="button-two">GSAP</button>
      </router-link>
    </header>

    <transition-group name="fade" tag="div" class="all-box" id="anime-box">
      <div v-for="card in cards" :key="card.id" class="card"></div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const totalCards = 200
const cards = ref([])

function createCard(index) {
  return { id: index }
}

function addCards() {
  // fill the array with `totalCards` items
  cards.value = Array.from(
    { length: totalCards },
    (_, i) => createCard(i)
  )

  // wait for DOM update, then animate
  nextTick(() => {
    cards.value.forEach((_, i) => {
      anime({
        targets: `.card:nth-child(${i + 1})`,
        opacity: [0, 1],
        translateX: [300, 0],
        duration: 500,
        easing: 'easeOutElastic',
        delay: i * 100,
      })
    })
  })
}

// automatically run on mount
onMounted(() => {
  addCards()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>