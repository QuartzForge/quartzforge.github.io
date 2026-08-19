import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import ptBR from '../locales/pt-BR'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [],
})

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

describe('smoke', () => {
  it('mounts the app', () => {
    const wrapper = mount(App, { global: { plugins: [router, i18n] } })
    expect(wrapper.text()).toContain('QuartzForge')
  })
})
