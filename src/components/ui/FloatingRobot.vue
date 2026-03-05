<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
  >
    <a
      v-if="visible"
      href="#ai-chat"
      :title="t('aiChat.tag')"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-2 cursor-pointer"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-150"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-2"
      >
        <span
          v-if="hovered"
          class="text-[11px] font-medium text-violet-300 bg-surface border border-violet-400/20 px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
        >
          {{ t('aiChat.tag') }}
        </span>
      </Transition>

      <div
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        class="relative w-12 h-12 rounded-2xl bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shadow-lg hover:bg-violet-400/20 hover:border-violet-400/50 hover:scale-110 transition-all duration-300"
      >
        <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-bg animate-pulse" />

        <svg class="w-6 h-6 text-violet-400 group-hover:text-violet-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="7" y="2" width="10" height="7" rx="2" stroke-width="1.5"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2V1M9.5 5.5h.01M14.5 5.5h.01"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14h.01M12 14h.01M16 14h.01"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21v-2M17 21v-2"/>
        </svg>
      </div>
    </a>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'FloatingRobot' })

const { t } = useI18n()

const visible = ref(false)
const hovered = ref(false)
const offsetY = ref(0)

let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY
      offsetY.value = Math.max(-12, Math.min(12, delta * 0.6))
      setTimeout(() => { offsetY.value = 0 }, 150)
      lastScrollY = currentY
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  lastScrollY = window.scrollY
  setTimeout(() => { visible.value = true }, 800)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
