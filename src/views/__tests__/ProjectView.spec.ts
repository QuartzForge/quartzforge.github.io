import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProjectView from '../ProjectView.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountProject(projectId: string) {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(ProjectView, {
    props: { projectId },
    global: {
      plugins: [i18n],
      stubs: ['RouterLink', 'CodeTabs', 'CmdPanel', 'VersionBadge', 'StatusPill', 'RoadmapSection'],
      renderStubDefaultSlot: true,
    },
  })
}

describe('ProjectView', () => {
  it('renders the hero with the flat package glyph, h1 and mono hero note', () => {
    const w = mountProject('quartz')
    const glyph = w.find('[data-project-glyph]')
    expect(glyph.exists()).toBe(true)
    expect(glyph.attributes('style')).toContain('var(--pkg-quartz)')
    expect(w.find('h1').exists()).toBe(true)
    const note = w.find('[data-hero-note]')
    expect(note.exists()).toBe(true)
    expect(note.text()).toContain('Crystal')
    expect(note.text()).toContain('MIT')
  })

  it('links the repo in the hero note only for released projects', () => {
    const released = mountProject('facet')
    const releasedLink = released.find('[data-hero-note] a')
    expect(releasedLink.exists()).toBe(true)
    expect(releasedLink.attributes('href')).toBe('https://github.com/QuartzForge/facet')
    const design = mountProject('vault')
    const designLink = design.find('[data-hero-note] a')
    expect(designLink.exists()).toBe(false)
    expect(design.find('[data-hero-note]').text()).toContain('QuartzForge/vault')
  })

  it('shows the when-not-to-use section as a warning alert', () => {
    const w = mountProject('quartz')
    const alert = w.find('[data-slot="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('role')).toBe('alert')
    expect(alert.classes().join(' ')).toContain('amber')
    expect(w.text()).toContain(ptBR.project.whenNotTitle)
  })

  it('shows an honest in-development placeholder for design projects', () => {
    const w = mountProject('vault')
    const placeholder = w.find('[data-placeholder]')
    expect(placeholder.exists()).toBe(true)
    expect(placeholder.text()).toContain(ptBR.project.inDevelopment)
    expect(placeholder.text()).toContain(ptBR.project.notYet)
    expect(w.findComponent({ name: 'CodeTabs' }).exists()).toBe(false)
  })

  it('renders the pager with prev and next labels', () => {
    const w = mountProject('facet')
    const pager = w.find('[data-pager]')
    expect(pager.exists()).toBe(true)
    expect(pager.text()).toContain(ptBR.project.pager.prev)
    expect(pager.text()).toContain(ptBR.project.pager.next)
  })

  it('keeps the 404 branch with translated text for an unknown project', () => {
    const w = mountProject('unknown')
    expect(w.text()).toContain('404')
    expect(w.text()).toContain(ptBR.project.notFound)
  })
})
