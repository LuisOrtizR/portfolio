<template>
  <section id="certifications" class="section-padding w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">{{ t('certifications.tag') }}</p>
        <h2 class="font-['Syne'] text-4xl md:text-5xl font-bold text-white leading-tight">
          {{ t('certifications.heading') }}
        </h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="cert in certifications"
          :key="cert.id"
          class="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          @click="openCert(cert)"
        >
          <!-- Preview iframe thumbnail -->
          <div class="relative w-full h-52 bg-bg overflow-hidden">
            <iframe
              :src="cert.previewUrl"
              class="w-full h-full pointer-events-none scale-[1.02]"
              frameborder="0"
              scrolling="no"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-400/20 border border-sky-400/40 backdrop-blur-sm text-sky-400 text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                {{ t('certifications.view') }}
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-6 flex flex-col gap-4">
            <div class="flex items-start justify-between gap-3 min-w-0">
              <div class="w-9 h-9 min-w-9 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 whitespace-nowrap shrink-0">
                {{ t('certifications.verified') }}
              </span>
            </div>

            <div class="min-w-0">
              <h3 class="font-['Syne'] font-bold text-white text-base leading-snug mb-1">
                {{ t(cert.titleKey) }}
              </h3>
              <p class="text-slate-500 text-sm truncate">{{ t(cert.issuerKey) }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in cert.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs rounded bg-border text-slate-400 whitespace-nowrap group-hover:bg-sky-400/10 group-hover:text-sky-300 transition-colors duration-300"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-border flex-wrap gap-3 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 text-xs">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ cert.date }}
              </div>
              <span class="inline-flex items-center gap-1.5 text-sky-400 text-xs font-medium">
                {{ t('certifications.clickToView') }}
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="activeCert"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
          @click.self="activeCert = null"
        >
          <div class="relative w-full max-w-3xl flex flex-col gap-3">

            <div class="flex items-center justify-between min-w-0">
              <div class="min-w-0">
                <p class="text-white font-semibold text-sm truncate">{{ t(activeCert.titleKey) }}</p>
                <p class="text-slate-500 text-xs truncate">{{ t(activeCert.issuerKey) }}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0 ml-4">
                <a
                  :href="activeCert.driveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-400/10 border border-sky-400/30 text-sky-400 text-xs font-medium hover:bg-sky-400/20 transition-colors"
                  @click.stop
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  {{ t('certifications.openFull') }}
                </a>
                <button
                  @click="activeCert = null"
                  class="w-8 h-8 rounded-full bg-surface border border-border text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="w-full rounded-2xl overflow-hidden border border-border bg-bg" style="height: 70vh;">
              <iframe
                :src="activeCert.previewUrl"
                class="w-full h-full"
                frameborder="0"
                allowfullscreen
              />
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'CertificationsSection' })

const { t } = useI18n()

interface Cert {
  id: number
  titleKey: string
  issuerKey: string
  date: string
  tags: string[]
  previewUrl: string
  driveUrl: string
}

const activeCert = ref<Cert | null>(null)

const openCert = (cert: Cert) => {
  activeCert.value = cert
}

const certifications: Cert[] = [
  {
    id: 1,
    titleKey: 'certifications.items.sena.title',
    issuerKey: 'certifications.items.sena.issuer',
    date: 'Dic 2025',
    tags: ['Análisis de Software', 'Desarrollo Web', 'Bases de Datos', 'Scrum'],
    previewUrl: 'https://drive.google.com/file/d/14auDx1OynK-YJ-ZhS9LSZ-jon8SZHdxm/preview',
    driveUrl: 'https://drive.google.com/file/d/14auDx1OynK-YJ-ZhS9LSZ-jon8SZHdxm/view?usp=drive_link',
  },
  {
    id: 2,
    titleKey: 'certifications.items.ia.title',
    issuerKey: 'certifications.items.ia.issuer',
    date: 'Feb 2026',
    tags: ['IA Generativa', 'Liderazgo', 'Estrategia Empresarial', 'LinkedIn Learning'],
    previewUrl: 'https://drive.google.com/file/d/1JNzviVCRYXjJd1hyOY9B0ETTL7Crre8Z/preview',
    driveUrl: 'https://drive.google.com/file/d/1JNzviVCRYXjJd1hyOY9B0ETTL7Crre8Z/view?usp=drive_link',
  },
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
