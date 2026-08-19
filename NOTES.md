# QuartzForge — notas de construção

Site do QuartzForge, framework completo para a linguagem Crystal, construído a partir da
gramática visual de três referências indicadas pelo usuário.

- **Modo:** réplica **visual** (não clone byte a byte). Estrutura, ritmo e vocabulário de
  interação vêm das referências; marca, paleta, tipografia e 100% do conteúdo são originais.
- **Idioma:** pt-BR em toda a interface. Identificadores de código, nomes de projeto e termos
  técnicos (`preload`, `SKIP LOCKED`, RFC 9457) permanecem como são.
- **Data:** 19/08/2026.

---

## 1. Referências e o que foi extraído

Reconhecimento feito baixando o HTML e os CSS reais de cada site e extraindo os valores
computados — nada foi reconstruído de memória. Artefatos em `RECON/`.

| Site | Canvas | Acento | Display / Mono | Raio |
|---|---|---|---|---|
| nestjs.com | `#050303` | `#ea2845` · `#ff318c` | Manrope / Geist Mono | `.5rem` |
| adonisjs.com | claro | indigo + marca-texto `#f6ff92` | Instrument Sans / JetBrains Mono | `.125rem → 2rem` |
| bun.sh | `#fff` ⇄ `#0d0a0c` | `#ff1f8f` ⇄ `#ff2e97` | Archivo / Martian Mono | `2–6px` |
| **crystal-lang.org** | `#080808` / `#1c1c1c` | **nenhum** — paleta 100% cinza | Roboto / **Roboto Mono** | `4px · 6px · 10px` |

A quarta referência entrou depois, a pedido: o site não parecia um projeto do ecossistema Crystal.
Valores medidos no CSS real deles (`RECON/css/crystal-*.css`): `--black: hsl(0,0%,3%)` e
`hsl(0,0%,11%)`, `--code-bg: hsl(0,0%,13%)`, `--border-color: hsl(0,0%,25%)` e
`--border-color-heavy: hsl(0,0%,32%)`, `--alabaster: rgb(237,237,237)`, `--code-font: "Roboto Mono"`,
e um sistema de **geometria hexagonal** (`--hex-height`, `--cos-a`) com
`clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)` — o facetado do logo virando layout.

**DNA convergente adotado** (o que os três fazem igual e funciona):

1. Canvas quase monocromático com **exatamente um** acento quente.
2. Fonte mono usada estruturalmente — comando de instalação, nomes de API, benchmarks — e não
   como enfeite.
3. Herói = proposição em uma linha + comando copiável + painel de código com abas.
4. Grade de "pilares" que nomeia os subpacotes (bun: Runtime/PM/Test/Bundler;
   adonis: pacotes oficiais; nest: Modules/DI/Type Safety) — mapeada 1:1 nos cinco projetos.
5. Cargas de trabalho **nomeadas** em vez de "10× mais rápido".
6. Raios pequenos, bordas hairline, sem sombra fora de sobreposições.

**Detalhe pego no recon que contraria a memória comum:** bun.sh não usa mais o fundo creme
(`#fbf0df`). Hoje é branco/quase-preto com rosa quente. O clone segue o estado atual do site,
não a versão antiga.

## 2. Identidade própria do QuartzForge

Deliberadamente fora do crimson (nest), do rosa (bun) e do indigo (adonis):

Os cinzas são **acromáticos** (chroma zero) e rastreiam valores reais do crystal-lang.org.
Essa é a decisão que mais aproxima o site da linguagem: qualquer matiz no cinza faz ler como
"dark mode de SaaS" em vez de preto Crystal.

| Token | Valor | sRGB | Origem |
|---|---|---|---|
| `--bg` | `oklch(17% 0 0)` | `#0f0f0f` | entre os dois pretos deles |
| `--bg-deep` | `oklch(13.4% 0 0)` | `#080808` | = `--black: hsl(0,0%,3%)` |
| `--surface` | `oklch(22.6% 0 0)` | `#1c1c1c` | = `--black: hsl(0,0%,11%)` |
| `--code-bg` | `oklch(24.8% 0 0)` | `#212121` | = `--code-bg: hsl(0,0%,13%)` |
| `--border` | `oklch(37.1% 0 0)` | `#404040` | = `--border-color: hsl(0,0%,25%)` |
| `--border-sh` | `oklch(43.9% 0 0)` | `#525252` | = `--border-color-heavy` |
| `--fg` | `oklch(94.6% 0 0)` | `#ededed` | = `--alabaster` |
| `--accent` | `oklch(78% 0.155 62)` | `#fd9e3d` | âmbar de forja — QuartzForge |
| `--prism` | `oklch(72% 0.140 300)` | `#b28fef` | violeta prismática — só no motivo cristalino |

**O acento âmbar continua.** A paleta do Crystal é inteiramente cinza — eles não têm cor de marca —,
então não há conflito. Num chrome acromático o âmbar fica mais disciplinado e mais visível.

Tipografia: **Space Grotesk** (display, do QuartzForge), pilha do sistema (corpo),
**Roboto Mono** (código — é a `--code-font` do crystal-lang.org, a fonte que o dev de Crystal
já associa à linguagem). Google Fonts com fallback de sistema; legível offline.

Geometria: `--crystal-hex` é o hexágono do componente **`.hex-icon`** deles (conferido em
`.hex-icon .inner{…clip-path:polygon(…)}`), aplicado à marca (nav e rodapé) e aos glifos dos cinco
pacotes. Não é o logo — é a geometria do sistema deles. Substitui um pentágono improvisado.

### Tema de sintaxe — copiado do crystal-lang.org

Esta é a superfície que mais faz o site pertencer (ou não) ao ecossistema: o painel de código é
o maior bloco visual da página, e um dev de Crystal reconhece o esquema de cores da doc oficial
antes de ler qualquer palavra.

Valores escritos **literalmente em `hsl()`**, sem conversão — a conversão é justamente onde o erro
entra. São as variáveis `--md-code-hl-*` do tema escuro deles, com as classes Rouge que cada uma pinta:

| token | valor | variável deles | classes Rouge | contraste |
|---|---|---|---|---|
| `--t-kw` | `hsl(219,54%,64%)` `#7294d5` | `keyword` | `.k .kd .kn .kp .kr .kt` | 5,30:1 |
| `--t-cls` | `hsl(17,52%,61%)` `#cf8568` | `constant` | `.nc .no .bp` | 5,53:1 |
| `--t-str` | `hsl(130,48%,51%)` `#46be5a` | `string` | `.s .s1 .s2 .sb .sc .si` | 6,72:1 |
| `--t-num` | `hsl(291,45%,65%)` `#c27ece` | `number` | `.m .mi .mf .mh .mo .il` | 5,47:1 |
| `--t-sym` | igual a `--t-str` | `string` | `.ss` — símbolo cai no grupo string | 6,72:1 |
| `--t-fn` | `hsl(0,0%,87%)` `#dedede` | `name` | `.n .nb .nf` | 11,93:1 |
| `--t-cm` | `hsl(0,0%,65%)` `#a6a6a6` | `comment` (`--lighter-gray`) | `.c .cm .c1 .ch` | 6,58:1 |

**A característica do tema:** nome de método **não recebe cor**. Só palavra-chave, constante,
string e número são pintados. É isso que dá a sobriedade — a paleta anterior (violeta/amarelo/
laranja/ciano) coloria quase tudo e lia como tema de editor genérico.

Os painéis de código seguem escuros nos dois temas do site, então valem sempre os valores do
tema escuro deles (as variantes claras existem no CSS do Crystal e ficaram de fora).

Painéis de código são **mais claros que a página** (`#212121` sobre `#0f0f0f`), como no site do
Crystal, e não mais escuros como é o padrão em sites de dev-tool.

Contraste conferido em 23 pares: `fg` 16,3:1 · `muted` 7,2:1 · acento 9,2:1 ·
texto do botão sobre acento 9,1:1 · todos os 7 tokens de sintaxe ≥ 3,7:1 sobre `#212121`.

Tema claro completo em `[data-theme="light"]`, alternável e persistido em `localStorage`.

**O floreio único:** a demo de erro de compilação na home (`#compilador`) — código com a linha
inválida sublinhada e a saída real do compilador ao lado. É o argumento do produto virando
imagem, em vez de uma ilustração decorativa.

## 3. Arquivos

```
index.html          landing: herói, 5 projetos, demo do compilador, arquitetura, princípios, prova
ecosystem.html      os 5 projetos em detalhe, filtro por escopo, matriz de compatibilidade
docs.html           documentação: sidebar com busca, TOC com scroll-spy, guia de início
quartz.html         framework HTTP
facet.html          validação isolada
obsidian.html       data mapper tipado
pulse.html          fila de jobs em Postgres
vault.html          cliente OAuth multi-provedor
css/quartzforge.css folha compartilhada (tokens, componentes, responsivo, print)
js/quartzforge.js   tema, abas, copiar, busca, scroll-spy, filtros, menu, reveal
RECON/              HTML e CSS baixados das referências + design-dna.json
```

Abrir `index.html` direto no navegador funciona — não há build nem servidor.

## 4. Interações implementadas (não são mockups)

- Abas de código (mouse + setas do teclado) na home, docs e nas cinco páginas de projeto.
- Botão copiar com feedback de estado, com fallback para `execCommand` em contexto não seguro.
- Busca na documentação filtrando a navegação em tempo real, com estado vazio e atalho `/`.
- TOC com scroll-spy via `IntersectionObserver`.
- Filtro por escopo no ecossistema, com contador ao vivo.
- Alternância de tema com persistência e sem flash na carga (bootstrap inline no `<head>`).
- Menu mobile em gaveta; sumário da documentação colapsável abaixo de 900px.

## 5. Convenção de idioma

Regra fixa do projeto, aplicada nas 8 páginas:

- **Interface em pt-BR** — títulos, prosa, navegação, rótulos de aba, legendas de tabela.
- **Blocos de código em inglês** — identificadores, nomes de arquivo, comentários, saída de
  terminal, SQL e JSON de exemplo. É a convenção de qualquer biblioteca open-source: quem lê a
  doc precisa poder colar o trecho no próprio projeto.

Glossário do domínio de exemplo (uma aplicação de faturamento):
`Invoice` / `invoices`, `Customer` / `customers`, `LineItem` / `line_items`, `Payment` / `payments`,
`NewInvoice`, `InvoicesController`, `SendInvoice`, `issued_at`, `due_at`, `Draft·Sent·Paid·Overdue`,
projeto `billing`, `Session` / `User`.

**Única exceção deliberada:** em `facet.html`, a aba "mensagens" mostra
`Facet.messages "pt-BR", { … }` com os textos em português. Ali o pt-BR é o conteúdo do exemplo —
é justamente a demonstração da tabela de tradução —, não uma inconsistência. As chaves de erro
(`size`, `format_email`, `weak_password`) seguem em inglês, como manda a API.

O JSON de erro em `docs.html` usa `field` / `rule` / `detail` e mensagens em inglês: o padrão do
framework é inglês, e a localização é um recurso ao qual você adere explicitamente.

## 6. Honestidade de conteúdo

- **Nenhum número de performance foi inventado.** A seção "Prova, não promessa" lista cargas
  nomeadas e o comando para reproduzir; os valores estão como `—` com a razão declarada.
- Cada página de projeto tem um bloco **"Quando não usar"**. É deliberado: um site de framework
  que só sabe elogiar a si mesmo perde credibilidade com o público que ele quer atingir.
- Status por projeto (`estável` / `beta`) é consistente entre home, ecossistema e páginas.
- O código Crystal é plausível e internamente coerente, mas descreve uma API **de projeto**:
  não existe repositório publicado por trás dele.

## 7. Checklist antes de publicar

- [ ] **Marcas de terceiros:** os nomes NestJS, AdonisJS e Bun aparecem apenas neste NOTES.md e
      em `RECON/`. Nenhum ativo, logo, fonte licenciada ou trecho de CSS dessas empresas foi
      copiado para os arquivos entregues. Se `RECON/` for versionado ou publicado, remova antes —
      ele contém HTML e CSS de produção de terceiros, baixado apenas para análise.
- [ ] **Domínios e URLs:** o domínio do projeto está padronizado em **`quartzforge.org`**
      (`https://quartzforge.org`, `https://get.quartzforge.org` para o instalador, e
      `https://quartzforge.org/errors/*` nos `type` das respostas RFC 9457). Registrar o domínio,
      publicar o endpoint do instalador e criar as páginas de `/errors/*` — o `type` da RFC 9457
      deve resolver para uma explicação do erro, não dar 404.
- [ ] **Não confundir com placeholders alheios:** `app.example.com` é a aplicação fictícia dos
      exemplos de OAuth (não é nosso), `sso.acesso.gov.br` é o provedor real usado como exemplo de
      provedor customizado, e `github.com/quartzforge/*` são os repositórios — apontar para os reais.
- [ ] **Links de comunidade:** GitHub, Discussões, Guia de contribuição e Política de versões
      apontam para `index.html#repositorios`. Apontar para os destinos reais.
- [ ] **Fontes:** hoje vêm do Google Fonts. Para produção, considere auto-hospedar
      Space Grotesk e JetBrains Mono (ambas SIL OFL) e remover o `preconnect`.
- [ ] **Números:** preencher a tabela de benchmarks só depois de o CI publicar os resultados,
      com hardware e versão de compilador declarados — como o próprio texto promete.
- [ ] **Analytics:** nenhum script de rastreamento foi incluído. Se adicionar, avalie consentimento.

## 8. Lacunas conhecidas

- A documentação é uma página só (`docs.html`); a navegação lateral aponta para âncoras dela.
  Um site real quebraria isso em várias páginas.
- Não há busca full-text de conteúdo — a busca filtra os títulos e palavras-chave da navegação.
- Sem página de blog, changelog ou casos de uso; nenhuma foi pedida.
- A verificação foi estática (estrutura, pareamento de tags, fiação dos componentes JS) mais
  leitura do arquivo. Não houve captura de tela em navegador nesta rodada.
