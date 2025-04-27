<template>
  <div>
    <header>
      <h2>CSS animation</h2>
      <div>
        <router-link to="/js"><button id="button-two">JS анимация</button></router-link>
        <router-link to="/anime"><button id="button-two">AnimeJS</button></router-link>
        <router-link to="/gsap"><button id="button-two">GSAP</button></router-link>

      </div>
    </header>
    <BoxContainer ref="boxContainer" />
  </div>
</template>

<script setup>
import BoxContainer from '../components/BoxContainer.vue';

</script>
