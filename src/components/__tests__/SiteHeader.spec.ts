import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import SiteHeader from '../SiteHeader.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

// The header watches route.path (drawer closes on navigation), so it needs a
// real router in the mount — the app itself installs the same plugin.
function createTestRouter() {
  const blank = { template: '<div />' }
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: blank },
      { path: '/ecosystem', component: blank },
      { path: '/docs', component: blank },
      { path: '/quartz', component: blank },
    ],
  })
}

function mountHeader() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(SiteHeader, {
    global: { plugins: [i18n, createTestRouter()], stubs: ['RouterLink'], renderStubDefaultSlot: true },
  })
}

describe('SiteHeader', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('shows the hex brand mark and the three top-level links', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('.brand-mark').exists()).toBe(true)
    expect(wrapper.text()).toContain('QuartzForge')
    expect(wrapper.text()).toContain('Visão geral')
    expect(wrapper.text()).toContain('Ecossistema')
    expect(wrapper.text()).toContain('Documentação')
  })

  it('switches locale and persists it', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-lang-toggle]').trigger('click')
    expect(localStorage.getItem('qf-locale')).toBe('en')
    expect(wrapper.text()).toContain('Overview')
  })

  it('toggles theme, persists and updates the document attribute', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-theme-toggle]').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('qf-theme')).toBe('light')
    await wrapper.find('[data-theme-toggle]').trigger('click')
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('opens and closes the mobile drawer', async () => {
    const wrapper = mountHeader()
    expect(wrapper.find('.drawer').attributes('data-open')).toBe('false')
    await wrapper.find('[data-burger]').trigger('click')
    expect(wrapper.find('.drawer').attributes('data-open')).toBe('true')
    await wrapper.find('[data-burger]').trigger('click')
    expect(wrapper.find('.drawer').attributes('data-open')).toBe('false')
  })

  it('closes the drawer when the route changes', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-burger]').trigger('click')
    expect(wrapper.find('.drawer').attributes('data-open')).toBe('true')
    await (wrapper.vm.$router as ReturnType<typeof createTestRouter>).push('/docs')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.drawer').attributes('data-open')).toBe('false')
    expect(document.body.style.overflow).toBe('')
  })

  it('marks the active top-level link with aria-current', () => {
    const wrapper = mountHeader()
    const links = wrapper.findAll('.nav-links > *')
    expect(links[0].attributes('aria-current')).toBe('page')
    expect(links[1].attributes('aria-current')).toBeUndefined()
    expect(links[2].attributes('aria-current')).toBeUndefined()
  })

  it('links the GitHub icon to the org home', () => {
    const wrapper = mountHeader()
    const link = wrapper.find('.nav-end a[href="https://github.com/QuartzForge"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })

  it('orders nav-end: theme, github, lang, cta, burger', () => {
    const wrapper = mountHeader()
    const html = wrapper.find('.nav-end').html()
    const order = [
      html.indexOf('data-theme-toggle'),
      html.indexOf('github.com/QuartzForge'),
      html.indexOf('data-lang-toggle'),
      html.indexOf('nav-cta'),
      html.indexOf('data-burger'),
    ]
    expect(order.every((i) => i >= 0)).toBe(true)
    expect(order).toEqual([...order].sort((a, b) => a - b))
  })
})
