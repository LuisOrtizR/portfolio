<template>
  <section id="projects" class="section-padding max-w-6xl mx-auto">

    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
      <div>
        <p class="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4">Work</p>
        <h2 class="font-['Syne'] text-4xl md:text-5xl font-bold text-white leading-tight">
          Selected Projects
        </h2>
      </div>
      <a
        href="https://github.com/LuisOrtizR"
        target="_blank"
        class="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors shrink-0"
      >
        All projects on GitHub
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="project in projects"
        :key="project.id"
        class="group bg-[#0f1623] border border-[#1e2a3a] rounded-2xl p-6 flex flex-col hover:border-sky-400/30 transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <span
            v-if="project.featured"
            class="text-xs px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20"
          >
            Featured
          </span>
        </div>

        <!-- Content -->
        <h3 class="font-['Syne'] font-bold text-white text-lg mb-2">{{ project.title }}</h3>
        <p class="text-slate-500 text-sm leading-relaxed flex-1">{{ project.description }}</p>

        <!-- Stack -->
        <div class="flex flex-wrap gap-2 mt-5">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="px-2 py-0.5 text-xs rounded bg-[#1e2a3a] text-slate-400"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 mt-6 pt-5 border-t border-[#1e2a3a]">
          <a
            :href="project.repoUrl"
            target="_blank"
            class="text-slate-500 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Code
          </a>
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            class="text-sky-400 hover:text-sky-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Live demo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '@/types/project'
</script>
