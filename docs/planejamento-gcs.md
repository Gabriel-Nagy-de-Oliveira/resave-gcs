# Planejamento de configuração

## Itens de configuração
Código-fonte (`js/`), interface (`index.html`, `css/`), documentação (`README.md`, `docs/`), testes (`tests/`), `.gitignore` e histórico de versões (commits e tags).

Não são versionados: dependências instaladas, credenciais, caches, logs e arquivos pessoais (ver `.gitignore`).

## Nomeação
Arquivos e pastas em minúsculas, com palavras separadas por hífen. Branches e commits seguem `politica-branching.md` e o padrão Conventional Commits do README.

## Backup e recuperação
O GitHub é o repositório remoto. Cada integrante mantém uma cópia local. Versões estáveis são marcadas com tags e podem ser recuperadas com `git checkout v1.0.0`. O repositório não substitui o cuidado de nunca versionar credenciais.

## Decisões de configuração
| Decisão | Motivo |
|---|---|
| HTML/CSS/JS puros | Sem instalação, fácil de entender e alterar na apresentação |
| `localStorage` | Sem banco de dados nem serviços externos |
| `utils.js` separado | Permite testes automatizados sem navegador |
