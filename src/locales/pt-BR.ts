export default {
  nav: {
    overview: 'Visão geral',
    ecosystem: 'Ecossistema',
    documentation: 'Documentação',
    projects: 'Projetos',
    quartz: 'quartz — HTTP',
    facet: 'facet — validação',
    obsidian: 'obsidian — dados',
    pulse: 'pulse — filas',
    vault: 'vault — OAuth',
  },
  status: {
    development: 'Em desenvolvimento',
    released: 'Lançado',
  },
  home: {
    heroTitle: 'O ecossistema para APIs sérias em Crystal.',
    heroSubtitle:
      'QuartzForge reúne framework HTTP, validação, dados, filas e autenticação — cada peça independente, instalada separadamente.',
    installLabel: 'Instalação — shard.yml',
    ctaDocs: 'Ler a documentação',
    ctaEcosystem: 'Ver o ecossistema',
    projectsTitle: 'Projetos',
    principlesTitle: 'Princípios que atravessam o ecossistema',
    principles: [
      { title: 'A macro só coleta', body: 'Nenhuma lógica dentro de macro. O runtime é Crystal comum, com stack traces de verdade.' },
      { title: 'Wiring errado é erro de compilação', body: 'Dependência não registrada, rota conflitante, regra malformada — o build falha nomeando o problema.' },
      { title: 'Sem exceção para fluxo esperado', body: 'Validação devolve um resultado. Erros de API são problem+json RFC 9457.' },
    ],
    roadmapTitle: 'O que vem',
    roadmapSubtitle: 'Em desenvolvimento — API não lançada, sujeita a mudança.',
  },
  roadmap: {
    title: 'Roadmap',
    disclaimer: 'Planejado — não disponível.',
  },
  code: {
    copy: 'Copiar',
  },
  theme: {
    toggle: 'Ativar tema claro',
  },
  footer: {
    tagline: 'Projetos oficiais para construir aplicações completas em Crystal.',
    projects: 'Projetos',
    documentation: 'Documentação',
    community: 'Comunidade',
    quickStart: 'Início rápido',
    installation: 'Instalação',
    firstRoute: 'Primeira rota',
    github: 'GitHub',
    discussions: 'Discussões',
    contributing: 'Guia de contribuição',
    madeIn: 'Feito em Crystal',
  },
}
