<template>
  <div class="min-h-full font-Poppins box-border">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
  components: {
    Navigation,
  },

}
</script>

<style>
/* Add your own styles here */
</style>
