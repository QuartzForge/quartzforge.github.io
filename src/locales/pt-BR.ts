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
  header: {
    guide: 'Começar',
    github: 'Repositórios no GitHub',
    lang: 'Trocar idioma',
  },
  drawer: {
    projects: 'Projetos',
  },
  status: {
    stable: 'estável',
    development: 'em desenvolvimento',
  },
  project: {
    inDevelopment: 'Em desenvolvimento',
    planned: 'planejado',
    noExamples:
      'API não lançada — sem exemplos de código até o primeiro release. O conteúdo abaixo é a visão de projeto.',
    gapTitle: 'A lacuna que preenche',
    whenNotTitle: 'Quando não usar',
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
  ecosystem: {
    title: 'Ecossistema',
    subtitle:
      'Cinco projetos independentes, instalados separadamente, desenhados para funcionarem juntos.',
    matrixTitle: 'Matriz de compatibilidade',
    columnProject: 'Projeto',
    columnStatus: 'Status',
    columnCrystal: 'Crystal',
    columnLicense: 'Licença',
    columnDeps: 'Dependências',
    noteTitle: 'Em desenvolvimento',
    noteBody:
      'obsidian, pulse e vault não lançaram v1 — a API é desenhada a partir das specs aprovadas, mas pode mudar. Esta página não documenta APIs: documenta visão e roadmap.',
  },
  docs: {
    title: 'Documentação',
    subtitle: 'Do zero a uma API rodando — os exemplos abaixo vêm dos exemplos enviados com quartz 0.1.1 e facet 0.1.0 e do README.',
    step: 'Passo {n}',
    installation: 'Instalação',
    installationBody:
      'Adicione os shards ao shard.yml. Cada peça é independente — instale só o que usar.',
    payload: 'Defina o payload',
    payloadBody:
      'Um payload é um record comum com regras declaradas ao lado do campo. A macro do Facet coleta as annotations em compile-time e gera a validação.',
    controller: 'O controller',
    controllerBody:
      'Controllers são classes comuns, sem classe-base. A annotation registra a rota; o tipo do argumento body é desserializado e entregue já validado pelo seu código.',
    validation: 'Validando a entrada',
    validationBody:
      'Facet.validate devolve um ValidationResult — sem exceção. O contrato com o Quartz é direto: FieldError do Facet vira FieldError do Quartz, e o BindError vira 400 problem+json.',
    run: 'Rodando',
    runBody: 'Quartz.configure define a porta e o título do OpenAPI; Quartz.run sobe o servidor.',
    test: 'Testando',
    testBody:
      'As specs de cada repo são a referência real de teste hoje: rodar crystal spec dentro do projeto. O client in-memory é interno na 0.1.x.',
    errors: 'Formato de erro',
    errorsBody:
      'Todo erro é application/problem+json (RFC 9457). O campo type é o identificador estável para tratamento programático — estes são os nove valores emitidos pelo Quartz:',
  },
  code: {
    copy: 'copiar',
    copied: 'copiado',
  },
  theme: {
    toggle: 'Ativar tema claro',
    lang: 'Trocar idioma',
  },
  footer: {
    tagline: 'Projetos oficiais para construir aplicações completas em Crystal.',
    projects: 'Projetos',
    documentation: 'Documentação',
    community: 'Comunidade',
    github: 'GitHub',
    discussions: 'Discussões',
    contributing: 'Guia de contribuição',
    versionPolicy: 'Política de versões',
    docs: {
      quickStart: 'Início rápido',
      installation: 'Instalação',
      controller: 'O controller',
      errors: 'Formato de erro',
    },
    madeIn: 'Feito em Crystal',
  },
}
