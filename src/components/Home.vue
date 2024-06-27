
<template>
  <div>
    <header>
      <h2>CSS animation + JS animation</h2>
      <div>
        <button @click="toggleAnimation">Переключение анимации: <span>{{ animationType }}</span></button>
  
      <router-link to="/anime"><button id="button-two">AnimeJS</button></router-link>
      <router-link to="/gsap"><button id="button-two">GSAP</button></router-link>

      </div>
    </header>
    <BoxContainer ref="boxContainer"/>
  </div>
</template>

<script>
import BoxContainer from '../components/BoxContainer.vue';

export default {
  components: {
    BoxContainer
  },
  data() {
    return {
      animationType: 'CSS Animation',
    };
  },
  methods: {
    toggleAnimation() {
      this.$refs.boxContainer.toggleAnimation();
      this.animationType = this.animationType === 'CSS Animation' ? 'requestAnimationFrame' : 'CSS Animation';
    }
  }
};
</script>


