/* Módulo de despesas: cadastro, edição, exclusão, filtros */
(function () {
  const U = RS;
  const f = document.getElementById('form-despesa');
  let editandoId = null;

  RS.despesas = U.load(U.KEYS.despesas);
  const persistir = () => U.save(U.KEYS.despesas, RS.despesas);

  function limpar() {
    editandoId = null;
    f.reset();
    f.data.value = U.hoje();
    f.querySelector('[type=submit]').textContent = 'Cadastrar despesa';
    document.getElementById('cancelar-edicao').hidden = true;
    document.getElementById('titulo-form-despesa').textContent = 'Nova despesa';
    f.querySelectorAll('.erro').forEach((e) => (e.textContent = ''));
  }

  f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const erros = {};
    const descricao = f.descricao.value.trim();
    const valor = U.parseValor(f.valor.value);
    if (descricao.length < 2) erros.descricao = 'Informe a descrição (mínimo 2 caracteres).';
    if (!f.categoria.value) erros.categoria = 'Escolha uma categoria.';
    if (!(valor > 0)) erros.valor = 'Informe um valor maior que zero, como 150,00.';
    if (!f.data.value) erros.data = 'Informe a data.';
    ['descricao', 'categoria', 'valor', 'data'].forEach((c) => {
      f.querySelector('[data-erro=' + c + ']').textContent = erros[c] || '';
    });
    if (Object.keys(erros).length) return RS.aviso('Corrija os campos destacados.', 'erro');

    const dados = { descricao, categoria: f.categoria.value, valor: Math.round(valor * 100) / 100,
      data: f.data.value, obs: f.obs.value.trim() };
    if (editandoId) {
      const i = RS.despesas.findIndex((d) => d.id === editandoId);
      RS.despesas[i] = Object.assign({}, RS.despesas[i], dados);
      RS.aviso('Despesa atualizada.');
    } else {
      RS.despesas.push(Object.assign({ id: U.uid() }, dados));
      RS.aviso('Despesa cadastrada.');
    }
    persistir(); limpar(); RS.atualizar();
  });

  document.getElementById('cancelar-edicao').addEventListener('click', limpar);
  ['filtro-categoria', 'busca-despesa'].forEach((id) =>
    document.getElementById(id).addEventListener('input', renderLista));

  document.getElementById('lista-despesas').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-acao]');
    if (!b) return;
    const d = RS.despesas.find((x) => x.id === b.dataset.id);
    if (!d) return;
    if (b.dataset.acao === 'editar') {
      editandoId = d.id;
      f.descricao.value = d.descricao; f.categoria.value = d.categoria;
      f.valor.value = String(d.valor).replace('.', ','); f.data.value = d.data; f.obs.value = d.obs || '';
      f.querySelector('[type=submit]').textContent = 'Salvar alterações';
      document.getElementById('cancelar-edicao').hidden = false;
      document.getElementById('titulo-form-despesa').textContent = 'Editar despesa';
      f.scrollIntoView({ behavior: 'smooth', block: 'start' }); f.descricao.focus();
    } else if (confirm('Excluir a despesa "' + d.descricao + '"? Esta ação não pode ser desfeita.')) {
      RS.despesas = RS.despesas.filter((x) => x.id !== d.id);
      if (editandoId === d.id) limpar();
      persistir(); RS.atualizar(); RS.aviso('Despesa excluída.');
    }
  });

  function renderLista() {
    const filtradas = U.filtrarDespesas(RS.despesas, {
      categoria: document.getElementById('filtro-categoria').value,
      busca: document.getElementById('busca-despesa').value });
    filtradas.sort((a, b) => b.data.localeCompare(a.data));
    const ul = document.getElementById('lista-despesas');
    ul.innerHTML = filtradas.length ? filtradas.map((d) => `
      <li class="item">
        <div class="item-info">
          <strong>${U.esc(d.descricao)}</strong>${d.demo ? ' <span class="selo">Exemplo</span>' : ''}
          <small>${U.esc(d.categoria)} • ${U.dataBR(d.data)}${d.obs ? ' • ' + U.esc(d.obs) : ''}</small>
        </div>
        <span class="item-valor">${U.brl(d.valor)}</span>
        <div class="item-acoes">
          <button class="btn-link" data-acao="editar" data-id="${d.id}">Editar</button>
          <button class="btn-link perigo" data-acao="excluir" data-id="${d.id}">Excluir</button>
        </div>
      </li>`).join('') : '<li class="vazio">Nenhuma despesa encontrada. Cadastre uma no formulário ao lado.</li>';
    document.getElementById('total-filtrado').textContent =
      U.brl(U.totalDespesas(filtradas)) + ' em ' + filtradas.length + (filtradas.length === 1 ? ' despesa' : ' despesas');
  }

  RS.renderDespesas = renderLista;
  RS.persistirDespesas = persistir;
  limpar();
})();
