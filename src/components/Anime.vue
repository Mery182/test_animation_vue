<template>
  <div>
    <header>
      <h2>Transition-Group + AnimeJS</h2>
      <router-link to="/"><button id="button-two">Главная</button></router-link>
      <router-link to="/gsap"><button id="button-two">GSAP</button></router-link>
      <button @click="toggleCards">Toggle Cards: <strong>{{ cardsActive ? 'ON' : 'OFF' }}</strong></button>
    </header>
    <transition-group name="fade" tag="div" class="all-box" id="anime-box">
      <div v-for="card in cards" :key="card.id" class="card"></div>
    </transition-group>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  data() {
    return {
      totalCards: 100,
      cardsActive: false,
      cards: []
    };
  },
  methods: {
    createCard(index) {
      return { id: index };
    },
    addCards() {
      this.cards = Array.from({ length: this.totalCards }, (_, i) => this.createCard(i));
      this.$nextTick(() => {
        this.cards.forEach((_, i) => {
          anime({
            targets: `.card:nth-child(${i + 1})`,
            opacity: [0, 1],
            translateX: [300, 0],
            duration: 500,
            easing: 'easeOutElastic',
            delay: i * 100,
          });
        });
      });
    },
    removeCards() {
      this.cards.forEach((_, i) => {
        anime({
          targets: `.card:nth-child(${i + 1})`,
          opacity: [1, 0],
          translateY: [0, 300],
          duration: 500,
          easing: 'easeOutCubic',
          complete: () => {
            if (i === this.totalCards - 1) this.cards = [];
          },
        });
      });
    },
    toggleCards() {
      this.cardsActive = !this.cardsActive;
      if (this.cardsActive) {
        this.addCards();
      } else {
        this.removeCards();
      }
    }
  }
};
</script>