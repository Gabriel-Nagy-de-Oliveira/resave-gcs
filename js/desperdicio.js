/* Módulo de desperdício de alimentos */
(function () {
  const U = RS;
  const f = document.getElementById('form-desperdicio');

  RS.desperdicios = U.load(U.KEYS.desperdicio);
  const persistir = () => U.save(U.KEYS.desperdicio, RS.desperdicios);
  const fmtQtd = (n) => n.toLocaleString('pt-BR', { maximumFractionDigits: 3 });

  f.data.value = U.hoje();
  f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const erros = {};
    const alimento = f.alimento.value.trim();
    const quantidade = U.parseValor(f.quantidade.value);
    if (alimento.length < 2) erros.alimento = 'Informe o nome do alimento.';
    if (!(quantidade > 0)) erros.quantidade = 'Informe uma quantidade maior que zero.';
    if (!f.unidade.value) erros.unidade = 'Escolha a unidade.';
    if (!f.motivo.value) erros.motivo = 'Escolha o motivo.';
    if (!f.data.value) erros.data = 'Informe a data.';
    ['alimento', 'quantidade', 'unidade', 'motivo', 'data'].forEach((c) => {
      f.querySelector('[data-erro=' + c + ']').textContent = erros[c] || '';
    });
    if (Object.keys(erros).length) return RS.aviso('Corrija os campos destacados.', 'erro');

    RS.desperdicios.push({ id: U.uid(), alimento, quantidade, unidade: f.unidade.value,
      motivo: f.motivo.value, data: f.data.value });
    persistir(); f.reset(); f.data.value = U.hoje();
    RS.atualizar(); RS.aviso('Desperdício registrado.');
  });

  document.getElementById('lista-desperdicio').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-id]');
    if (!b) return;
    const r = RS.desperdicios.find((x) => x.id === b.dataset.id);
    if (r && confirm('Excluir o registro de "' + r.alimento + '"?')) {
      RS.desperdicios = RS.desperdicios.filter((x) => x.id !== r.id);
      persistir(); RS.atualizar(); RS.aviso('Registro excluído.');
    }
  });

  RS.renderDesperdicio = function () {
    const lista = RS.desperdicios.slice().sort((a, b) => b.data.localeCompare(a.data));
    document.getElementById('lista-desperdicio').innerHTML = lista.length ? lista.map((r) => `
      <li class="item">
        <div class="item-info">
          <strong>${U.esc(r.alimento)}</strong>${r.demo ? ' <span class="selo">Exemplo</span>' : ''}
          <small>${U.esc(r.motivo)} • ${U.dataBR(r.data)}</small>
        </div>
        <span class="item-valor">${fmtQtd(r.quantidade)} ${U.esc(r.unidade)}</span>
        <div class="item-acoes"><button class="btn-link perigo" data-id="${r.id}">Excluir</button></div>
      </li>`).join('') : '<li class="vazio">Nenhum desperdício registrado ainda.</li>';
    const t = U.totalPorUnidade(RS.desperdicios);
    const chaves = Object.keys(t);
    document.getElementById('totais-unidade').innerHTML = chaves.length
      ? chaves.map((u) => `<span class="chip">${fmtQtd(t[u])} ${U.esc(u)}</span>`).join('')
      : '<span class="muted">Sem registros.</span>';
  };
  RS.persistirDesperdicios = persistir;
})();
