<template>
  <section id="nasa" class="section-padding bg-bg w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('nasa.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          {{ t('nasa.heading') }}
        </h2>
        <p class="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
          {{ t('nasa.subtitle') }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center gap-5 py-24">
        <div class="relative w-10 h-10">
          <div class="absolute inset-0 rounded-full border-2 border-white/6"></div>
          <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 animate-spin"></div>
        </div>
        <p class="text-slate-500 text-sm">{{ t('nasa.loading') }}</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center gap-4 py-24">
        <div class="w-12 h-12 rounded-2xl bg-red-500/8 border border-red-500/20 flex items-center justify-center text-red-400 text-xl">✗</div>
        <p class="text-slate-500 text-sm">{{ error }}</p>
        <button
          @click="fetchApod"
          class="px-5 py-2.5 rounded-xl bg-sky-400/8 border border-sky-400/20 text-sky-400 text-sm font-medium hover:bg-sky-400/15 transition-all duration-200"
        >
          {{ t('nasa.retry') }}
        </button>
      </div>

      <!-- Content -->
      <div v-else-if="apod" class="grid md:grid-cols-2 gap-6 items-start">

        <!-- Media -->
        <div class="relative rounded-2xl overflow-hidden border border-white/8 group bg-surface">
          <iframe
            v-if="apod.media_type === 'video'"
            :src="apod.url"
            frameborder="0"
            allowfullscreen
            class="w-full aspect-video"
          />
          <img
            v-else
            :src="apod.hdurl || apod.url"
            :alt="apod.title"
            class="w-full object-cover max-h-120 transition-transform duration-700 group-hover:scale-[1.03]"
            :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
            style="transition: opacity .6s ease, transform .7s ease"
            @load="imageLoaded = true"
          />
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <!-- Date badge -->
          <span class="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-slate-300 font-medium">
            {{ formatDate(apod.date) }}
          </span>
        </div>

        <!-- Info card -->
        <div class="rounded-2xl border border-white/8 bg-surface overflow-hidden">
          <div class="h-px bg-linear-to-r from-sky-500/0 via-sky-400/40 to-sky-500/0" />
          <div class="p-6 md:p-7 flex flex-col gap-6">

            <div>
              <h3 class="font-['Syne'] text-lg md:text-xl font-bold text-white leading-snug mb-1.5">
                {{ apod.title }}
              </h3>
              <p v-if="apod.copyright" class="text-slate-600 text-xs">
                © {{ apod.copyright.trim() }}
              </p>
            </div>

            <!-- Explanation -->
            <div class="relative">
              <p
                class="text-slate-400 text-sm leading-[1.8] overflow-hidden transition-all duration-500"
                :style="{ maxHeight: showFull ? '800px' : '88px' }"
              >
                {{ apod.explanation }}
              </p>
              <div
                v-if="!showFull"
                class="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-surface to-transparent pointer-events-none"
              />
            </div>

            <button
              @click="showFull = !showFull"
              class="text-sky-400 text-xs font-semibold self-start hover:text-sky-300 transition-colors tracking-wide"
            >
              {{ showFull ? t('nasa.seeLess') : t('nasa.seeMore') }}
            </button>

            <!-- Meta chips -->
            <div class="flex flex-wrap gap-2 pt-4 border-t border-white/6">
              <span class="px-2.5 py-1 text-xs rounded-lg bg-white/4 border border-white/6 text-slate-400">NASA APOD</span>
              <span class="px-2.5 py-1 text-xs rounded-lg bg-white/4 border border-white/6 text-slate-400">{{ apod.media_type === 'video' ? 'Video' : 'Image' }}</span>
              <span class="px-2.5 py-1 text-xs rounded-lg bg-white/4 border border-white/6 text-slate-400">REST API</span>
              <span class="px-2.5 py-1 text-xs rounded-lg bg-white/4 border border-white/6 text-slate-400">fetch · async/await</span>
            </div>

            <a
              v-if="apod.media_type !== 'video'"
              :href="apod.hdurl || apod.url"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400/8 border border-sky-400/20 text-sky-400 text-sm font-medium hover:bg-sky-400/15 transition-all duration-200 self-start"
            >
              {{ t('nasa.viewHd') }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'NasaApodSection' })

const { t } = useI18n()

interface Apod {
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: 'image' | 'video'
  date: string
  copyright?: string
}

const apod = ref<Apod | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showFull = ref(false)
const imageLoaded = ref(false)

const API_KEY = import.meta.env.VITE_NASA_API_KEY as string

const fetchApod = async () => {
  loading.value = true
  error.value = null
  imageLoaded.value = false
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    if (!res.ok) throw new Error(`Error ${res.status}`)
    apod.value = await res.json()
  } catch {
    error.value = t('nasa.error')
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr: string): string => {
  const parts = dateStr.split('-')
  const year = parts[0] ?? ''
  const month = parts[1] ?? '1'
  const day = parts[2] ?? ''
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${day} ${months[parseInt(month) - 1]} ${year}`
}

onMounted(fetchApod)
</script>
