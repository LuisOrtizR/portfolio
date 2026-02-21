<template>
  <div class="min-h-screen bg-bg">
    <Navbar />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import AppFooter from './AppFooter.vue'
</script>
