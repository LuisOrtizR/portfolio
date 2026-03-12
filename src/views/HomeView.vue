<template>
  <AppLayout>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <DashboardSection />
    <CertificationsSection />
    <AiChatSection />
    <ContactSection />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import DashboardSection from '@/components/sections/DashboardSection.vue'
import CertificationsSection from '@/components/sections/Certificationssection.vue'
import AiChatSection from '@/components/sections/AiChatSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>
