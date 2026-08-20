<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects, type Project } from '../data/projects'
import versions from '../data/versions.json'
import { quartzExample, facetExample } from '../data/examples'
import CmdPanel from '../components/CmdPanel.vue'
import CodeTabs from '../components/CodeTabs.vue'
import Callout from '../components/Callout.vue'
import VersionBadge from '../components/VersionBadge.vue'

const { t, tm } = useI18n()

// t() returns the message key for non-string messages, so array messages
// must be read with tm(), which resolves the raw message of the active
// locale. Computed so a locale switch re-renders the section.
function listOf<T>(key: string): T {
  return tm(key) as unknown as T
}

const heroNote = computed(() => listOf<string[]>('home.heroNote'))
const compilerPoints = computed(() => listOf<{ title: string; body: string }[]>('compiler.points'))
const archPoints = computed(() => listOf<{ title: string; body: string }[]>('arch.points'))
const archArrows = computed(() => listOf<string[]>('arch.arrows'))
const principles = computed(() => listOf<{ title: string; body: string }[]>('principles.list'))
const proofRows = computed(() => listOf<string[]>('proof.rows'))

const heroTabs = [
  { label: 'quartz', file: 'src/app.cr', code: quartzExample },
  { label: 'facet', file: 'src/schemas/signup.cr', code: facetExample },
]

// The install panel shows real shard.yml snippets for the released projects
// only; when the version fetch degrades (offline, rate limit) nothing is
// fabricated — the panel renders empty instead of inventing a version.
const installTabs = computed(() => {
  const tabs: { id: string; label: string; code: string }[] = []
  for (const id of ['quartz', 'facet']) {
    const info = versions[id as keyof typeof versions]
    if (info.released && info.version) {
      tabs.push({
        id,
        label: id,
        code: `dependencies:\n  ${id}:\n    github: QuartzForge/${id}\n    version: ~> ${info.version}`,
      })
    }
  }
  return tabs
})

// Display order comes from the handoff template, not from projects.ts.
const pkgOrder = ['quartz', 'vault', 'pulse', 'facet', 'obsidian'] as const
const pkgCards = computed(() =>
  pkgOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined),
)
</script>

<template>
  <div>
    <!-- ============================================================= hero -->
    <section class="hero">
      <span class="facet" aria-hidden="true"></span>
      <div class="wrap hero-grid">
        <div>
          <p class="kicker">{{ t('home.heroKicker') }}</p>
          <h1>{{ t('home.heroLead') }} <span class="mark">{{ t('home.markWord') }}</span>.</h1>
          <p class="lede">{{ t('home.heroBody') }}</p>

          <CmdPanel :tabs="installTabs" />

          <div class="hero-actions">
            <RouterLink to="/docs" class="btn btn-primary">
              {{ t('home.ctaDocs') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </RouterLink>
            <RouterLink to="/ecosystem" class="btn btn-ghost">{{ t('home.ctaEcosystem') }}</RouterLink>
          </div>

          <p class="hero-note">
            <span v-for="(part, i) in heroNote" :key="i">{{ part }}</span>
          </p>
        </div>

        <CodeTabs v-reveal :tabs="heroTabs" />
      </div>
    </section>

    <!-- ====================================================== os 5 projetos -->
    <section class="section" id="projetos">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('home.projectsKicker') }}</p>
          <h2>{{ t('home.projectsTitle') }}</h2>
          <p>{{ t('home.projectsBody') }}</p>
        </div>

        <div v-reveal class="grid grid-3">
          <RouterLink
            v-for="p in pkgCards"
            :key="p.id"
            :to="`/${p.id}`"
            class="card pkg"
            :style="{ '--pkg': `var(--pkg-${p.id})` }"
          >
            <div class="pkg-top">
              <span class="pkg-glyph" aria-hidden="true">
                <svg v-if="p.id === 'quartz'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
                <svg v-else-if="p.id === 'vault'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                <svg v-else-if="p.id === 'pulse'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
                <svg v-else-if="p.id === 'facet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 13 4 4L19 7"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
              </span>
              <div>
                <div class="pkg-name">{{ p.name }}</div>
                <div class="pkg-role">{{ t(`home.role.${p.id}`) }}</div>
              </div>
            </div>
            <p>{{ p.description }}</p>
            <div class="pkg-meta"><VersionBadge :project-id="p.id" /></div>
          </RouterLink>

          <RouterLink to="/ecosystem" class="card pkg" style="--pkg: var(--muted)">
            <div class="pkg-top">
              <span class="pkg-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 17.5h7M17.5 14v7"/></svg></span>
              <div>
                <div class="pkg-name">{{ t('home.allProjects') }}</div>
                <div class="pkg-role">{{ t('home.allRole') }}</div>
              </div>
            </div>
            <p>{{ t('home.allBody') }}</p>
            <div class="pkg-meta"><span class="link-arrow">{{ t('home.openEcosystem') }} <span aria-hidden="true">→</span></span></div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============================ o floreio: erro em tempo de compilação -->
    <section class="section section-tint" id="compilador">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('compiler.kicker') }}</p>
          <h2>{{ t('compiler.title') }}</h2>
          <p>{{ t('compiler.body') }}</p>
        </div>

        <div v-reveal class="split">
          <div class="panel">
            <div class="panel-head">
              <span class="panel-file" style="margin-inline-start:0; padding-block:11px">src/reports/overdue.cr</span>
              <span class="pill pill-warn" style="margin-inline-start:auto">{{ t('compiler.concept') }}</span>
            </div>
            <pre class="code"><code>invoices = <span class="t-cls">Invoice</span>.query
  .<span class="t-fn">where</span>(status: <span class="t-sym">:overdue</span>)
  .<span class="t-fn">preload</span>(<span class="t-sym">:customer</span>)           <span class="t-cm"># only customer was loaded</span>
  .<span class="t-fn">limit</span>(<span class="t-num">200</span>)

invoices.<span class="t-fn">each</span> <span class="t-kw">do</span> |invoice|
<span class="line-ok">  charge(invoice.customer.email)      <span class="t-cm"># ✓ loaded</span></span>
<span class="line-bad">  record(invoice.<span class="bad">payments</span>.last)      <span class="t-cm"># ✗ not loaded</span></span>
<span class="t-kw">end</span></code></pre>
          </div>

          <div>
            <div class="panel">
              <div class="panel-head">
                <span class="panel-file" style="margin-inline-start:0; padding-block:11px">$ crystal build</span>
              </div>
              <pre class="code"><code><span class="t-cm">Compiling billing…</span>

<span style="color:var(--danger)">Error</span> in src/reports/overdue.cr:<span class="t-num">7</span>:<span class="t-num">18</span>

  relation <span class="t-str">`payments`</span> was not preloaded
  on <span class="t-cls">Invoice::Loaded(:customer)</span>

  <span class="t-cm">hint:</span> .preload(<span class="t-sym">:customer</span>, <span class="t-sym">:payments</span>)

<span style="color:var(--danger)">1 error</span> · no binary produced</code></pre>
            </div>

            <ul class="feature-list" style="margin-top: 26px">
              <li v-for="point in compilerPoints" :key="point.title">
                <span class="fl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg></span>
                <span><strong>{{ point.title }}</strong>{{ point.body }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================== como se encaixam -->
    <section class="section" id="arquitetura">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('arch.kicker') }}</p>
          <h2>{{ t('arch.title') }}</h2>
          <p>{{ t('arch.body') }}</p>
        </div>

        <div v-reveal class="split">
          <div class="diag">
            <div class="diag-row">
              <div class="diag-node" data-lead="true">
                <span class="n">quartz</span>
                <span class="d">{{ t('arch.diag.lead') }}</span>
              </div>
            </div>
            <div class="diag-arrow">{{ archArrows[0] }}</div>
            <div class="diag-row">
              <div class="diag-node">
                <span class="n">facet</span>
                <span class="d">{{ t('arch.diag.facet') }}</span>
              </div>
              <div class="diag-node">
                <span class="n">vault</span>
                <span class="d">{{ t('arch.diag.vault') }}</span>
              </div>
            </div>
            <div class="diag-arrow">{{ archArrows[1] }}</div>
            <div class="diag-row">
              <div class="diag-node">
                <span class="n">obsidian</span>
                <span class="d">{{ t('arch.diag.obsidian') }}</span>
              </div>
              <div class="diag-node">
                <span class="n">pulse</span>
                <span class="d">{{ t('arch.diag.pulse') }}</span>
              </div>
            </div>
            <div class="diag-arrow">{{ archArrows[2] }}</div>
            <div class="diag-row">
              <div class="diag-node">
                <span class="n">PostgreSQL</span>
                <span class="d">{{ t('arch.diag.pg') }}</span>
              </div>
            </div>
          </div>

          <div>
            <ul class="feature-list">
              <li v-for="(point, i) in archPoints" :key="point.title">
                <span class="fl-icon" aria-hidden="true">
                  <svg v-if="i === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/></svg>
                  <svg v-else-if="i === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 3v18M5 8l7-5 7 5v8l-7 5-7-5Z"/></svg>
                  <svg v-else-if="i === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 17h16M4 12h16M4 7h16"/><circle cx="8" cy="7" r="1.6" fill="currentColor"/><circle cx="15" cy="12" r="1.6" fill="currentColor"/><circle cx="11" cy="17" r="1.6" fill="currentColor"/></svg>
                </span>
                <span><strong>{{ point.title }}</strong>{{ point.body }}</span>
              </li>
            </ul>

            <RouterLink to="/ecosystem" class="link-arrow" style="margin-top:26px">
              {{ t('arch.link') }} <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ princípios -->
    <section class="section section-tint">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('principles.kicker') }}</p>
          <h2>{{ t('principles.title') }}</h2>
        </div>

        <div v-reveal class="grid grid-4">
          <div v-for="principle in principles" :key="principle.title" class="card">
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================ prova -->
    <section class="section" id="prova">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('proof.kicker') }}</p>
          <h2>{{ t('proof.title') }}</h2>
          <p>{{ t('proof.body') }}</p>
        </div>

        <div v-reveal class="proof">
          <div v-for="row in proofRows" :key="row" class="proof-row">
            <div class="w"><b>{{ row }}</b></div>
            <div class="v">{{ t('proof.pending') }}</div>
          </div>
        </div>

        <Callout variant="warn">
          <strong>{{ t('proof.noteTitle') }}</strong>
          <p>{{ t('proof.noteBody') }}</p>
        </Callout>
      </div>
    </section>

    <!-- ================================================================ CTA -->
    <section class="section" id="repositorios">
      <div class="wrap">
        <div v-reveal class="cta">
          <span class="facet" aria-hidden="true" style="inset-inline-end:-30%; top:-60%; opacity:.35"></span>
          <p class="kicker" style="justify-content:center; margin-bottom:8px">{{ t('cta.kicker') }}</p>
          <h2>{{ t('cta.title') }}</h2>
          <p>{{ t('cta.body') }}</p>
          <div class="cta-actions">
            <RouterLink to="/docs" class="btn btn-primary">
              {{ t('cta.primary') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </RouterLink>
            <RouterLink to="/ecosystem" class="btn btn-ghost">{{ t('cta.secondary') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
