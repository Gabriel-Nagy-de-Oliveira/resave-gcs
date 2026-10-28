# Política de branching

| Branch | Finalidade |
|---|---|
| `main` | Versão principal e estável. Não recebe commits diretos depois da versão inicial. |
| `feature/nome-da-funcionalidade` | Novas funcionalidades |
| `fix/nome-do-problema` | Correções |
| `docs/nome-da-documentacao` | Alterações de documentação |

## Regras
1. Cada integrante trabalha na própria branch, criada a partir da `main` atualizada.
2. A integração na `main` é feita por Pull Request.
3. O Pull Request é revisado pelo outro integrante antes do merge.
4. Mensagens de commit seguem Conventional Commits.
5. Depois do merge, a branch pode ser removida.

## Versionamento
`MAJOR.MINOR.PATCH`. Tags `v1.0.0` e `v2.0.0` só são criadas depois que a respectiva versão estiver integrada na `main` e testada.
