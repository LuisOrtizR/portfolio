<template>
  <section id="skills" class="section-padding bg-surface">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="text-center mb-16">
        <p class="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">{{ t('skills.tag') }}</p>
        <h2 class="font-['Syne'] text-4xl md:text-5xl font-bold text-white">
          {{ t('skills.heading') }}
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="group in skills"
          :key="group.categoryKey"
          class="bg-bg border border-border rounded-2xl p-6 hover:border-sky-400/30 transition-colors duration-300 group"
        >
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl">{{ group.icon }}</span>
            <p class="font-['Syne'] font-bold text-white text-sm">{{ t(group.categoryKey) }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="px-3 py-1 rounded-lg bg-border text-slate-300 text-xs font-medium group-hover:bg-sky-400/10 group-hover:text-sky-300 transition-colors duration-300"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border flex flex-wrap justify-center gap-6">
        <div
          v-for="(badge, index) in tm('skills.badges') as string[]"
          :key="index"
          class="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          {{ badge }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'SkillsSection' })

const { t, tm } = useI18n()

const skills = [
  {
    categoryKey: 'skills.categories.frontend',
    icon: '🖥️',
    items: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'Pinia'],
  },
  {
    categoryKey: 'skills.categories.backend',
    icon: '⚙️',
    items: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'Prisma'],
  },
  {
    categoryKey: 'skills.categories.devops',
    icon: '🚀',
    items: ['Git', 'Docker', 'Vercel', 'Netlify', 'CI/CD'],
  },
  {
    categoryKey: 'skills.categories.tools',
    icon: '🛠️',
    items: ['VS Code', 'Figma', 'Postman', 'Linux', 'ESLint'],
  },
]
</script>
