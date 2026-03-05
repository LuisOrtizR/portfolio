<template>
  <section id="ai-chat" class="section-padding w-full overflow-x-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">

      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-xs font-semibold tracking-widest uppercase">{{ t('aiChat.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
          {{ t('aiChat.heading') }}
        </h2>
        <p class="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          {{ t('aiChat.subtitle') }}
        </p>
      </div>

      <div class="chat-shell rounded-2xl border border-white/8 bg-white/3 overflow-hidden">

        <div class="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/[0.02]">
          <div class="flex items-center gap-3">
            <div class="flex gap-1.5">
              <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/60"></span>
            </div>
            <span class="text-slate-500 text-xs font-mono">luis-ortiz-ai ~ chat</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-emerald-400 text-xs">{{ t('aiChat.online') }}</span>
          </div>
        </div>

        <div
          ref="messagesContainer"
          class="h-96 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div
              v-if="msg.role === 'assistant'"
              class="w-7 h-7 rounded-full bg-sky-400/15 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5"
            >
              <svg class="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
            </div>

            <div
              :class="[
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-sky-500/15 border border-sky-500/25 text-slate-200 rounded-br-sm'
                  : 'bg-white/4 border border-white/8 text-slate-300 rounded-bl-sm'
              ]"
            >
              <p class="whitespace-pre-wrap">{{ msg.content }}</p>
            </div>

            <div
              v-if="msg.role === 'user'"
              class="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-300"
            >
              T
            </div>
          </div>

          <div v-if="isLoading" class="flex gap-3 justify-start">
            <div class="w-7 h-7 rounded-full bg-sky-400/15 border border-sky-400/30 flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
            </div>
            <div class="bg-white/4 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3">
              <div class="flex gap-1 items-center h-4">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400/60 animate-bounce" style="animation-delay: 0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400/60 animate-bounce" style="animation-delay: 150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400/60 animate-bounce" style="animation-delay: 300ms"></span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="messages.length <= 1" class="px-4 pb-3 flex flex-wrap gap-2">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="sendSuggestion(suggestion)"
            class="text-xs px-3 py-1.5 rounded-full border border-white/8 text-slate-400 hover:border-sky-400/40 hover:text-sky-400 hover:bg-sky-400/5 transition-all duration-200"
          >
            {{ suggestion }}
          </button>
        </div>

        <div class="px-4 pb-4 pt-2 border-t border-white/6">
          <div class="flex gap-2">
            <input
              v-model="inputText"
              @keydown.enter.prevent="sendMessage"
              :placeholder="t('aiChat.placeholder')"
              :disabled="isLoading"
              class="flex-1 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-400/50 focus:bg-white/6 transition-all duration-200 disabled:opacity-50"
            />
            <button
              @click="sendMessage"
              :disabled="isLoading || !inputText.trim()"
              class="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/30 text-sky-400 hover:bg-sky-400/25 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <p class="text-slate-700 text-[10px] mt-2 text-center">{{ t('aiChat.disclaimer') }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AiChatSection' })

const { t } = useI18n()

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: t('aiChat.welcome'),
  },
])

const inputText = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const suggestions = computed(() => [
  t('aiChat.suggestions.experience'),
  t('aiChat.suggestions.skills'),
  t('aiChat.suggestions.projects'),
  t('aiChat.suggestions.available'),
])

const CV_CONTEXT = `
Eres un asistente profesional que representa a Luis Ángel Ortiz Romero. Responde siempre en el mismo idioma que te escriban (español, inglés o portugués). Sé conciso, profesional y honesto. No inventes información que no esté en este CV.

=== PERFIL PROFESIONAL ===
Nombre: Luis Ángel Ortiz Romero
Título: Backend Developer | Business Intelligence & Automatización | Power Platform Specialist
Descripción: Tecnólogo en Análisis y Desarrollo de Software con experiencia demostrada en automatización de procesos empresariales, Business Intelligence y desarrollo backend en entornos corporativos reales (SLB – Schlumberger). Especializado en Power Platform (Power BI, Power Automate, Power Apps), Node.js, PostgreSQL y arquitectura de APIs REST. Perfil híbrido técnico-analítico orientado a soluciones que optimizan operaciones, reducen tiempos de ejecución y generan valor desde los datos. Metodología Scrum aplicada en proyectos con stakeholders.
Ubicación: Soacha, Cundinamarca, Colombia
LinkedIn: https://www.linkedin.com/in/luis-romero-dev
GitHub: https://github.com/LuisOrtizR
Portafolio: https://luis-ortiz-portfolio.vercel.app
Disponibilidad: Inmediata | Modalidad: Presencial, Remoto o Híbrido
Idiomas: Español nativo | Inglés A2 (lectura técnica y comprensión de documentación)
Cédula: 1022380739

=== HABILIDADES TÉCNICAS ===
Business Intelligence: Power BI (DAX, columnas calculadas, KPIs, reportes desde cero), Power Apps, Power Automate
Backend & APIs: Node.js, Express.js, APIs REST, JWT, RBAC, Prisma ORM, Docker
Bases de Datos: PostgreSQL, MySQL, MongoDB, SQL avanzado, modelado relacional, SharePoint
Automatización: Microfocus Operation Orchestration, Power Automate, flujos continuos y nuevos procesos
Frontend: Vue.js 3, TypeScript, HTML5, CSS3, SPA
DevOps & Herramientas: Git, GitHub, Docker, Postman, Render, Vercel
Lenguajes: JavaScript (ES6+), TypeScript, SQL, Python (básico)
Metodologías: Scrum (sprints, backlog, issues, reuniones con stakeholders)

=== EXPERIENCIA PROFESIONAL ===

1. Process Performance Analyst – Intern | SENA / SLB (Schlumberger) | Dic 2024 – Ago 2025
   Empresa multinacional de servicios energéticos líder mundial. Bogotá, Colombia.
   - Desarrollo de aplicaciones internas con Power Apps para gestión de turnos de asesores del Service Desk nivel Bogotá, integrando bases de datos y SharePoint para centralizar información operativa.
   - Automatización de flujos empresariales con Microfocus Operation Orchestration y Power Automate: implementación de 1 flujo continuo y diseño de 2 nuevos flujos, reduciendo tiempos de ejecución de tareas manuales repetitivas.
   - Creación de reportes de Business Intelligence desde cero en Power BI con metodología completa: levantamiento de requerimientos, exploración y limpieza de datos, relacionamiento de múltiples bases de datos (SQL + SharePoint), creación de columnas calculadas en DAX, y definición de los KPIs más relevantes por hemisferio operativo.
   - Gestión del proyecto bajo metodología Scrum: investigación de problemática, recolección de requerimientos con stakeholders y product owners, reuniones de seguimiento cada 3 días y entrega de producto final.
   - Documentación técnica y funcional de dashboards en Power BI: elaboración de manuales de mantenimiento y guías de uso para aplicaciones internas.

2. Creador de Experiencia al Cliente | Emtelco | Mar 2022 – Sep 2022
   - Gestión y resolución de alto volumen de solicitudes (compras, precios, pedidos, quejas y reclamos) con enfoque en calidad y resolución en primer contacto.

3. Supervisor de Calidad | Personal Temporal y Asesorías | Oct 2016 – Mar 2017
   - Auditoría de llamadas y aseguramiento de estándares de calidad del servicio.
   - Capacitación y coaching a asesores para mejora del desempeño individual y grupal.

=== PROYECTOS EN PRODUCCIÓN ===
Proyectos activos mantenidos desde el 1 de diciembre de 2025 — visibles y funcionales en producción.

1. Sistema de Autenticación y Autorización RBAC | Dic 2025 – Presente
   - API REST con Node.js y Express, autenticación JWT y control de acceso basado en roles (RBAC) para entornos multi-usuario.
   - Interfaz SPA desarrollada en Vue.js 3 con TypeScript. Backend desplegado en Render, frontend en Vercel.
   - Gestión de sesiones seguras, middleware de autorización por rol y estructura lista para escalar a producción empresarial.
   - Backend: backend-auth-rbac-oa4f.onrender.com | Frontend: frontend-auth-rbac.vercel.app

2. Plataforma SaaS Multitenant | Dic 2025 – Presente
   - Arquitectura multitenant dockerizada con separación de datos por organización (tenant isolation), gestión de usuarios y control de acceso por organización.
   - Backend Node.js + PostgreSQL + Prisma ORM. Gestión con metodología Scrum: sprints, backlog e issues en GitHub Projects.
   - Diseño escalable orientado a SaaS empresarial con separación de contextos y control de planes por tenant.
   - Repositorio: github.com/LuisOrtizR/saas-multitenant-platform

3. Portfolio Profesional | Dic 2025 – Presente
   - Sitio web personal en producción con proyectos, habilidades y trayectoria profesional.
   - Vue 3 + TypeScript + TailwindCSS + vue-i18n (EN/ES/PT), desplegado en Vercel.
   - URL: luis-ortiz-portfolio.vercel.app

=== FORMACIÓN ACADÉMICA ===
- Tecnólogo en Implementación y Gestión de Bases de Datos | SENA | Abr 2026 – Jul 2028 (En curso)
- Tecnólogo en Análisis y Desarrollo de Software | SENA – Centro de Comercio y Servicios | 2023 – 2025 (Graduado)
- Técnico Profesional en Programación de Software | SENA – Cencabo | 2012 (Graduado)

=== CERTIFICACIONES ===
- IA Generativa para Líderes Empresariales | LinkedIn Learning – Shea Hanson | Feb 2026

=== REFERENCIAS ===
- Juan Sebastián Payán – SLB (Schlumberger) | JPayan@slb.com
- Hermes Gonzales Guisa – Referencia Personal
- Luisa Fernanda Gutiérrez – Referencia Personal

=== INSTRUCCIONES DE COMPORTAMIENTO ===
- Si alguien pregunta cómo contactar a Luis, NO des el teléfono ni el email directamente. Diles: "Puedes contactarlo desde la sección Contacto al final de esta página — encontrarás su email, LinkedIn y WhatsApp."
- Mantén respuestas cortas (máximo 4 líneas). Si listas cosas, usa máximo 4 puntos.
- Nunca inventes información que no esté en este CV.
- Si preguntan por salario o expectativas salariales, responde: "Esa información se puede conversar directamente — te invito a contactarlo desde la sección Contacto."
`

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendSuggestion = (text: string) => {
  inputText.value = text
  sendMessage()
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const conversationHistory = messages.value
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }))

    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: CV_CONTEXT },
          ...conversationHistory,
        ],
      }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      console.error('API error:', response.status, errBody)
      messages.value.push({ role: 'assistant', content: `[Debug] Error ${response.status}: ${errBody}` })
      return
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? t('aiChat.errorMsg')

    messages.value.push({ role: 'assistant', content: reply })
  } catch (err) {
    console.error('Fetch error:', err)
    messages.value.push({ role: 'assistant', content: `[Debug] ${String(err)}` })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(56, 189, 248, 0.15) transparent;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.15);
  border-radius: 2px;
}
</style>
