<template>
  <section id="skills" class="section-padding bg-surface">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-xs font-semibold tracking-widest uppercase">{{ t('skills.tag') }}</p>
        </div>
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
    items: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'Pinia', 'HTML5', 'CSS3'],
  },
  {
    categoryKey: 'skills.categories.backend',
    icon: '⚙️',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT', 'RBAC', 'Prisma ORM'],
  },
  {
    categoryKey: 'skills.categories.databases',
    icon: '🗄️',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL', 'SharePoint'],
  },
  {
    categoryKey: 'skills.categories.bi',
    icon: '📊',
    items: ['Power BI', 'Power Apps', 'Power Automate', 'DAX', 'Git', 'Docker', 'Postman'],
  },
]
</script>
