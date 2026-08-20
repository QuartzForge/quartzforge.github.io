export default {
  nav: {
    overview: 'Visão geral',
    documentation: 'Documentação',
    quartz: 'quartz (HTTP)',
    facet: 'facet (validação)',
    vault: 'vault (OAuth)',
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
    notYet: 'em desenvolvimento: a API ainda não foi lançada e pode mudar',
    pagerLabel: 'Outros projetos',
    pager: {
      prev: 'Início',
      next: 'Ler a documentação',
    },
    notFound: 'Projeto não encontrado',
  },
  home: {
    heroKicker: 'Framework completo · Crystal ~> 1.21',
    heroLead: 'Uma stack inteira, numa linguagem',
    markWord: 'compilada',
    heroBody:
      'QuartzForge reúne três projetos oficiais: quartz (HTTP), facet (validação) e vault (OAuth). Nenhum deles exige os outros. O compilador enxerga a aplicação de ponta a ponta.',
    ctaDocs: 'Ler a documentação',
    projectsKicker: 'Três projetos, zero garimpo',
    projectsTitle: 'Cada peça resolve um escopo. Nenhuma obriga a próxima.',
    projectsBody:
      'Você pode subir uma API só com quartz, usar facet dentro de um projeto Lucky, ou deixar o vault cuidar do login. O ganho de usar tudo junto é o compilador enxergar a aplicação inteira.',
    role: {
      quartz: 'HTTP',
      vault: 'OAuth',
      facet: 'Validação',
    },
  },
  arch: {
    kicker: 'Como as peças se encaixam',
    title: 'Acoplamento por contrato, não por herança.',
    body:
      'Os projetos se conhecem por interfaces pequenas. quartz recebe a requisição, facet valida o payload e devolve um tipo, vault responde pela identidade do usuário. Trocar uma peça não derruba as outras.',
    diag: {
      lead: 'recebe a requisição, roteia, responde',
      facet: 'valida e devolve tipo',
      vault: 'identidade do usuário',
      pg: 'dados e sessões em um lugar',
    },
    arrows: ['body cru', 'valor tipado'],
    points: [
      { title: 'Um binário para tudo', body: 'API e testes saem do mesmo build. O deploy é copiar um arquivo.' },
      { title: 'Dependências mínimas', body: 'quartz e facet não exigem nada além da stdlib; vault adiciona só o cliente OAuth.' },
      { title: 'Sem descoberta em runtime', body: 'Rotas são resolvidas na compilação. Não há varredura de diretórios no boot.' },
      { title: 'Macros só onde valem a pena', body: 'Metaprogramação fica onde o compilador coleta. O resto é Crystal comum, que o LSP entende.' },
    ],
  },
  principles: {
    kicker: 'Princípios',
    title: 'Quatro decisões que explicam o resto.',
    list: [
      { title: 'Explícito > automágico', body: 'Nenhum arquivo é carregado por convenção de nome. Se algo roda, está escrito em algum lugar que você pode abrir.' },
      { title: 'O tipo é a documentação', body: 'Assinaturas carregam a intenção. Um Facet::Valid(NovaFatura) não precisa de comentário explicando o que já passou.' },
      { title: 'Cada peça vive sozinha', body: 'Nenhum projeto depende de outro do QuartzForge para funcionar. Adotar um não obriga a adotar os outros.' },
      { title: 'Erro é dado, não exceção', body: 'Validação, OAuth e persistência devolvem resultados que o case obriga você a tratar.' },
    ],
  },
  proof: {
    kicker: 'Prova, não promessa',
    title: 'Cargas nomeadas, números só depois do CI.',
    body:
      'Não publicamos comparativos até o harness rodar em máquina neutra e o resultado estar reproduzível por qualquer pessoa. Enquanto isso, as linhas abaixo aguardam o CI.',
    rows: [
      'API JSON simples, 1 rota, sem banco',
      'Validar 10 mil payloads de cadastro',
      'Fluxo de login OAuth com PKCE',
      'Build limpo do projeto de exemplo, sem cache',
    ],
    pending: 'aguardando o CI',
    noteTitle: 'Por que os campos estão vazios',
    noteBody:
      'Um número sem metodologia é marketing. As linhas acima aguardam um harness neutro publicar resultados assinados pelo CI, com hardware e versão de compilador declarados, reproduzíveis por qualquer pessoa.',
  },
  cta: {
    kicker: 'Comece pelo escopo que dói hoje',
    title: 'Adote um projeto. Adote os três. A porta é a mesma.',
    body: 'O guia de início leva cerca de dez minutos e termina com uma API rodando e um schema validando.',
    primary: 'Guia de início',
  },
  ecosystem: {
    role: {
      quartz: 'Framework HTTP',
      facet: 'Validação isolada',
      vault: 'Cliente OAuth',
    },
  },
  docs: {
    quickStart: 'Início rápido',
    subtitle: 'Do zero a uma API rodando: os exemplos abaixo vêm do README e dos exemplos que acompanham quartz 0.1.1 e facet 0.1.0.',
    searchPlaceholder: 'Buscar…',
    searchLabel: 'Buscar na documentação',
    searchEmpty: 'Nenhuma página para “{query}”.',
    navLabel: 'Documentação',
    sidebarToggle: 'Sumário da documentação',
    groupGettingStarted: 'Começando',
    groupGuides: 'Guias',
    onThisPage: 'Nesta página',
    crumb: 'Documentação',
    pagerLabel: 'Navegação entre páginas',
    pager: {
      prev: 'Início',
      next: 'Conhecer o quartz',
    },
    installation: 'Instalação',
    installationBody:
      'Adicione os shards ao shard.yml. Cada peça é independente. Instale só o que usar.',
    payload: 'Defina o payload',
    payloadBody:
      'Um payload é um record comum com regras declaradas ao lado do campo. A macro do Facet coleta as annotations em compile-time e gera a validação.',
    controller: 'O controller',
    controllerBody:
      'Controllers são classes comuns, sem classe-base. A annotation registra a rota; o tipo do argumento body é desserializado e entregue já validado pelo seu código.',
    validation: 'Validando a entrada',
    validationBody:
      'Facet.validate devolve um ValidationResult, sem exceção. O contrato com o Quartz é direto: FieldError do Facet vira FieldError do Quartz, e o BindError vira 400 problem+json.',
    run: 'Rodando',
    runBody: 'Quartz.configure define a porta e o título do OpenAPI; Quartz.run sobe o servidor.',
    test: 'Testando',
    testBody:
      'As specs de cada repo são a referência real de teste hoje: rodar crystal spec dentro do projeto. O client in-memory é interno na 0.1.x.',
    errors: 'Formato de erro',
    errorsBody:
      'Todo erro é application/problem+json (RFC 9457). O campo type é o identificador estável para tratamento programático. Estes são os nove valores emitidos pelo Quartz:',
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
    docs: {
      quickStart: 'Início rápido',
      installation: 'Instalação',
      controller: 'O controller',
      errors: 'Formato de erro',
    },
    madeIn: 'Feito em Crystal',
  },
}
