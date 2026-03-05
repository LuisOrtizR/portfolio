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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card group relative flex flex-col rounded-2xl border border-white/6 bg-bg overflow-hidden hover:border-sky-400/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          <!-- Top accent -->
          <div class="h-px w-full bg-linear-to-r from-sky-500/0 via-sky-400/50 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Featured badge strip -->
          <div v-if="project.featured" class="absolute top-4 right-4 z-10">
            <span class="text-[10px] px-2.5 py-1 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20 font-semibold tracking-wide">
              {{ t('projects.featured') }}
            </span>
          </div>

          <div class="flex flex-col flex-1 p-6">

            <!-- Icon -->
            <div class="w-10 h-10 rounded-xl bg-sky-400/8 border border-sky-400/15 flex items-center justify-center text-sky-400 mb-5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>

            <h3 class="font-['Syne'] font-bold text-white text-lg mb-3 leading-snug">{{ t(project.titleKey) }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed flex-1">{{ t(project.descKey) }}</p>

            <!-- Stack tags -->
            <div class="flex flex-wrap gap-1.5 mt-5">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="px-2 py-0.5 text-[11px] rounded-md bg-white/4 border border-white/6 text-slate-400 font-medium group-hover:bg-sky-400/6 group-hover:text-slate-300 transition-all duration-300"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex items-center gap-5 mt-5 pt-5 border-t border-white/6">
              <a
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
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ProjectsSection' })

const { t } = useI18n()

const projects = [
  {
    id: 1,
    titleKey: 'projects.items.backendRbac.title',
    descKey: 'projects.items.backendRbac.description',
    stack: ['Node.js', 'Express', 'JWT', 'Zod', 'PostgreSQL', 'Helmet'],
    repoUrl: 'https://github.com/LuisOrtizR/backend-auth-rbac',
    demoUrl: 'https://backend-auth-rbac-oa4f.onrender.com',
    featured: true,
  },
  {
    id: 2,
    titleKey: 'projects.items.frontendRbac.title',
    descKey: 'projects.items.frontendRbac.description',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Axios', 'TailwindCSS'],
    repoUrl: 'https://github.com/LuisOrtizR/frontend-auth-rbac',
    demoUrl: 'https://frontend-auth-rbac.vercel.app/login',
    featured: true,
  },
  {
    id: 3,
    titleKey: 'projects.items.portfolio.title',
    descKey: 'projects.items.portfolio.description',
    stack: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'vue-i18n'],
    repoUrl: 'https://github.com/LuisOrtizR/portfolio',
    demoUrl: 'https://luis-ortiz-portfolio.vercel.app/',
    featured: false,
  },
]
</script>
