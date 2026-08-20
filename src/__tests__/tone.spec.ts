import { describe, it, expect } from 'vitest'
import ptBR from '../locales/pt-BR'
import en from '../locales/en'

const FORMAL = ['por meio de', 'a fim de', 'acerca de', 'desta forma', 'desta maneira', 'utilizar', 'sendo que', 'tais como', 'no qual', 'iniciar o', 'obter o', 'conforme o']

describe('copy tone', () => {
  it('no em dashes in UI copy', () => {
    for (const [name, messages] of [['pt-BR', ptBR], ['en', en]] as const) {
      const text = JSON.stringify(messages)
      expect(text, name).not.toContain('—')
    }
  })

  it('no formal phrases in pt-BR copy', () => {
    const text = JSON.stringify(ptBR)
    for (const phrase of FORMAL) {
      expect(text, phrase).not.toContain(phrase)
    }
  })
})
