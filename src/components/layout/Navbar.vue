<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    ]"
  >
    <nav class="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

      <a href="#" class="font-['Syne'] font-bold text-lg tracking-tight shrink-0">
        <span class="text-white">Luis</span>
        <span class="text-sky-400">.</span>
      </a>

      <ul class="hidden md:flex items-center gap-8 h-full">
        <li v-for="group in groupedNavLinks" :key="group.href" class="relative group h-full flex items-center">
          <div class="flex items-center gap-1 cursor-pointer">
            <a
              :href="group.href"
              class="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              {{ group.label }}
            </a>
            <button v-if="group.children" class="text-slate-500 group-hover:text-sky-400 transition-colors duration-200">
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div v-if="group.children" class="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div class="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
              <a
                v-for="child in group.children"
                :key="child.href"
                :href="child.href"
                class="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5 group/item"
                :class="child.highlight === 'dashboard' ? 'text-sky-400 hover:text-sky-300' : 'text-slate-400 hover:text-white'"
              >
                <span v-if="child.highlight === 'dashboard'" class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
                {{ child.label }}
              </a>
            </div>
          </div>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-3 shrink-0">
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
          href="https://drive.google.com/file/d/1bcaZYKUrnkAK_6G6ZNnfOXKcUtUnbvga/view?usp=sharing"
          target="_blank"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium hover:bg-sky-400/20 transition-all duration-200 whitespace-nowrap"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ t('nav.hireMe') }}
        </a>
      </div>

      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden text-slate-400 hover:text-white transition-colors p-1"
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

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden bg-surface border-t border-border px-6 py-5 flex flex-col gap-1"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="mobileOpen = false"
          :class="[
            'transition-colors text-sm py-3 px-2 rounded-lg flex items-center gap-2.5 border border-transparent hover:border-white/6 hover:bg-white/3',
            link.highlight === 'ai'
              ? 'text-violet-400'
              : link.highlight === 'dashboard'
                ? 'text-sky-400'
                : 'text-slate-300 hover:text-white'
          ]"
        >
          <span v-if="link.highlight === 'dashboard'" class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
          <span v-if="link.highlight === 'ai'" class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
          {{ link.label }}
        </a>

        <div class="grid grid-cols-3 gap-2 pt-3 mt-2 border-t border-border">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click.stop="setLocale(lang.code)"
            :class="[
              'py-2.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center justify-center gap-1.5',
              locale === lang.code
                ? 'bg-sky-400/20 text-sky-400 border-sky-400/30'
                : 'text-slate-500 border-border hover:text-slate-300 hover:border-white/10'
            ]"
          >
            {{ lang.flag }} {{ lang.code.toUpperCase() }}
          </button>
        </div>

        <a
          href="https://drive.google.com/file/d/1bcaZYKUrnkAK_6G6ZNnfOXKcUtUnbvga/view?usp=sharing"
          target="_blank"
          @click="mobileOpen = false"
          class="mt-3 text-center py-3 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium hover:bg-sky-400/20 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ t('nav.hireMe') }}
        </a>
      </div>
    </Transition>
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

interface NavLink {
  label: string
  href: string
  highlight?: string
}

interface NavGroup {
  label: string
  href: string
  children?: NavLink[]
}

const groupedNavLinks = computed<NavGroup[]>(() => [
  {
    label: t('nav.about'),
    href: '#about',
    children: [
      { label: t('nav.experience'), href: '#experience' },
      { label: t('nav.skills'), href: '#skills' },
      { label: t('nav.certifications'), href: '#certifications' },
    ]
  },
  {
    label: t('nav.projects'),
    href: '#projects',
    children: [
      { label: t('nav.dashboard'), href: '#dashboard', highlight: 'dashboard' },
    ]
  },
  {
    label: t('nav.contact'),
    href: '#contact'
  }
])

const navLinks = computed<NavLink[]>(() => {
  const links: NavLink[] = []
  groupedNavLinks.value.forEach(group => {
    links.push({ label: group.label, href: group.href })
    if (group.children) {
      group.children.forEach(child => {
        links.push(child)
      })
    }
  })
  return links
})

const scrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  if (mobileOpen.value) mobileOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
