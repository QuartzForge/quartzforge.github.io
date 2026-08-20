import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Callout from '../Callout.vue'

describe('Callout', () => {
  it('renders the warn variant by default', () => {
    const w = mount(Callout, { slots: { default: '<p>texto</p>' } })
    expect(w.find('.callout.callout-warn').exists()).toBe(true)
  })

  it('renders ok variant when requested', () => {
    const w = mount(Callout, { props: { variant: 'ok' }, slots: { default: '<p>x</p>' } })
    expect(w.find('.callout-ok').exists()).toBe(true)
  })
})
