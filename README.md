# ReSave

Sistema web simples de controle de gastos e acompanhamento do desperdício de alimentos em restaurantes.
Projeto da disciplina de **Gerência de Configuração de Software (GCS)**.

**Integrantes:** Gabriel Nagy de Oliveira e Rafael Nascimento de Faria.

**Status do projeto:** versão inicial pronta para versionamento.

## Objetivo

Servir como aplicação funcional e pequena para demonstrar, com Git e GitHub: commits padronizados, branches, Pull Requests, resolução de conflitos e versionamento por tags.

## Funcionalidades

- **Painel:** total gasto, número de despesas, gasto do mês, média por despesa, categoria com maior gasto, desperdício por unidade e despesas recentes.
- **Despesas:** cadastrar, editar, excluir (com confirmação), filtrar por categoria e pesquisar por descrição.
- **Desperdício:** registrar alimento, quantidade, unidade, motivo e data; totais separados por unidade (kg, L etc. nunca são somados entre si).
- **Dados de exemplo:** botão no painel para carregar e remover dados demonstrativos (marcados com o selo "Exemplo").

## Tecnologias

HTML, CSS e JavaScript puros, com armazenamento em `localStorage`. Sem frameworks, banco de dados, APIs ou dependências.

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox).
- Opcional: Node.js 18+ apenas para rodar os testes automatizados.

## Como executar

1. Clone ou extraia o projeto.
2. Abra o arquivo `index.html` no navegador (duplo clique). Não precisa de servidor.

Testes automatizados (opcional): `node --test tests/utils.test.js`

## Estrutura de pastas

```
resave-gcs/
├── index.html
├── README.md
├── .gitignore
├── css/style.css
├── js/
│   ├── utils.js        # funções de cálculo, formatação e armazenamento
│   ├── despesas.js     # módulo de despesas
│   ├── desperdicio.js  # módulo de desperdício
│   └── app.js          # navegação, painel e dados de exemplo
├── tests/utils.test.js
└── docs/
    ├── planejamento-gcs.md
    ├── politica-branching.md
    └── roteiro-de-testes.md
```

## Como contribuir

1. Atualize a `main`: `git switch main && git pull`.
2. Crie uma branch seguindo a política de branching.
3. Faça commits pequenos com mensagens padronizadas.
4. Envie a branch e abra um Pull Request para a `main`.
5. O outro integrante revisa antes do merge.

## Padrão de commits (Conventional Commits)

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat:` | nova funcionalidade | `feat: adicionar cadastro de despesas` |
| `fix:` | correção | `fix: corrigir cálculo dos gastos` |
| `docs:` | documentação | `docs: atualizar documentação` |
| `refactor:` | melhoria interna | `refactor: simplificar filtro de despesas` |
| `test:` | testes | `test: adicionar testes` |
| `chore:` | manutenção e configuração | `chore: configurar projeto` |

## Política de branching

- `main`: versão principal e estável;
- `feature/nome-da-funcionalidade`: novas funcionalidades;
- `fix/nome-do-problema`: correções;
- `docs/nome-da-documentacao`: documentação.

Detalhes em `docs/politica-branching.md`.

## Versionamento

Versionamento semântico `MAJOR.MINOR.PATCH`: MAJOR para mudanças incompatíveis, MINOR para novas funcionalidades compatíveis, PATCH para correções. Tags planejadas para a demonstração: `v1.0.0` e `v2.0.0`, criadas somente quando cada versão estiver realmente pronta.

## Limitações

- Os dados ficam só no navegador e no computador em uso; limpar os dados do navegador apaga tudo.
- Não há login, múltiplos usuários nem sincronização.
- Não há exportação de dados nesta versão.
- A exportação das despesas em CSV está planejada para uma versão futura.
