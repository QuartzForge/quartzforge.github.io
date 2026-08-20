import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import SiteHeader from '../SiteHeader.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

// The header watches route.path (the mobile Sheet closes on navigation), so
// it needs a real router in the mount — the app itself installs the same
// plugin. reka-ui dialogs render into a portal on document.body, so the
// Sheet content is queried there, not inside the wrapper.
function createTestRouter() {
  const blank = { template: '<div />' }
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: blank },
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

function sheetContent(): HTMLElement | null {
  return document.querySelector('[data-slot="sheet-content"]')
}

// reka-ui presence runs on animation frames; wait a beat for the portal to
// mount or unmount.
function settle(): Promise<void> {
  return new Promise((r) => setTimeout(r, 80))
}

describe('SiteHeader', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.body.innerHTML = ''
  })

  it('shows the hex brand mark and the two top-level links', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('.brand-mark').exists()).toBe(true)
    expect(wrapper.text()).toContain('QuartzForge')
    expect(wrapper.text()).toContain('Visão geral')
    expect(wrapper.text()).not.toContain('Ecossistema')
    expect(wrapper.text()).toContain('Documentação')
  })

  it('switches locale and persists it', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-lang-toggle]').trigger('click')
    expect(localStorage.getItem('qf-locale')).toBe('en')
    expect(wrapper.text()).toContain('Overview')
  })

  it('toggles theme, persists and flips the .dark class on documentElement', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-theme-toggle]').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('qf-theme')).toBe('dark')
    await wrapper.find('[data-theme-toggle]').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('qf-theme')).toBe('light')
  })

  it('opens and closes the mobile drawer (shadcn Sheet) with top-level and project links', async () => {
    const wrapper = mountHeader()
    expect(sheetContent()).toBeNull()
    await wrapper.find('[data-burger]').trigger('click')
    await settle()
    const content = sheetContent()
    expect(content).not.toBeNull()
    expect(content?.textContent).toContain('Visão geral')
    expect(content?.textContent).toContain('Documentação')
    expect(content?.textContent).toContain('quartz (HTTP)')
    expect(content?.textContent).toContain('facet (validação)')
    expect(content?.textContent).toContain('vault (OAuth)')
    await wrapper.find('[data-burger]').trigger('click')
    await settle()
    expect(sheetContent()).toBeNull()
  })

  it('closes the drawer when the route changes', async () => {
    const wrapper = mountHeader()
    await wrapper.find('[data-burger]').trigger('click')
    await settle()
    expect(sheetContent()).not.toBeNull()
    await (wrapper.vm.$router as ReturnType<typeof createTestRouter>).push('/docs')
    await settle()
    expect(sheetContent()).toBeNull()
  })

  it('marks the active top-level link with aria-current', () => {
    const wrapper = mountHeader()
    const links = wrapper.findAll('.nav-links > *')
    expect(links[0].attributes('aria-current')).toBe('page')
    expect(links[1].attributes('aria-current')).toBeUndefined()
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
      html.indexOf('data-nav-cta'),
      html.indexOf('data-burger'),
    ]
    expect(order.every((i) => i >= 0)).toBe(true)
    expect(order).toEqual([...order].sort((a, b) => a - b))
  })
})
