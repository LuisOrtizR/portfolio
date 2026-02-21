<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">

    <!-- Background grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e2a3a18_1px,transparent_1px),linear-gradient(to_bottom,#1e2a3a18_1px,transparent_1px)] bg-size-[64px_64px]" />

    <!-- Glow -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20 w-full">

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium mb-8 fade-in">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available for new projects
      </div>

      <!-- Heading -->
      <h1 class="font-['Syne'] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 fade-in" style="animation-delay: 0.1s">
        <span class="text-white">Luis Ortiz</span>
        <br/>
        <span class="text-slate-500">Full Stack</span>
        <br/>
        <span class="text-sky-400">Developer.</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 fade-in" style="animation-delay: 0.2s">
        Building scalable, modern web systems with clean architecture and sharp attention to detail.
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap gap-4 fade-in" style="animation-delay: 0.3s">
        <a
          href="#projects"
          class="px-6 py-3 rounded-xl bg-sky-400 text-black font-semibold text-sm hover:bg-sky-300 transition-colors duration-200"
        >
          View Projects
        </a>
        <a
          href="#contact"
          class="px-6 py-3 rounded-xl border border-border text-slate-300 font-medium text-sm hover:border-sky-400/50 hover:text-white transition-all duration-200"
        >
          Let's talk →
        </a>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap gap-10 mt-20 fade-in" style="animation-delay: 0.4s">
        <div v-for="stat in stats" :key="stat.label">
          <p class="font-['Syne'] text-3xl font-bold text-white">{{ stat.value }}</p>
          <p class="text-slate-500 text-sm mt-0.5">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeroSection' })

const stats = [
  { value: '3+', label: 'Years of experience' },
  { value: '15+', label: 'Projects delivered' },
  { value: '100%', label: 'Commitment' },
]
</script>
