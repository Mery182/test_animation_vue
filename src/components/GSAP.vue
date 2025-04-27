<template>
  <div>
    <header>
      <h2>GSAP</h2>
      <router-link to="/">
        <button id="button-two">CSS animation</button>
      </router-link>
      <router-link to="/js">
        <button id="button-two">JS animation</button>
      </router-link>
      <router-link to="/anime">
        <button id="button-two">AnimeJS</button>
      </router-link>
    </header>

    <transition-group name="fade" tag="div" class="all-box" id="gsap-box">
      <div v-for="card in cards" :key="card.id" class="card"></div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { gsap } from 'gsap'

const totalCards = 200
const cards = ref([])

function createCard(index) {
  return { id: index }
}

function addCards() {
  // Заполняем массив карточками
  cards.value = Array.from(
    { length: totalCards },
    (_, i) => createCard(i)
  )

  // Ждём, пока Vue обновит DOM, и затем запускаем GSAP-анимацию
  nextTick(() => {
    cards.value.forEach((_, i) => {
      gsap.fromTo(
        `.card:nth-child(${i + 1})`,
        { opacity: 0, x: 300 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
          delay: i * 0.1
        }
      )
    })
  })
}

// При монтировании компонента — сразу запускаем анимацию
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

/* Пример стилей для карточек — подставьте свои из main.css */
.all-box {
  display: flex;
  flex-wrap: wrap;
}
</style>