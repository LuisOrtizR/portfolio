<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-95"
    >
      <div v-if="isOpen" class="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] max-h-[600px] flex flex-col">
        <div class="rounded-3xl border border-white/10 bg-surface/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border-violet-500/20">

          <div class="flex items-center justify-between px-5 py-4 border-b border-white/6 bg-white/2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                <Bot class="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p class="text-white text-xs font-bold font-['Syne']">Luis AI Assistant</p>
                <div class="flex items-center gap-1.5">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  <span class="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">{{ t('aiChat.online') }}</span>
                </div>
              </div>
            </div>
            <button @click="close" class="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div ref="messagesContainer" class="flex-1 h-[400px] overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              :class="['flex gap-3 items-end', msg.role === 'user' ? 'justify-end' : 'justify-start']"
            >
              <div
                v-if="msg.role === 'assistant'"
                class="w-7 h-7 rounded-full bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0"
              >
                <Bot class="w-3.5 h-3.5 text-violet-400" />
              </div>

              <div :class="[
                'max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm',
                msg.role === 'user'
                  ? 'bg-violet-500/20 border border-violet-500/20 text-slate-100 rounded-br-sm'
                  : 'bg-white/5 border border-white/8 text-slate-300 rounded-bl-sm'
              ]">
                <p class="whitespace-pre-wrap">{{ msg.content }}</p>
              </div>
            </div>

            <div v-if="isLoading" class="flex gap-3 items-end justify-start">
              <div class="w-7 h-7 rounded-full bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0">
                <Bot class="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div class="bg-white/5 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3">
                <div class="flex gap-1 items-center h-4">
                  <span class="w-1 h-1 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:0ms"></span>
                  <span class="w-1 h-1 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:150ms"></span>
                  <span class="w-1 h-1 rounded-full bg-violet-400/60 animate-bounce" style="animation-delay:300ms"></span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="messages.length <= 1" class="px-5 pb-4 flex flex-wrap gap-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="sendSuggestion(suggestion)"
              class="text-[10px] px-3 py-1.5 rounded-full border border-white/8 text-slate-400 hover:border-violet-400/30 hover:text-violet-300 hover:bg-violet-400/4 transition-all duration-200"
            >
              {{ suggestion }}
            </button>
          </div>

          <div class="px-5 py-4 border-t border-white/6 bg-white/1">
            <div class="flex gap-2">
              <input
                ref="inputRef"
                v-model="inputText"
                @keydown.enter.prevent="sendMessage"
                :placeholder="t('aiChat.placeholder')"
                :disabled="isLoading"
                maxlength="300"
                class="flex-1 bg-white/3 border border-white/8 rounded-2xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-400/40 focus:bg-white/5 transition-all duration-200 disabled:opacity-40"
              />
              <button
                @click="sendMessage"
                :disabled="isLoading || !inputText.trim()"
                class="w-9 h-9 rounded-xl bg-violet-500 text-white hover:bg-violet-400 transition-all duration-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-violet-500/20"
              >
                <Send class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center justify-between mt-3 px-1">
              <button @click="resetChat" class="text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
                {{ t('aiChat.reset') }}
              </button>
              <p class="text-slate-700 text-[9px] tracking-wide">{{ t('aiChat.disclaimer') }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bot, X, Send } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

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

const close = () => emit('close')

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

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: history,
        lang: locale.value === 'es' ? 'español' : locale.value === 'pt' ? 'portugués' : 'inglés'
      }),
    })

    if (!response.ok) throw new Error('Error en el servidor')
    const result = await response.json()
    messages.value.push({ role: 'assistant', content: result.data })
  } catch (err) {
    console.error('Chat error:', err)
    messages.value.push({
      role: 'assistant',
      content: locale.value === 'es' ? 'Lo siento, hubo un error al conectar con mi servidor.' : 'Sorry, there was an error connecting to my server.'
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  if (props.isOpen) {
    nextTick(() => inputRef.value?.focus())
  }
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
