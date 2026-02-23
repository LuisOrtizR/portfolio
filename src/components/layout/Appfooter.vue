<template>
  <footer class="border-t border-border px-6 md:px-12 py-8">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

      <p class="font-['Syne'] font-bold text-white">
        Luis<span class="text-sky-400">.</span>
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3">
        <p class="text-slate-600 text-xs text-center">
          © {{ year }} Luis Ortiz. {{ t('footer.builtWith') }}
        </p>
        <a
          href="#nasa"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 text-xs font-medium hover:bg-sky-400/20 transition-all duration-200"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          {{ t('footer.nasaApi') }}
        </a>
      </div>

      <div class="flex items-center gap-1">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-emerald-400 text-xs">{{ t('footer.available') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppFooter' })

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
