<template>
  <section id="dashboard" class="section-padding bg-bg w-full overflow-x-hidden relative">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('dashboard.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          {{ t('dashboard.heading') }}
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        <div class="md:col-span-7 space-y-6">
          <div class="rounded-2xl border border-white/8 bg-surface/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
            <div class="p-5 border-b border-white/6 flex items-center justify-between bg-white/1">
              <div class="flex items-center gap-3">
                <CloudSun class="w-5 h-5 text-sky-400" />
                <h3 class="text-white font-bold font-['Syne']">{{ t('dashboard.weather.title') }}</h3>
              </div>
              <span class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">OpenWeather API</span>
            </div>

            <div class="p-6 flex-1">
              <div v-if="loading.weather" class="flex items-center justify-center py-12">
                <Loader2 class="w-8 h-8 text-sky-400 animate-spin opacity-20" />
              </div>
              <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div v-for="city in weatherData" :key="city.city"
                  class="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-sky-400/30 transition-all duration-300 group">
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold text-slate-500 uppercase">{{ city.country }}</span>
                    <img :src="`https://openweathermap.org/img/wn/${city.icon}.png`" :alt="city.description" class="w-8 h-8 -mt-2" />
                  </div>
                  <div class="text-2xl font-black text-white mb-1 group-hover:text-sky-400 transition-colors">{{ city.temp }}°</div>
                  <div class="text-xs font-bold text-slate-300 truncate mb-3">{{ city.city }}</div>

                  <div class="space-y-1.5 pt-2 border-t border-white/5">
                    <div class="flex justify-between text-[9px]">
                      <span class="text-slate-500 uppercase">{{ t('dashboard.weather.feelsLike') }}</span>
                      <span class="text-slate-300">{{ city.feels_like }}°</span>
                    </div>
                    <div class="flex justify-between text-[9px]">
                      <span class="text-slate-500 uppercase">{{ t('dashboard.weather.humidity') }}</span>
                      <span class="text-slate-300">{{ city.humidity }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-5 space-y-6">

          <div class="rounded-2xl border border-white/8 bg-surface/50 backdrop-blur-sm overflow-hidden">
            <div class="p-5 border-b border-white/6 flex items-center justify-between bg-white/1">
              <div class="flex items-center gap-3">
                <TrendingUp class="w-5 h-5 text-emerald-400" />
                <h3 class="text-white font-bold font-['Syne']">{{ t('dashboard.market.title') }}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full" :class="marketData?.market_status.open ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'"></span>
                <span class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{{ marketData?.market_status.label }}</span>
              </div>
            </div>

            <div class="p-5">
              <div v-if="loading.market" class="flex items-center justify-center py-6">
                <Loader2 class="w-6 h-6 text-emerald-400 animate-spin opacity-20" />
              </div>
              <div v-else class="space-y-3">
                <div v-for="stock in marketData?.stocks.slice(0, 3)" :key="stock.symbol"
                  class="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                  <div class="flex flex-col">
                    <span class="text-xs font-black text-white">{{ stock.symbol }}</span>
                    <span class="text-[9px] text-slate-500 truncate w-24">{{ stock.name }}</span>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-xs font-bold text-white">${{ parseFloat(stock.price).toFixed(2) }}</span>
                    <span :class="['text-[9px] font-bold', stock.trend === 'up' ? 'text-emerald-400' : 'text-red-400']">
                      {{ stock.trend === 'up' ? '▲' : '▼' }} {{ stock.change_percent }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-white/8 bg-surface/50 backdrop-blur-sm overflow-hidden flex-1">
            <div class="p-5 border-b border-white/6 flex items-center justify-between bg-white/1">
              <div class="flex items-center gap-3">
                <CalendarDays class="w-5 h-5 text-violet-400" />
                <h3 class="text-white font-bold font-['Syne']">{{ t('dashboard.holidays.title') }}</h3>
              </div>
              <span class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Multi-Source API</span>
            </div>

            <div class="p-5">
              <div v-if="loading.holidays" class="flex items-center justify-center py-6">
                <Loader2 class="w-6 h-6 text-violet-400 animate-spin opacity-20" />
              </div>
              <div v-else class="space-y-4">
                <div v-if="holidayData?.today.length" class="space-y-2">
                  <div class="text-[10px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-violet-400"></span>
                    {{ t('dashboard.holidays.today') }}
                  </div>
                  <div v-for="h in holidayData.today" :key="h.name + h.countryCode"
                    class="p-3 rounded-xl bg-violet-400/5 border border-violet-400/20">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-white">{{ h.localName }}</span>
                      <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-violet-400/20 text-violet-300">{{ h.countryCode }}</span>
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-slate-500"></span>
                    {{ t('dashboard.holidays.upcoming') }}
                  </div>
                  <div class="max-h-32 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                    <div v-for="h in holidayData?.upcoming.slice(0, 4)" :key="h.name + h.countryCode"
                      class="flex items-center justify-between p-2 rounded-lg bg-white/2 border border-white/5">
                      <div class="flex flex-col">
                        <span class="text-[10px] font-bold text-slate-200">{{ h.localName }}</span>
                        <span class="text-[8px] text-slate-500">{{ h.date }}</span>
                      </div>
                      <span class="text-[8px] font-bold text-slate-400">{{ h.countryCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <div class="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <Database class="w-3 h-3" /> NODE.JS BACKEND
        </div>
        <div class="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <Zap class="w-3 h-3" /> AXIOS FETCH
        </div>
        <div class="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <ShieldCheck class="w-3 h-3" /> CORS SECURE
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import {
  CloudSun, TrendingUp, CalendarDays, Loader2,
  Database, Zap, ShieldCheck
} from 'lucide-vue-next'

defineOptions({ name: 'DashboardSection' })

const { t } = useI18n()

// Tipos básicos para el dashboard
interface Weather { city: string; country: string; temp: number; feels_like: number; humidity: number; icon: string; description: string; }
interface Stock { symbol: string; name: string; price: string; trend: 'up' | 'down'; change_percent: string; }
interface Market { stocks: Stock[]; market_status: { open: boolean; label: string; }; }
interface Holiday { date: string; localName: string; name: string; countryCode: string; }
interface Holidays { today: Holiday[]; upcoming: Holiday[]; }

// Estado reactivo
const weatherData = ref<Weather[]>([])
const marketData = ref<Market | null>(null)
const holidayData = ref<Holidays | null>(null)

const loading = reactive({
  weather: true,
  market: true,
  holidays: true
})

// Configuración de API
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const fetchData = async () => {
  // Weather
  try {
    const res = await axios.get(`${API_BASE}/weather`)
    weatherData.value = res.data.data
  } catch (e) { console.error('Weather error', e) }
  finally { loading.weather = false }

  // Market
  try {
    const res = await axios.get(`${API_BASE}/market`)
    marketData.value = res.data.data
  } catch (e) { console.error('Market error', e) }
  finally { loading.market = false }

  // Holidays
  try {
    const res = await axios.get(`${API_BASE}/holidays/today`)
    holidayData.value = res.data.data
  } catch (e) { console.error('Holidays error', e) }
  finally { loading.holidays = false }
}

onMounted(fetchData)
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
