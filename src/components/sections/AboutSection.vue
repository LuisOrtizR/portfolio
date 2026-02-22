<template>
  <section id="about" class="section-padding max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 gap-16 items-center">

      <div>
        <p class="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">{{ t('about.tag') }}</p>
        <h2 class="font-['Syne'] text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {{ t('about.heading1') }}<br/>
          {{ t('about.heading2') }}
        </h2>
        <div class="space-y-4 text-slate-400 leading-relaxed">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-10">
          <div
            v-for="value in values"
            :key="value.key"
            class="p-4 rounded-xl bg-surface border border-border"
          >
            <span class="text-xl mb-2 block">{{ value.icon }}</span>
            <p class="text-white text-sm font-medium">{{ t(`about.values.${value.key}.label`) }}</p>
            <p class="text-slate-500 text-xs mt-0.5">{{ t(`about.values.${value.key}.desc`) }}</p>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute -inset-4 bg-sky-500/5 rounded-3xl blur-xl" />
        <div class="relative bg-surface border border-border rounded-2xl p-8 space-y-6">

          <div class="flex items-center gap-3 pb-6 border-b border-border">
            <div
              class="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-sky-400/30 cursor-pointer hover:ring-sky-400 transition-all duration-200"
              @click="lightboxOpen = true"
            >
              <img
                src="https://i.ibb.co/JhnHg7C/Profile.png"
                alt="Luis Ortiz"
                class="w-full h-full object-cover object-top"
                referrerpolicy="no-referrer"
                draggable="false"
              />
            </div>
            <div>
              <p class="text-white font-semibold">Luis Ortiz</p>
              <p class="text-slate-500 text-sm">{{ t('about.profile.role') }}</p>
            </div>
            <span class="ml-auto text-xs px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 whitespace-nowrap">
              {{ t('about.profile.openToWork') }}
            </span>
          </div>

          <div v-for="item in profileItems" :key="item.labelKey" class="flex items-center justify-between text-sm">
            <span class="text-slate-500">{{ t(item.labelKey) }}</span>
            <span class="text-slate-300">{{ t(item.valueKey) }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          @click.self="lightboxOpen = false"
        >
          <div class="relative max-w-sm w-full">
            <button
              @click="lightboxOpen = false"
              class="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-surface border border-border text-slate-400 hover:text-white flex items-center justify-center transition-colors z-10"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <img
              src="https://i.ibb.co/JhnHg7C/Profile.png"
              alt="Luis Ortiz"
              class="w-full rounded-2xl ring-2 ring-sky-400/30 object-cover"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AboutSection' })

const { t } = useI18n()
const lightboxOpen = ref(false)

const values = [
  { key: 'performance', icon: '⚡' },
  { key: 'architecture', icon: '🏗️' },
  { key: 'precision', icon: '🎯' },
  { key: 'delivery', icon: '🚀' },
]

const profileItems = [
  { labelKey: 'about.profile.location', valueKey: 'about.profile.locationValue' },
  { labelKey: 'about.profile.experience', valueKey: 'about.profile.experienceValue' },
  { labelKey: 'about.profile.focus', valueKey: 'about.profile.focusValue' },
  { labelKey: 'about.profile.english', valueKey: 'about.profile.englishValue' },
  { labelKey: 'about.profile.status', valueKey: 'about.profile.statusValue' },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
