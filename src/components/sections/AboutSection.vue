<template>
  <section id="about" class="section-padding max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 gap-16 items-center">

      <!-- Text -->
      <div>
        <p class="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">About me</p>
        <h2 class="font-['Syne'] text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Engineer by craft,<br/>builder by passion.
        </h2>
        <div class="space-y-4 text-slate-400 leading-relaxed">
          <p>
            I'm a Full Stack Developer focused on building modern, scalable web systems. I care deeply about clean architecture, maintainable code, and delivering real value through technology.
          </p>
          <p>
            I work with the Vue ecosystem on the frontend and Node.js on the backend. I approach every project with an architectural mindset — thinking not just about what works today, but what scales tomorrow.
          </p>
        </div>

        <!-- Values -->
        <div class="grid grid-cols-2 gap-4 mt-10">
          <div
            v-for="value in values"
            :key="value.label"
            class="p-4 rounded-xl bg-surface border border-border"
          >
            <span class="text-xl mb-2 block">{{ value.icon }}</span>
            <p class="text-white text-sm font-medium">{{ value.label }}</p>
            <p class="text-slate-500 text-xs mt-0.5">{{ value.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Visual Card -->
      <div class="relative">
        <div class="absolute -inset-4 bg-sky-500/5 rounded-3xl blur-xl" />
        <div class="relative bg-surface border border-border rounded-2xl p-8 space-y-6">

          <div class="flex items-center gap-3 pb-6 border-b border-border">
            <div class="w-12 h-12 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-400 font-['Syne'] font-bold text-lg">
              LO
            </div>
            <div>
              <p class="text-white font-semibold">Luis Ortiz</p>
              <p class="text-slate-500 text-sm">Full Stack Developer</p>
            </div>
            <span class="ml-auto text-xs px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              Open to work
            </span>
          </div>

          <div v-for="item in profileItems" :key="item.label" class="flex items-center justify-between text-sm">
            <span class="text-slate-500">{{ item.label }}</span>
            <span class="text-slate-300">{{ item.value }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'AboutSection' })

const values = [
  { icon: '⚡', label: 'Performance', desc: 'Speed-first approach' },
  { icon: '🏗️', label: 'Architecture', desc: 'Scalable by design' },
  { icon: '🎯', label: 'Precision', desc: 'Detail-oriented code' },
  { icon: '🚀', label: 'Delivery', desc: 'Ship what matters' },
]

const profileItems = [
  { label: 'Location', value: 'Col Colombia - Soacha' },
  { label: 'Experience', value: '1+ years' },
  { label: 'Focus', value: 'Vue · Node.js · TS' },
  { label: 'English', value: 'Intermediate' },
  { label: 'Status', value: '✅ Available' },
]
</script>
