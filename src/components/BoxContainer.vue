<template>
    <div id="box-container">
      <div v-for="box in boxes" :key="box.id" class="box" :class="{ 'css-anim': box.cssAnim }" :style="{ transform: box.transform }"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'BoxContainer',
    setup() {
      const boxes = ref([]);
      const toggle = ref(true);
      let rafId = null;
      let start = null;
  
      const duration = 6000;
      const translateY = 500;
      const rotate = 360;
      const scale = 1.4 - 0.6;
  
      const createBoxes = () => {
        for (let x = 0; x < 1000; x++) {
          boxes.value.push({
            id: x,
            transform: '',
            cssAnim: true
          });
        }
      };
  
      const animate = (time) => {
        if (!start) {
          start = time;
          rafId = window.requestAnimationFrame(animate);
          return;
        }
        const progress = (time - start) / duration;
        if (progress < 2) {
          let x = progress * translateY;
          let transform;
          if (progress >= 1) {
            x = (2 - progress) * translateY;
            transform = `translateY(${x}px) rotate(${(2 - progress) * rotate}deg) scale(${0.6 + (2 - progress) * scale})`;
          } else {
            transform = `translateY(${x}px) rotate(${progress * rotate}deg) scale(${0.6 + progress * scale})`;
          }
          boxes.value.forEach(box => {
            box.transform = transform;
          });
        } else {
          start = null;
        }
        rafId = window.requestAnimationFrame(animate);
      };
  
      const toggleAnimation = () => {
        if (toggle.value) {
          boxes.value.forEach(box => {
            box.cssAnim = false;
          });
          rafId = window.requestAnimationFrame(animate);
        } else {
          window.cancelAnimationFrame(rafId);
          boxes.value.forEach(box => {
            box.cssAnim = true;
            box.transform = '';
          });
        }
        toggle.value = !toggle.value;
      };
  
      onMounted(() => {
        createBoxes();
      });
  
      return {
        boxes,
        toggleAnimation
      };
    }
  };
  </script>
  
  <!-- <style scoped>
  .css-anim {
    /* Define your CSS animations here */
  }
  
  .box {
    width: 50px;
    height: 50px;
    background-color: red;
    display: inline-block;
    margin: 2px;
  }
  </style> -->
  
  