export default {
  nav: {
    overview: 'Visão geral',
    ecosystem: 'Ecossistema',
    documentation: 'Documentação',
    quartz: 'quartz — HTTP',
    facet: 'facet — validação',
    obsidian: 'obsidian — dados',
    pulse: 'pulse — filas',
    vault: 'vault — OAuth',
  },
  header: {
    guide: 'Começar',
    github: 'Repositórios no GitHub',
    burger: 'Abrir menu',
    navLabel: 'Principal',
  },
  drawer: {
    projects: 'Projetos',
  },
  sheet: {
    close: 'Fechar',
  },
  status: {
    stable: 'estável',
    development: 'em desenvolvimento',
  },
  project: {
    inDevelopment: 'Em desenvolvimento',
    gapTitle: 'A lacuna que preenche',
    whenNotTitle: 'Quando não usar',
    roadmapKicker: 'Roadmap',
    roadmapTitle: 'O que vem',
    roadmapPlanned: 'planejado',
    gapKicker: 'O vão que preenche',
    notYet: 'API não lançada — sujeita a mudança',
    pagerLabel: 'Outros projetos',
    pager: {
      prev: 'Ver o ecossistema',
      next: 'Ler a documentação',
    },
    notFound: 'Projeto não encontrado',
  },
  home: {
    heroKicker: 'Framework completo · Crystal ~> 1.21',
    heroLead: 'Uma stack inteira, numa linguagem',
    markWord: 'compilada',
    heroBody:
      'QuartzForge reúne cinco projetos oficiais que cobrem o caminho inteiro de uma aplicação — HTTP, validação, dados, filas e login. Nenhum deles exige os outros. Juntos, o compilador enxerga a aplicação de ponta a ponta.',
    heroNote: ['MIT', '·', 'sem runtime, sem VM', '·', 'binário único', '·', 'Linux · macOS · FreeBSD'],
    ctaDocs: 'Ler a documentação',
    ctaEcosystem: 'Ver o ecossistema',
    projectsKicker: 'Cinco projetos, zero garimpo',
    projectsTitle: 'Cada peça resolve um escopo. Nenhuma obriga a próxima.',
    projectsBody:
      'Você pode subir uma API só com quartz, usar facet dentro de um projeto Lucky, ou colocar pulse num serviço que já existe. O ganho de usar tudo junto é o compilador enxergar a aplicação inteira.',
    role: {
      quartz: 'HTTP',
      vault: 'OAuth',
      pulse: 'Filas',
      facet: 'Validação',
      obsidian: 'Dados',
    },
    allProjects: 'todos',
    allRole: 'Ecossistema',
    allBody:
      'Matriz de compatibilidade, dependências entre os projetos e o que cada um assume do seu banco e do seu runtime.',
    openEcosystem: 'Abrir ecossistema',
  },
  compiler: {
    kicker: 'O argumento principal',
    title: 'O N+1 não chega em produção porque não passa do build.',
    body:
      'Em quase toda ORM, esquecer um preload é um problema que só aparece sob carga. Em obsidian, a query devolve um tipo que só conhece as relações que você carregou — acessar qualquer outra é erro de compilação.',
    concept: 'conceito',
    points: [
      { title: 'A mensagem já traz a correção', body: 'O compilador sabe qual preload falta porque ele montou o tipo.' },
      { title: 'Vale para o editor também', body: 'O mesmo tipo alimenta o autocompletar: relações não carregadas não aparecem na lista.' },
      { title: 'Sem lazy loading escondido', body: 'Não existe fallback silencioso que dispara uma query dentro de um laço.' },
    ],
  },
  arch: {
    kicker: 'Como as peças se encaixam',
    title: 'Acoplamento por contrato, não por herança.',
    body:
      'Os projetos se conhecem por interfaces pequenas. quartz aceita qualquer validador que responda a #validate; pulse usa a mesma conexão que obsidian já abriu. Trocar uma peça não derruba as outras.',
    diag: {
      lead: 'recebe a requisição, roteia, responde',
      facet: 'valida e devolve tipo',
      vault: 'identidade do usuário',
      obsidian: 'lê e grava, relações verificadas',
      pulse: 'enfileira o que é lento',
      pg: 'dados e fila no mesmo lugar',
    },
    arrows: ['body cru', 'valor tipado', 'mesma conexão'],
    points: [
      { title: 'Um binário para tudo', body: 'API, worker, migrações e tarefas agendadas saem do mesmo build. O deploy é copiar um arquivo.' },
      { title: 'Uma dependência de infra', body: 'Postgres. A fila mora nele, as sessões podem morar nele, e não há Redis obrigatório no caminho.' },
      { title: 'Sem descoberta em runtime', body: 'Rotas, colunas e jobs são resolvidos na compilação. Não há varredura de diretórios no boot.' },
      { title: 'Macros só onde valem a pena', body: 'Metaprogramação fica nas definições de schema e coluna. O resto é Crystal comum, que o LSP entende.' },
    ],
    link: 'Ver a matriz de compatibilidade',
  },
  principles: {
    kicker: 'Princípios',
    title: 'Quatro decisões que explicam o resto.',
    list: [
      { title: 'Explícito > automágico', body: 'Nenhum arquivo é carregado por convenção de nome. Se algo roda, está escrito em algum lugar que você pode abrir.' },
      { title: 'O tipo é a documentação', body: 'Assinaturas carregam a intenção. Um Facet::Valid(NovaFatura) não precisa de comentário explicando o que já passou.' },
      { title: 'Cada peça vive sozinha', body: 'Nenhum projeto depende de outro do QuartzForge para funcionar. Adotar um não obriga a adotar cinco.' },
      { title: 'Erro é dado, não exceção', body: 'Validação, OAuth e persistência devolvem resultados que o case obriga você a tratar.' },
    ],
  },
  proof: {
    kicker: 'Prova, não promessa',
    title: 'Cargas nomeadas, números só depois do CI.',
    body:
      'Não publicamos comparativos até o harness rodar em máquina neutra e o resultado estar reproduzível por qualquer pessoa. Enquanto isso, as linhas abaixo ficam com traço.',
    rows: [
      'API JSON simples, 1 rota, sem banco',
      'Listar 500 registros com duas relações pré-carregadas',
      'Enfileirar e processar 10 mil jobs em Postgres',
      'Build limpo do projeto de exemplo, sem cache',
    ],
    pending: '— aguardando CI',
    noteTitle: 'Por que os campos estão vazios',
    noteBody:
      'Um número sem metodologia é marketing. As linhas acima ficam com traço até o repositório quartzforge/benchmarks publicar os resultados assinados pelo CI, com hardware e versão de compilador declarados.',
  },
  cta: {
    kicker: 'Comece pelo escopo que dói hoje',
    title: 'Adote um projeto. Adote os cinco. A porta é a mesma.',
    body:
      'O guia de início leva cerca de dez minutos e termina com uma API rodando, um schema validando e uma migração aplicada.',
    primary: 'Guia de início',
    secondary: 'Comparar os projetos',
  },
  ecosystem: {
    heroKicker: 'Ecossistema',
    heroTitle: 'Cinco projetos com escopos que não se sobrepõem.',
    heroLede:
      'Cada um resolve um problema inteiro e para por aí. Você escolhe quantos entram no seu shard.yml — e nenhum deles reclama da ausência dos outros.',
    filterLabel: 'Filtrar projetos por escopo',
    chipsAll: 'todos',
    scope: {
      web: 'web',
      dados: 'dados',
      validacao: 'validação',
      filas: 'filas',
      oauth: 'oauth',
    },
    count: '1 projeto | {count} projetos',
    open: 'Abrir',
    role: {
      quartz: 'Framework HTTP',
      obsidian: 'Data mapper tipado',
      pulse: 'Fila de jobs',
      facet: 'Validação isolada',
      vault: 'Cliente OAuth',
    },
    matrixTitle: 'Matriz de compatibilidade',
    matrixLead: 'O que cada projeto exige — e nada além disso.',
    matrixNote:
      'As dependências abaixo são o que cada projeto assume do seu ambiente. Nenhum projeto depende de outro do QuartzForge.',
    matrixCaption: 'Dependências e compatibilidade dos projetos do QuartzForge',
    columnProject: 'Projeto',
    columnStatus: 'Status',
    columnCrystal: 'Crystal',
    columnLicense: 'Licença',
    columnDeps: 'Dependências',
    deps: {
      stdlib: 'nada além da stdlib',
      postgres: 'PostgreSQL 14+',
      http: 'cliente HTTP da stdlib',
    },
    noteTitle: 'Em desenvolvimento',
    noteBody:
      'obsidian, pulse e vault não lançaram v1 — a API é desenhada a partir das specs aprovadas, mas pode mudar. Esta página não documenta APIs: documenta visão e roadmap.',
  },
  docs: {
    quickStart: 'Início rápido',
    subtitle: 'Do zero a uma API rodando — os exemplos abaixo vêm dos exemplos enviados com quartz 0.1.1 e facet 0.1.0 e do README.',
    searchPlaceholder: 'Buscar…',
    searchLabel: 'Buscar na documentação',
    searchEmpty: 'Nenhuma página para “{query}”.',
    navLabel: 'Documentação',
    sidebarToggle: 'Sumário da documentação',
    groupGettingStarted: 'Começando',
    groupGuides: 'Guias',
    groupReference: 'Referência',
    onThisPage: 'Nesta página',
    crumb: 'Documentação',
    pagerLabel: 'Navegação entre páginas',
    pager: {
      prev: 'Ver o ecossistema',
      next: 'Conhecer o quartz',
    },
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
