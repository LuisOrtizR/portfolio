<template>
  <section id="projects" class="section-padding bg-surface w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <div class="inline-flex items-center gap-2 mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('projects.tag') }}</p>
          </div>
          <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            {{ t('projects.heading') }}
          </h2>
        </div>
        <a
          href="https://github.com/LuisOrtizR"
          target="_blank"
          class="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm font-medium transition-colors duration-200 shrink-0 group"
        >
          {{ t('projects.allOnGithub') }}
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="group relative flex flex-col rounded-3xl border border-white/5 bg-bg/50 backdrop-blur-sm overflow-hidden hover:border-sky-400/30 transition-all duration-700 hover:-translate-y-3 shadow-2xl"
          :class="index % 2 === 0 ? 'lg:translate-y-4' : 'lg:-translate-y-4'"
        >
          <div class="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div class="h-1 w-full bg-linear-to-r from-transparent via-sky-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
        
          <div v-if="project.featured" class="absolute top-4 right-4 z-10">
            <span class="text-[10px] px-2.5 py-1 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20 font-semibold tracking-wide">
              {{ t('projects.featured') }}
            </span>
          </div>

          <div class="flex flex-col flex-1 p-6">
            <div class="w-10 h-10 rounded-xl bg-sky-400/8 border border-sky-400/15 flex items-center justify-center text-sky-400 mb-5">
              <component :is="project.icon" class="w-5 h-5" />
            </div>

            <h3 class="font-['Syne'] font-bold text-white text-lg mb-3 leading-snug">{{ t(project.titleKey) }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed flex-1">{{ t(project.descKey) }}</p>

            <div class="flex flex-wrap gap-1.5 mt-5">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="px-2 py-0.5 text-[11px] rounded-md bg-white/4 border border-white/6 text-slate-400 font-medium group-hover:bg-sky-400/6 group-hover:text-slate-300 transition-all duration-300"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex items-center gap-5 mt-5 pt-5 border-t border-white/6">
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                class="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-medium transition-colors duration-200"
              >
                <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                {{ t('projects.code') }}
              </a>
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                class="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-xs font-medium transition-colors duration-200"
              >
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ t('projects.liveDemo') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ProjectsSection' })

const { t } = useI18n()

const IconGlobe = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }),
])

const IconShield = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }),
])

const IconCode = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }),
])

const projects = [
  {
    id: 1,
    titleKey: 'projects.items.aiweb.title',
    descKey:  'projects.items.aiweb.description',
    stack:    ['Vue 3', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'TailwindCSS', 'Docker'],
    repoUrl:  'https://github.com/LuisOrtizR/AgenciaWeb',
    demoUrl:  'https://agencia-web-ashy.vercel.app/',
    featured: true,
    icon:     IconGlobe,
  },
  {
    id: 2,
    titleKey: 'projects.items.frontendRbac.title',
    descKey:  'projects.items.frontendRbac.description',
    stack:    ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Axios', 'TailwindCSS'],
    repoUrl:  'https://github.com/LuisOrtizR/frontend-auth-rbac',
    demoUrl:  'https://frontend-auth-rbac.vercel.app/login',
    featured: true,
    icon:     IconShield,
  },
  {
    id: 3,
    titleKey: 'projects.items.portfolio.title',
    descKey:  'projects.items.portfolio.description',
    stack:    ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'vue-i18n'],
    repoUrl:  'https://github.com/LuisOrtizR/portfolio',
    demoUrl:  null,
    featured: false,
    icon:     IconCode,
  },
]
</script>
