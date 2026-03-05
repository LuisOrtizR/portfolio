<template>
  <div class="min-h-screen bg-bg">
    <Navbar />
    <main>
      <slot />
      <FloatingRobot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import AppFooter from './Appfooter.vue'
import FloatingRobot from '@/components/ui/FloatingRobot.vue'
</script>
