<template>
  <footer class="border-t border-border px-6 md:px-12 py-8">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

      <p class="font-['Syne'] font-bold text-white">
        Luis<span class="text-sky-400">.</span>
      </p>

      <p class="text-slate-600 text-xs text-center">
        © {{ year }} Luis Ortiz. Built with Vue 3 + TypeScript + TailwindCSS
      </p>

      <div class="flex items-center gap-1">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-emerald-400 text-xs">Available for work</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppFooter' })

const year = new Date().getFullYear()
</script>
