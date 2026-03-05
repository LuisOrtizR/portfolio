<template>
  <section id="ai-chat" class="section-padding bg-bg w-full overflow-x-hidden">
    <div class="max-w-3xl mx-auto px-6 md:px-12">

      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
          <p class="text-violet-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('aiChat.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
          {{ t('aiChat.heading') }}
        </h2>
        <p class="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          {{ t('aiChat.subtitle') }}
        </p>
      </div>

      <div class="rounded-2xl border border-white/8 bg-surface overflow-hidden">

        <div class="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/1">
          <div class="flex items-center gap-3">
            <div class="flex gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
            </div>
            <span class="text-slate-600 text-xs font-mono">luis-ortiz-ai ~ chat</span>
          </div>
          <div class="flex items-center gap-3">
            <button
              v-if="messages.length > 1"
              @click="resetChat"
              class="text-slate-600 hover:text-slate-400 text-[11px] font-medium tracking-wide transition-colors duration-200"
            >
              {{ t('aiChat.reset') }}
            </button>
            <div class="flex items-center gap-1.5">
              <span class="relative flex h-1.5 w-1.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span class="text-emerald-400 text-xs font-medium">{{ t('aiChat.online') }}</span>
            </div>
          </div>
        </div>

        <div
          ref="messagesContainer"
          class="h-96 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['flex gap-3 items-end', msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div
              v-if="msg.role === 'assistant'"
              class="w-7 h-7 rounded-full bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0"
            >
              <svg class="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
            </div>

            <div
              :class="[
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-sky-500/10 border border-sky-500/20 text-slate-200 rounded-br-sm'
                  : 'bg-white/4 border border-white/6 text-slate-300 rounded-bl-sm'
              ]"
            >
              <p class="whitespace-pre-wrap">{{ msg.content }}</p>
            </div>

            <div
              v-if="msg.role === 'user'"
              class="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0 text-[11px] font-bold text-slate-300 uppercase"
            >
              {{ userInitial }}
            </div>
          </div>

          <div v-if="isLoading" class="flex gap-3 items-end justify-start">
            <div class="w-7 h-7 rounded-full bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
            </div>
            <div class="bg-white/4 border border-white/6 rounded-2xl rounded-bl-sm px-4 py-3">
              <div class="flex gap-1 items-center h-4">
                <span class="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:300ms"></span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="messages.length <= 1" class="px-4 pb-3 flex flex-wrap gap-2">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="sendSuggestion(suggestion)"
            class="text-xs px-3 py-1.5 rounded-full border border-white/8 text-slate-500 hover:border-violet-400/30 hover:text-violet-300 hover:bg-violet-400/4 transition-all duration-200"
          >
            {{ suggestion }}
          </button>
        </div>

        <div class="px-4 pb-4 pt-2 border-t border-white/6">
          <div class="flex gap-2">
            <input
              ref="inputRef"
              v-model="inputText"
              @keydown.enter.prevent="sendMessage"
              :placeholder="t('aiChat.placeholder')"
              :disabled="isLoading"
              maxlength="300"
              class="flex-1 bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-400/40 focus:bg-white/5 transition-all duration-200 disabled:opacity-40"
            />
            <button
              @click="sendMessage"
              :disabled="isLoading || !inputText.trim()"
              class="w-10 h-10 rounded-xl bg-violet-400/10 border border-violet-400/25 text-violet-400 hover:bg-violet-400/20 transition-all duration-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <p class="text-slate-700 text-[10px] mt-2 text-center tracking-wide">{{ t('aiChat.disclaimer') }}</p>
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

const initialMessage = (): Message => ({ role: 'assistant', content: t('aiChat.welcome') })

const messages = ref<Message[]>([initialMessage()])
const inputText = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const userInitial = computed(() => inputText.value.trim().charAt(0) || 'U')

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
   - Desarrollo de aplicaciones internas con Power Apps para gestión de turnos del Service Desk.
   - Automatización de flujos con Microfocus OO y Power Automate: 1 flujo continuo + 2 nuevos flujos.
   - Reportes Power BI desde cero: requerimientos, limpieza de datos, DAX, KPIs por hemisferio operativo.
   - Gestión Scrum: sprints, reuniones con stakeholders cada 3 días.
   - Documentación técnica de dashboards y aplicaciones internas.
2. Creador de Experiencia al Cliente | Emtelco | Mar 2022 – Sep 2022
3. Supervisor de Calidad | Personal Temporal y Asesorías | Oct 2016 – Mar 2017

=== PROYECTOS EN PRODUCCIÓN ===
1. Sistema Auth RBAC | Dic 2025 – Presente — backend-auth-rbac-oa4f.onrender.com / frontend-auth-rbac.vercel.app
2. Plataforma SaaS Multitenant | Dic 2025 – Presente — github.com/LuisOrtizR/saas-multitenant-platform
3. Portfolio Profesional | Dic 2025 – Presente — luis-ortiz-portfolio.vercel.app

=== FORMACIÓN ===
- Tecnólogo Bases de Datos | SENA | Abr 2026 – Jul 2028 (En curso)
- Tecnólogo ADSO | SENA | 2023 – 2025 (Graduado)
- Técnico Programación | SENA – Cencabo | 2012 (Graduado)

=== CERTIFICACIONES ===
- IA Generativa para Líderes Empresariales | LinkedIn Learning | Feb 2026

=== INSTRUCCIONES DE COMPORTAMIENTO ===
- Si alguien pregunta cómo contactar a Luis, NO des el teléfono ni el email directamente. Diles: "Puedes contactarlo desde la sección Contacto al final de esta página — encontrarás su email, LinkedIn y WhatsApp."
- Mantén respuestas cortas (máximo 4 líneas). Si listas cosas, usa máximo 4 puntos.
- Nunca inventes información que no esté en este CV.
- Si preguntan por salario, responde: "Esa información se puede conversar directamente — te invito a contactarlo desde la sección Contacto."
`

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const resetChat = () => {
  messages.value = [initialMessage()]
  inputText.value = ''
  inputRef.value?.focus()
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
      console.error('API error:', response.status, await response.text())
      messages.value.push({ role: 'assistant', content: t('aiChat.errorMsg') })
      return
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? t('aiChat.errorMsg')
    messages.value.push({ role: 'assistant', content: reply })
  } catch (err) {
    console.error('Fetch error:', err)
    messages.value.push({ role: 'assistant', content: t('aiChat.errorMsg') })
  } finally {
    isLoading.value = false
    await scrollToBottom()
    inputRef.value?.focus()
  }
}
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.15) transparent;
}
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.15);
  border-radius: 2px;
}
</style>
