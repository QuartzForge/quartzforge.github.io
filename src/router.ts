import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import EcosystemView from './views/EcosystemView.vue'
import DocsView from './views/DocsView.vue'
import ProjectView from './views/ProjectView.vue'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/ecosystem', name: 'ecosystem', component: EcosystemView },
    { path: '/docs', name: 'docs', component: DocsView },
    { path: '/quartz', name: 'quartz', component: ProjectView, props: { projectId: 'quartz' } },
    { path: '/facet', name: 'facet', component: ProjectView, props: { projectId: 'facet' } },
    { path: '/obsidian', name: 'obsidian', component: ProjectView, props: { projectId: 'obsidian' } },
    { path: '/pulse', name: 'pulse', component: ProjectView, props: { projectId: 'pulse' } },
    { path: '/vault', name: 'vault', component: ProjectView, props: { projectId: 'vault' } },
  ],
})
