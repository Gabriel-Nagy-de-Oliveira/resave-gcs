# Roteiro de testes e de demonstração

> Este roteiro é um **guia**. Nada aqui foi executado por quem escreveu o projeto: os resultados reais só existem depois que vocês rodarem os passos e tirarem os prints.

## Parte 1 — Testes

### 1.1 Automatizados (recomendado; exige Node.js)
```bash
node --test tests/utils.test.js
```
Cobrem: conversão de valores, formatação em reais, soma de despesas, filtros, totais por unidade e proteção contra HTML.

### 1.2 Manuais (abrir `index.html`)
| # | Ação | Resultado esperado |
|---|---|---|
| 1 | Painel → "Carregar dados de exemplo" | Indicadores preenchidos; itens com selo "Exemplo"; botão vira "Remover dados de exemplo" |
| 2 | Remover dados de exemplo | Painel zerado, só os dados reais permanecem |
| 3 | Despesas → enviar formulário vazio | Mensagens de erro nos campos e aviso vermelho |
| 4 | Cadastrar "Teste", Ingredientes, `150,00` | Aviso verde; item aparece como R$ 150,00; painel atualiza |
| 5 | Editar a despesa, mudar valor para `200` | Botão "Salvar alterações"; lista e painel atualizam |
| 6 | Excluir a despesa | Janela de confirmação; ao confirmar, some e o painel atualiza |
| 7 | Filtrar por categoria e pesquisar por parte da descrição | Lista e "Total exibido" refletem o filtro |
| 8 | Desperdício → registrar 2,5 kg e 3 L | Totais separados: `2,5 kg` e `3 L` |
| 9 | Atualizar a página (F5) e navegar entre seções | Dados continuam |
| 10 | Reduzir a largura da janela (≈ 400 px) | Layout em coluna única, sem rolagem horizontal |

## Parte 2 — Demonstração de Git e GitHub

### 2.1 Preparação (Gabriel)
1. Crie o repositório `resave-gcs` no GitHub (sem README, para evitar conflito inicial).
2. Convide o Rafael em *Settings → Collaborators*.
3. No terminal, dentro da pasta do projeto:
```bash
git init -b main
git add .
git commit -m "chore: configurar projeto inicial do ReSave"
git remote add origin https://github.com/SEU-USUARIO/resave-gcs.git
git push -u origin main
```
4. Rafael clona: `git clone https://github.com/SEU-USUARIO/resave-gcs.git`

### 2.2 Branches e commits
Cada um cria sua branch a partir da `main`:
```bash
git switch main && git pull
git switch -c feature/nome-da-funcionalidade
# editar arquivos
git add .
git commit -m "feat: descrever a mudança"
git push -u origin feature/nome-da-funcionalidade
```
Sugestões de funcionalidades pequenas e independentes:
- Gabriel: `feature/filtro-por-periodo` (filtrar despesas por mês).
- Rafael: `feature/exportar-csv` (botão para baixar as despesas em CSV).

### 2.3 Pull Request e revisão
1. No GitHub, aparece o botão **Compare & pull request**. Preencha título (no padrão de commits) e descrição.
2. Peça revisão do outro integrante.
3. O revisor abre *Files changed*, comenta (se quiser) e escolhe *Approve*.
4. Clique em **Merge pull request**.
5. Atualize a `main` local: `git switch main && git pull`.

### 2.4 Conflito intencional (controlado)
O `README.md` tem a linha:
```
**Status do projeto:** versão inicial pronta para versionamento.
```
**Passo 1 — duas branches da mesma versão**
```bash
git switch main && git pull
git switch -c docs/status-gabriel     # Gabriel
git switch main
git switch -c docs/status-rafael      # Rafael (na máquina dele, a partir da mesma main)
```
**Passo 2 — alterar a mesma linha**
- Gabriel: troque por `**Status do projeto:** em desenvolvimento, cadastro de despesas concluído.`
- Rafael: troque por `**Status do projeto:** em revisão, módulo de desperdício validado.`

Cada um faz `git add README.md`, `git commit -m "docs: atualizar status do projeto"` e `git push -u origin <sua-branch>`.

**Passo 3 — integrar**
1. Faça o merge do PR do Gabriel na `main` (sem conflito).
2. No PR do Rafael, o GitHub mostrará **"This branch has conflicts that must be resolved"**.

**Passo 4 — identificar o conflito**
Localmente (Rafael):
```bash
git switch docs/status-rafael
git fetch origin
git merge origin/main
```
O Git informa `CONFLICT (content): Merge conflict in README.md`. Confirme com `git status` (arquivo em *both modified*). O arquivo fica assim:
```
<<<<<<< HEAD
**Status do projeto:** em revisão, módulo de desperdício validado.
=======
**Status do projeto:** em desenvolvimento, cadastro de despesas concluído.
>>>>>>> origin/main
```
**Passo 5 — resolver preservando as duas informações**
Apague os marcadores `<<<<<<<`, `=======` e `>>>>>>>` e deixe uma linha única:
```
**Status do projeto:** em desenvolvimento; cadastro de despesas concluído e módulo de desperdício validado.
```
**Passo 6 — concluir o merge**
```bash
git add README.md
git commit -m "docs: resolver conflito no status do projeto"
git push
```
O Pull Request passa a permitir o merge; clique em **Merge pull request**.

**Passo 7 — verificar**
```bash
git switch main && git pull
git log --oneline --graph --all
```
Confirme que o `README.md` tem a linha unificada e que não restou nenhum marcador (`grep -n "<<<<<<<" README.md` não deve retornar nada). Tire os prints do PR com conflito, do arquivo marcado e do histórico final.

### 2.5 Tags
Só depois que a versão estiver integrada na `main` e testada:
```bash
git switch main && git pull
git tag -a v1.0.0 -m "Versão 1.0.0: cadastro de despesas e desperdício"
git push origin v1.0.0
```
Repita com `v2.0.0` quando a segunda versão estiver pronta, descrevendo as mudanças na mensagem. Observação de versionamento semântico: MAJOR indica mudança incompatível; para justificar a `v2.0.0`, o grupo pode declarar no PR/release qual mudança incompatível ou marco maior ela representa (por exemplo, alteração no formato dos dados salvos).

### 2.6 Consultar o histórico
```bash
git log --oneline
git log --oneline --graph --all --decorate
git tag
git show v1.0.0
git branch -a
```
