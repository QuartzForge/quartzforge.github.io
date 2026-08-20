import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import DocsView from './views/DocsView.vue'
import ProjectView from './views/ProjectView.vue'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/docs', name: 'docs', component: DocsView },
    { path: '/quartz', name: 'quartz', component: ProjectView, props: { projectId: 'quartz' } },
    { path: '/facet', name: 'facet', component: ProjectView, props: { projectId: 'facet' } },
    { path: '/vault', name: 'vault', component: ProjectView, props: { projectId: 'vault' } },
  ],
})
