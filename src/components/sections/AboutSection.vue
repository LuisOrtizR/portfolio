<template>
  <section id="about" class="section-padding w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start md:items-center">

        <div class="min-w-0">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <p class="text-sky-400 text-xs font-semibold tracking-widest uppercase">{{ t('about.tag') }}</p>
          </div>

          <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {{ t('about.heading1') }}<br/>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">
              {{ t('about.heading2') }}
            </span>
          </h2>

          <div class="space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-10">
            <div
              v-for="value in values"
              :key="value.key"
              class="value-card group p-4 rounded-2xl bg-white/3 border border-white/[0.07] hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 cursor-default"
            >
              <span class="text-xl mb-3 block">{{ value.icon }}</span>
              <p class="text-white text-sm font-semibold mb-1 leading-snug">
                {{ t(`about.values.${value.key}.label`) }}
              </p>
              <p class="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                {{ t(`about.values.${value.key}.desc`) }}
              </p>
            </div>
          </div>
        </div>

        <div class="relative w-full max-w-md mx-auto md:max-w-none">
          <div class="absolute -inset-6 bg-linear-to-br from-sky-500/10 via-transparent to-blue-600/5 rounded-3xl blur-2xl pointer-events-none"></div>

          <div class="relative bg-white/3 border border-white/8 rounded-2xl overflow-hidden">

            <div class="h-1 w-full bg-linear-to-rrom-sky-500 via-blue-500 to-sky-400"></div>

            <div class="p-5 sm:p-6 md:p-8 space-y-0">

              <div class="flex items-center gap-4 pb-5 border-b border-white/6 mb-5">
                <button
                  class="w-14 h-14 rounded-full overflow-hidden ring-2 ring-sky-400/20 hover:ring-sky-400/60 transition-all duration-300 shrink-0 hover:scale-105"
                  @click="lightboxOpen = true"
                >
                  <img
                    src="https://i.ibb.co/BXqKS0Q/Pruebas.jpg"
                    alt="Luis Ortiz"
                    class="w-full h-full object-cover object-center"
                    referrerpolicy="no-referrer"
                    draggable="false"
                  />
                </button>

                <div class="min-w-0 flex-1">
                  <p class="text-white font-bold text-base truncate">Luis Ortiz</p>
                  <p class="text-slate-400 text-sm truncate">{{ t('about.profile.role') }}</p>
                </div>

                <span class="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 whitespace-nowrap shrink-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {{ t('about.profile.openToWork') }}
                </span>
              </div>

              <div class="space-y-3">
                <div
                  v-for="item in profileItems"
                  :key="item.labelKey"
                  class="flex items-center justify-between gap-4 py-2.5 border-b border-white/4 last:border-0"
                >
                  <span class="text-slate-500 text-xs font-medium shrink-0 uppercase tracking-wide">
                    {{ t(item.labelKey) }}
                  </span>
                  <span class="text-slate-200 text-sm text-right font-medium">
                    {{ t(item.valueKey) }}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          @click.self="lightboxOpen = false"
        >
          <div class="relative max-w-sm w-full">
            <button
              @click="lightboxOpen = false"
              class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-10 hover:bg-white/10"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <img
              src="https://i.ibb.co/BXqKS0Q/Pruebas.jpg"
              alt="Luis Ortiz"
              class="w-full rounded-2xl ring-1 ring-sky-400/30 object-cover shadow-2xl"
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
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.value-card {
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.06), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.value-card:hover::before {
  opacity: 1;
}
</style>
