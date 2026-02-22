<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    ]"
  >
    <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

      <a href="#" class="font-['Syne'] font-bold text-lg tracking-tight">
        <span class="text-white">Luis</span>
        <span class="text-sky-400">.</span>
      </a>

      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-3">
        <div class="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="setLocale(lang.code)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium transition-all duration-200',
              locale === lang.code
                ? 'bg-sky-400/20 text-sky-400'
                : 'text-slate-500 hover:text-slate-300'
            ]"
          >
            {{ lang.flag }} {{ lang.code.toUpperCase() }}
          </button>
        </div>

        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium hover:bg-sky-400/20 transition-all duration-200"
        >
          {{ t('nav.hireMe') }}
        </a>
      </div>

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

    <div
      v-show="mobileOpen"
      class="md:hidden bg-surface border-t border-border px-6 py-6 flex flex-col gap-4"
    >
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        @click="mobileOpen = false"
        class="text-slate-300 hover:text-white transition-colors text-base py-1"
      >
        {{ link.label }}
      </a>

      <div class="grid grid-cols-3 gap-2 pt-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click.stop="setLocale(lang.code)"
          :class="[
            'py-2 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center justify-center gap-1',
            locale === lang.code
              ? 'bg-sky-400/20 text-sky-400 border-sky-400/30'
              : 'text-slate-500 border-border hover:text-slate-300'
          ]"
        >
          {{ lang.flag }} {{ lang.code.toUpperCase() }}
        </button>
      </div>

      <a
        href="#contact"
        @click="mobileOpen = false"
        class="mt-2 text-center py-2 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 font-medium"
      >
        {{ t('nav.hireMe') }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppNavbar' })

const { t, locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇨🇴' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

const setLocale = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

const navLinks = computed(() => [
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.skills'), href: '#skills' },
  { label: t('nav.projects'), href: '#projects' },
  { label: t('nav.contact'), href: '#contact' },
])

const scrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
