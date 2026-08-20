import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import ptBR from '../locales/pt-BR'
import en from '../locales/en'

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

// A message lookup that falls back to the key string on a missing locale
// would silently render the key. Parity is asserted structurally instead:
// both locales must carry exactly the same leaf key paths.
function flatten(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null
      ? flatten(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  )
}

describe('locales', () => {
  it('pt-BR and en have identical key sets', () => {
    expect(flatten(ptBR).sort()).toEqual(flatten(en).sort())
  })
})
