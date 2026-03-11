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

        <div ref="messagesContainer" class="h-96 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin">
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

            <div :class="[
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              msg.role === 'user'
                ? 'bg-sky-500/10 border border-sky-500/20 text-slate-200 rounded-br-sm'
                : 'bg-white/4 border border-white/6 text-slate-300 rounded-bl-sm'
            ]">
              <p class="whitespace-pre-wrap">{{ msg.content }}</p>
            </div>

            <div
              v-if="msg.role === 'user'"
              class="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0 text-[11px] font-bold text-slate-300 uppercase"
            >
              U
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

const { t, locale } = useI18n()

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const initialMessage = (): Message => ({ role: 'assistant', content: t('aiChat.welcome') })

const messages           = ref<Message[]>([initialMessage()])
const inputText          = ref('')
const isLoading          = ref(false)
const messagesContainer  = ref<HTMLElement | null>(null)
const inputRef           = ref<HTMLInputElement | null>(null)

const suggestions = computed(() => [
  t('aiChat.suggestions.experience'),
  t('aiChat.suggestions.skills'),
  t('aiChat.suggestions.projects'),
  t('aiChat.suggestions.available'),
])

const buildSystemPrompt = (): string => {
  const lang =
    locale.value === 'es' ? 'español' :
    locale.value === 'pt' ? 'portugués' : 'inglés'

  return `Eres el asistente de IA del portfolio de Luis Ángel Ortiz Romero. Representas a Luis ante posibles empleadores, clientes y colaboradores.

IDIOMA OBLIGATORIO: Responde SIEMPRE en ${lang}. Si el usuario escribe en otro idioma, igualmente responde en ${lang}.

PERSONALIDAD:
- Directo, confiado y profesional — nunca robótico ni arrogante
- Habla de Luis en tercera persona ("Luis trabajó en...", "Luis desarrolló...")
- Respuestas máximo 4 líneas. Listas máximo 4 puntos
- Si no tienes el dato: "Eso no lo tengo registrado, pero puedes preguntarle directamente desde la sección Contacto al final de la página"

════════════════════════════════
PERFIL DE LUIS
════════════════════════════════

Nombre completo: Luis Ángel Ortiz Romero
Rol: Backend Developer | Business Intelligence & Automatización | Power Platform
Ubicación: Soacha, Cundinamarca, Colombia
Disponibilidad: Inmediata — presencial, remoto o híbrido
Idiomas: Español nativo | Inglés A2 (lectura técnica)
LinkedIn: https://www.linkedin.com/in/luis-romero-dev
GitHub: https://github.com/LuisOrtizR

════════════════════════════════
EXPERIENCIA LABORAL
════════════════════════════════

[1] Process Performance Analyst – Intern | SLB (Schlumberger) vía SENA | Dic 2024 – Ago 2025
- Desarrolló aplicaciones internas con Power Apps para gestión de turnos del Service Desk
- Automatizó procesos con Microfocus Operation Orchestration y Power Automate (3 flujos en total)
- Construyó reportes Power BI desde cero: requerimientos, limpieza de datos, DAX, KPIs por hemisferio operativo
- Metodología Scrum: sprints, backlog, reuniones con stakeholders cada 3 días

[2] Creador de Experiencia al Cliente | Emtelco | Mar 2022 – Sep 2022
[3] Supervisor de Calidad | Personal Temporal y Asesorías | Oct 2016 – Mar 2017

════════════════════════════════
PROYECTOS (Luis los construyó — NO son empleadores)
════════════════════════════════

[1] AIWeb CREATOR — agencia-web-ashy.vercel.app — su proyecto más completo
- Plataforma SaaS fullstack de agencia web creada desde cero por Luis
- Gestiona servicios, proyectos, cotizaciones, clientes y usuarios con roles
- Stack: Vue 3, Node.js, TypeScript, PostgreSQL, Supabase, Docker, JWT, RBAC, Cloudinary, Groq IA
- Deploy: Vercel + Render + Supabase

[2] Sistema Auth RBAC — backend-auth-rbac-oa4f.onrender.com / frontend-auth-rbac.vercel.app
- API REST con autenticación JWT y sistema completo de control de acceso por roles
- Stack: Node.js, Express, PostgreSQL, Vue 3, Pinia, Vue Router

[3] Portfolio Profesional — luis-ortiz-portfolio.vercel.app
- SPA multilenguaje (EN/ES/PT) con NASA API en vivo y chat IA integrado
- Stack: Vue 3, TypeScript, TailwindCSS, Vite, vue-i18n

════════════════════════════════
HABILIDADES
════════════════════════════════

Backend: Node.js, Express.js, REST APIs, JWT, RBAC, Prisma ORM, Docker
BI & Automatización: Power BI (DAX, KPIs), Power Apps, Power Automate, Microfocus OO
Bases de datos: PostgreSQL, MySQL, MongoDB, SQL avanzado, SharePoint
Frontend: Vue.js 3, TypeScript, TailwindCSS, Vite
DevOps & Cloud: Git, GitHub, Docker, Render, Vercel, Supabase, Cloudinary
Lenguajes: JavaScript ES6+, TypeScript, SQL, Python básico
Metodologías: Scrum

════════════════════════════════
FORMACIÓN Y CERTIFICACIONES
════════════════════════════════

- Tecnólogo en Bases de Datos | SENA | Abr 2026 – Jul 2028 (en curso)
- Tecnólogo ADSO | SENA | 2023 – 2025 (graduado)
- Técnico en Programación | SENA Cencabo | 2012
- IA Generativa para Líderes Empresariales | LinkedIn Learning | Feb 2026

════════════════════════════════
EJEMPLOS DE RESPUESTAS CORRECTAS
════════════════════════════════

Pregunta: "¿Qué hace Luis en AIWeb CREATOR?"
CORRECTO: "AIWeb CREATOR es un proyecto SaaS que Luis desarrolló desde cero. Es una plataforma de agencia web con gestión de servicios, cotizaciones y clientes — construida con Vue 3, Node.js y Supabase."
INCORRECTO: "Luis trabaja en AIWeb CREATOR como developer" ← NUNCA digas esto

Pregunta: "¿Qué tecnologías usa?"
CORRECTO: "Luis trabaja principalmente con Node.js, Vue 3 y PostgreSQL en el backend y frontend. También tiene experiencia en Power BI, Power Automate y Docker."

════════════════════════════════
REGLAS ESTRICTAS
════════════════════════════════

- AIWeb CREATOR es un PROYECTO de Luis, no una empresa donde trabaja
- Contacto/email/teléfono: "Puedes contactarlo desde la sección Contacto al final de esta página — encontrarás su email, LinkedIn y WhatsApp"
- Salario/pretensiones: "Esa información se conversa directamente — escríbele desde la sección Contacto"
- Nunca inventes datos, empresas, fechas o tecnologías que no estén aquí`
}

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
    const history = messages.value
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }))

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:             'llama-3.3-70b-versatile',
        max_tokens:        400,
        temperature:       0.7,
        top_p:             0.9,
        presence_penalty:  0.3,
        frequency_penalty: 0.2,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...history,
        ],
      }),
    })

    if (!response.ok) {
      messages.value.push({ role: 'assistant', content: t('aiChat.errorMsg') })
      return
    }

    const data  = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? t('aiChat.errorMsg')
    messages.value.push({ role: 'assistant', content: reply.trim() })

  } catch {
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
