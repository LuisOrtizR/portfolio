<template>
  <section id="dashboard" class="section-padding bg-bg w-full overflow-x-hidden relative">
    <!-- Ambient Background Elements -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

      <!-- Power BI Style Report Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 rounded-3xl bg-surface/20 border border-white/5 backdrop-blur-xl shadow-2xl">
        <div class="flex items-center gap-5">
          <div class="relative group">
            <div class="absolute -inset-1 bg-linear-to-r from-blue-600 to-sky-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div class="relative flex -space-x-3 p-1">
              <div class="w-10 h-10 rounded-xl bg-blue-600 border-2 border-surface flex items-center justify-center text-xs font-black text-white shadow-lg">S</div>
              <div class="w-10 h-10 rounded-xl bg-sky-500 border-2 border-surface flex items-center justify-center text-xs font-black text-white shadow-lg">L</div>
              <div class="w-10 h-10 rounded-xl bg-emerald-500 border-2 border-surface flex items-center justify-center text-xs font-black text-white shadow-lg">B</div>
            </div>
          </div>
          <div>
            <h2 class="font-['Syne'] text-2xl font-black text-white leading-tight">Technical Dashboard</h2>
            <p class="text-[10px] font-black text-sky-400/80 uppercase tracking-[0.3em]">SLB INTERN SENA • 2024 Showcase</p>
          </div>
        </div>

        <!-- Analytical Filters -->
        <div class="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            :class="[
              'px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500',
              activeFilter === filter.id
                ? 'bg-sky-400 text-bg shadow-lg shadow-sky-400/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            ]"
          >
            {{ t(`dashboard.analytics.regions.${filter.id}`) }}
          </button>
        </div>
      </div>

      <!-- KPI Ribbon (Summary Statistics) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div v-for="kpi in kpis" :key="kpi.key"
          class="group p-6 rounded-3xl bg-surface/40 border border-white/5 hover:border-sky-400/20 transition-all duration-500 hover:-translate-y-1">
          <div class="flex justify-between items-start mb-4">
            <div :class="['p-2 rounded-xl bg-white/5', kpi.color]">
              <component :is="kpi.icon" class="w-5 h-5" />
            </div>
            <span class="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Real-Time</span>
          </div>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{{ t(`dashboard.analytics.${kpi.key}`) }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black text-white tracking-tighter">{{ kpi.value }}</span>
            <span v-if="kpi.unit" class="text-sm font-medium text-slate-500">{{ kpi.unit }}</span>
          </div>
        </div>
      </div>

      <!-- Main Analytical Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- Primary Visual: Weather Analytics -->
        <div class="lg:col-span-8">
          <div class="h-full rounded-[2.5rem] border border-white/10 bg-surface/30 backdrop-blur-md overflow-hidden flex flex-col shadow-2xl">
            <div class="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-sky-400/10 flex items-center justify-center text-sky-400 shadow-inner">
                  <CloudSun class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-white font-bold font-['Syne'] text-xl">{{ t('dashboard.analytics.weatherTitle') }}</h3>
                  <p class="text-[11px] text-slate-500 font-medium">{{ t('dashboard.analytics.weatherSubtitle') }}</p>
                </div>
              </div>
              <div class="hidden sm:flex items-center gap-3">
                <div class="flex flex-col items-end">
                  <span class="text-[9px] font-black text-emerald-400 uppercase">{{ t('dashboard.status.systemActive') }}</span>
                  <span class="text-[10px] text-slate-500 font-mono">{{ lastRefresh }}</span>
                </div>
              </div>
            </div>

            <div class="p-8 flex-1 overflow-y-auto max-h-150 scrollbar-thin">
              <div v-if="loading.weather" class="flex flex-col items-center justify-center py-32 gap-4">
                <Loader2 class="w-12 h-12 text-sky-400 animate-spin opacity-30" />
                <p class="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">{{ t('dashboard.status.syncing') }}</p>
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div v-for="city in filteredWeather" :key="city.city"
                  class="group relative p-6 rounded-4xl bg-white/3 border border-white/5 hover:border-sky-400/40 hover:bg-white/6 transition-all duration-500 overflow-hidden">

                  <!-- Interactive Hover Background -->
                  <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-400/5 rounded-full blur-3xl group-hover:bg-sky-400/15 transition-all duration-700"></div>

                  <div class="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 mb-2">
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{{ city.country }}</span>
                      </div>
                      <h4 class="text-white font-bold text-base group-hover:text-sky-400 transition-colors">{{ city.city }}</h4>
                    </div>
                    <div class="relative">
                      <div class="absolute inset-0 bg-sky-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img :src="`https://openweathermap.org/img/wn/${city.icon}@2x.png`" :alt="city.description" class="w-14 h-14 relative z-10 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <div class="flex items-end gap-1 mb-6 relative z-10">
                    <span class="text-5xl font-black text-white tracking-tighter">{{ city.temp }}</span>
                    <span class="text-2xl font-light text-slate-500 mb-1.5">°C</span>
                  </div>

                  <div class="space-y-4 relative z-10">
                      <div class="pt-4 border-t border-white/5">
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-[10px] font-black text-slate-500 uppercase tracking-wider">{{ t('dashboard.analytics.humidity') }}</span>
                          <span class="text-[10px] font-mono text-sky-400 font-bold">{{ city.humidity }}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                          <div class="h-full bg-linear-to-r from-sky-500 to-sky-400 transition-all duration-1000 ease-out" :style="{ width: `${city.humidity}%` }"></div>
                        </div>
                      </div>
                    <div class="flex items-center gap-2 text-[10px] text-slate-400 italic">
                      <div class="w-1 h-1 rounded-full bg-sky-400"></div>
                      {{ city.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Visuals: Market & Calendar -->
        <div class="lg:col-span-4 space-y-8">

          <!-- Market Insights -->
          <div class="rounded-[2.5rem] border border-white/10 bg-surface/30 backdrop-blur-md overflow-hidden shadow-2xl">
            <div class="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-xl bg-emerald-400/10 text-emerald-400">
                  <TrendingUp class="w-5 h-5" />
                </div>
                <h3 class="text-white font-bold font-['Syne']">{{ t('dashboard.analytics.marketTitle') }}</h3>
              </div>
              <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{{ marketData?.market_status.label || t('dashboard.status.live') }}</span>
              </div>
            </div>

            <div class="p-8">
              <div v-if="loading.market" class="flex items-center justify-center py-16">
                <Loader2 class="w-10 h-10 text-emerald-400 animate-spin opacity-30" />
              </div>
              <div v-else class="space-y-4">
                <div v-for="stock in marketData?.stocks.slice(0, 4)" :key="stock.symbol"
                  class="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all duration-300 group">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-sm text-slate-400 group-hover:bg-emerald-400/10 group-hover:text-emerald-400 transition-colors">
                      {{ stock.symbol.substring(0, 2) }}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-black text-white tracking-tight">{{ stock.symbol }}</span>
                      <span class="text-[10px] text-slate-500 font-bold uppercase tracking-tighter truncate w-28">{{ stock.name }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-sm font-black text-white">${{ parseFloat(stock.price).toFixed(2) }}</span>
                    <div :class="['flex items-center gap-1 text-[10px] font-black', stock.trend === 'up' ? 'text-emerald-400' : 'text-red-400']">
                      <span>{{ stock.trend === 'up' ? '▲' : '▼' }}</span>
                      <span>{{ stock.change_percent }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Calendar Overview -->
          <div class="rounded-[2.5rem] border border-white/10 bg-surface/30 backdrop-blur-md overflow-hidden shadow-2xl">
            <div class="p-8 border-b border-white/5 flex items-center gap-3 bg-white/2">
              <div class="p-2 rounded-xl bg-violet-400/10 text-violet-400">
                <CalendarDays class="w-5 h-5" />
              </div>
              <h3 class="text-white font-bold font-['Syne']">{{ t('dashboard.analytics.holidayTitle') }}</h3>
            </div>

            <div class="p-8">
              <div v-if="loading.holidays" class="flex items-center justify-center py-16">
                <Loader2 class="w-10 h-10 text-violet-400 animate-spin opacity-30" />
              </div>
              <div v-else class="space-y-8">
                <!-- Current Events -->
                <div v-if="filteredHolidays.today.length" class="space-y-4">
                  <div class="flex items-center justify-between px-1">
                    <span class="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">{{ t('dashboard.analytics.activeToday') }}</span>
                    <div class="h-px flex-1 bg-violet-400/20 mx-4"></div>
                    <span class="text-[10px] font-mono text-violet-500 font-bold">{{ filteredHolidays.today.length }}</span>
                  </div>
                  <div v-for="h in filteredHolidays.today" :key="h.name + h.countryCode"
                    class="group relative p-5 rounded-2xl bg-violet-400/5 border border-violet-400/20 overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-400 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
                    <div class="flex justify-between items-center relative z-10">
                      <span class="text-xs font-black text-white pr-4 leading-relaxed">{{ h.localName }}</span>
                      <span class="px-2 py-1 rounded-lg bg-violet-400/10 text-[9px] font-black text-violet-300 border border-violet-400/20">{{ h.countryCode }}</span>
                    </div>
                  </div>
                </div>

                <!-- Upcoming Timeline -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between px-1">
                    <span class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{{ t('dashboard.analytics.forecast') }}</span>
                    <div class="h-px flex-1 bg-white/10 mx-4"></div>
                  </div>
                  <div class="space-y-3">
                    <div v-for="h in filteredHolidays.upcoming.slice(0, 5)" :key="h.name + h.countryCode"
                      class="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-all duration-300">
                      <div class="flex flex-col gap-1">
                        <span class="text-[11px] font-black text-slate-200">{{ h.localName }}</span>
                        <div class="flex items-center gap-2">
                          <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                          <span class="text-[9px] text-slate-500 font-mono">{{ h.date }}</span>
                        </div>
                      </div>
                      <span class="text-[9px] font-black text-slate-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5 uppercase">{{ h.countryCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <div class="flex flex-wrap justify-center gap-10">
          <div v-for="tech in footerTech" :key="tech.key" class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-white/5 text-sky-400 shadow-lg">
              <component :is="tech.icon" class="w-4 h-4" />
            </div>
            <div class="flex flex-col">
              <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">{{ t(`dashboard.status.${tech.key}`) }}</span>
              <span class="text-[10px] font-bold text-white uppercase">{{ tech.value }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 px-6 py-3 rounded-2xl bg-white/2 border border-white/5 shadow-inner">
            <div class="flex flex-col items-end">
              <span class="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">{{ t('dashboard.status.live') }}</span>
              <span class="text-[10px] text-slate-400 font-mono tracking-tighter">SLB-INTERNAL-ST-2024</span>
            </div>
            <div class="h-8 w-px bg-white/10"></div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span class="text-[10px] font-black text-white uppercase tracking-widest">{{ t('dashboard.status.live') }}</span>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import {
  CloudSun, TrendingUp, CalendarDays, Loader2,
  Database, Zap, ShieldCheck, Thermometer, Globe, BarChart3
} from 'lucide-vue-next'

defineOptions({ name: 'DashboardSection' })

const { t } = useI18n()

// Report Configuration
const activeFilter = ref('all')
const lastRefresh = ref(new Date().toLocaleTimeString())
const filters = [
  { id: 'all', label: 'All Regions' },
  { id: 'CO', label: 'Colombia' },
  { id: 'US', label: 'United States' },
  { id: 'global', label: 'Global (Other)' }
]

// Data State
interface Weather { city: string; country: string; temp: number; feels_like: number; humidity: number; icon: string; description: string; }
interface Stock { symbol: string; name: string; price: string; trend: 'up' | 'down'; change_percent: string; }
interface Market { stocks: Stock[]; market_status: { open: boolean; label: string; }; }
interface Holiday { date: string; localName: string; name: string; countryCode: string; }
interface Holidays { today: Holiday[]; upcoming: Holiday[]; }

const weatherData = ref<Weather[]>([])
const marketData = ref<Market | null>(null)
const holidayData = ref<Holidays | null>(null)

const loading = reactive({
  weather: true,
  market: true,
  holidays: true
})

// Power BI Computed Metrics
const filteredWeather = computed(() => {
  if (activeFilter.value === 'all') return weatherData.value
  if (activeFilter.value === 'global') return weatherData.value.filter(c => c.country !== 'CO' && c.country !== 'US')
  return weatherData.value.filter(c => c.country === activeFilter.value)
})

const filteredHolidays = computed(() => {
  if (!holidayData.value) return { today: [], upcoming: [] }
  if (activeFilter.value === 'all') return holidayData.value
  const filterFn = (list: Holiday[]) => {
    if (activeFilter.value === 'global') return list.filter(h => h.countryCode !== 'CO' && h.countryCode !== 'US')
    return list.filter(h => h.countryCode === activeFilter.value)
  }
  return { today: filterFn(holidayData.value.today), upcoming: filterFn(holidayData.value.upcoming) }
})

const avgTemp = computed(() => {
  if (!weatherData.value.length) return 0
  const sum = weatherData.value.reduce((acc, curr) => acc + curr.temp, 0)
  return Math.round(sum / weatherData.value.length)
})

const kpis = computed(() => [
  { key: 'avgTemp', value: avgTemp.value, unit: '°C', icon: Thermometer, color: 'text-sky-400' },
  { key: 'marketStatus', value: marketData.value?.market_status?.label || t('dashboard.status.live'), icon: BarChart3, color: 'text-emerald-400' },
  { key: 'activeHolidays', value: holidayData.value?.today?.length || 0, icon: Globe, color: 'text-violet-400' },
  { key: 'connectedNodes', value: '04', icon: Database, color: 'text-blue-400' }
])

const footerTech = [
  { key: 'loading', value: 'Node.js v20', icon: Database },
  { key: 'live', value: 'Axios / REST', icon: Zap },
  { key: 'systemActive', value: 'CORS / HTTPS', icon: ShieldCheck }
]

// API Service
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const fetchData = async () => {
  try {
    const [w, m, h] = await Promise.all([
      axios.get(`${API_BASE}/weather`).then(r => r.data.data),
      axios.get(`${API_BASE}/market`).then(r => r.data.data),
      axios.get(`${API_BASE}/holidays/today`).then(r => r.data.data)
    ])
    weatherData.value = w
    marketData.value = m
    holidayData.value = h
    lastRefresh.value = new Date().toLocaleTimeString()
  } catch (e) {
    console.error('Dashboard synchronization error', e)
  } finally {
    loading.weather = false
    loading.market = false
    loading.holidays = false
  }
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
