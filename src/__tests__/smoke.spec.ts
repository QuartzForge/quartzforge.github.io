import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('smoke', () => {
  it('mounts the app', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('QuartzForge')
  })
})
