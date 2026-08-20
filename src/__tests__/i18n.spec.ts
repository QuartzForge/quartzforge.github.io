import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const src = join(__dirname, '..')
const BLOCKLIST = ['copiar', 'Documentação', 'Buscar', 'Estável', 'Feito em Crystal', 'Sumário', 'Projeto não encontrado', 'em desenvolvimento']
// Brand names are never translated and are allowed in sr-only position.
const BRAND_ALLOWLIST = ['QuartzForge']

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('__tests__')) continue
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p, acc)
    else if (p.endsWith('.vue')) acc.push(p)
  }
  return acc
}

function describeFile(file: string): string {
  return file.replace(`${src}/`, '')
}

describe('i18n hardcode guard', () => {
  it('no blocklisted pt-BR UI strings in vue templates', () => {
    const hits: string[] = []
    for (const file of walk(src)) {
      const content = readFileSync(file, 'utf8')
      for (const word of BLOCKLIST) {
        if (content.includes(word)) hits.push(`${describeFile(file)}: ${word}`)
      }
    }
    expect(hits).toEqual([])
  })

  it('no hardcoded aria-label literals', () => {
    const re = /aria-label="([^"{]*[A-Za-zÀ-ÿ])"/g
    const hits: string[] = []
    for (const file of walk(src)) {
      const content = readFileSync(file, 'utf8')
      let m: RegExpExecArray | null
      while ((m = re.exec(content))) {
        if (m[1].includes('${')) continue
        hits.push(`${describeFile(file)}: aria-label="${m[1]}"`)
      }
    }
    expect(hits).toEqual([])
  })

  it('no hardcoded sr-only text', () => {
    const re = /class="[^"]*sr-only[^"]*"[^>]*>([^<{]*[A-Za-zÀ-ÿ][^<{]*?)</g
    const hits: string[] = []
    for (const file of walk(src)) {
      const content = readFileSync(file, 'utf8')
      let m: RegExpExecArray | null
      while ((m = re.exec(content))) {
        const text = m[1].trim()
        if (BRAND_ALLOWLIST.includes(text)) continue
        hits.push(`${describeFile(file)}: sr-only "${text}"`)
      }
    }
    expect(hits).toEqual([])
  })
})
