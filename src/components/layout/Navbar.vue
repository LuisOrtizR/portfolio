<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    ]"
  >
    <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

      <!-- Logo -->
      <a href="#" class="font-['Syne'] font-bold text-lg tracking-tight">
        <span class="text-white">Luis</span>
        <span class="text-sky-400">.</span>
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in nav" :key="link.href">
          <a
            :href="link.href"
            class="text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- CTA Desktop -->
      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium hover:bg-sky-400/20 transition-all duration-200"
      >
        Hire me
      </a>

      <!-- Mobile Toggle -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden text-slate-400 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-surface border-t border-border px-6 py-6 flex flex-col gap-4"
      >
        <a
          v-for="link in nav"
          :key="link.href"
          :href="link.href"
          @click="mobileOpen = false"
          class="text-slate-300 hover:text-white transition-colors text-base py-1"
        >
          {{ link.label }}
        </a>
        <a
          href="#contact"
          @click="mobileOpen = false"
          class="mt-2 text-center py-2 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 font-medium"
        >
          Hire me
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '@/config/site.config'

defineOptions({ name: 'AppNavbar' })

const nav = siteConfig.nav
const scrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
