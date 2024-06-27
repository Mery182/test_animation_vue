<template>
  <div>
    <header>
      <h2>Transition-Group + GSAP</h2>
      <router-link to="/"><button  id="button-two">Главная</button></router-link>
      <router-link to="/anime"><button  id="button-two">AnimeJS</button></router-link>
      <button @click="toggleCards">Toggle Cards: <strong>{{ cardsActive ? 'ON' : 'OFF' }}</strong></button>
    </header>
    <transition-group name="fade" tag="div" class="all-box" id="gsap-box">
      <div v-for="card in cards" :key="card.id" class="card"></div>
    </transition-group>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'GSAP',
  setup() {
    const totalCards = 100;
    const cardsActive = ref(false);
    const cards = ref([]);

    const createCard = (index) => {
      return { id: index };
    };

    const addCards = () => {
      cards.value = Array.from({ length: totalCards }, (_, i) => createCard(i));
      nextTick(() => {
        cards.value.forEach((_, i) => {
          gsap.fromTo(
            `.card:nth-child(${i + 1})`,
            { opacity: 0, x: 300 },
            { opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.3)', delay: i * 0.1 }
          );
        });
      });
    };

    const removeCards = () => {
      cards.value.forEach((_, i) => {
        gsap.to(`.card:nth-child(${i + 1})`, {
          opacity: 0,
          y: 300,
          duration: 0.5,
          ease: 'power2.out',
          delay: (totalCards - i) * 0.05,
          onComplete: () => {
            if (i === totalCards - 1) cards.value = [];
          },
        });
      });
    };

    const toggleCards = () => {
      cardsActive.value = !cardsActive.value;
      if (cardsActive.value) {
        addCards();
      } else {
        removeCards();
      }
    };

    return {
      cards,
      cardsActive,
      toggleCards,
    };
  },
};
</script>