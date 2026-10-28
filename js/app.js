/* Navegação, painel, avisos e dados de exemplo */
(function () {
  const U = RS;
  const $ = (id) => document.getElementById(id);
  const VIEWS = ['painel', 'despesas', 'desperdicio'];

  RS.aviso = function (msg, tipo) {
    const t = $('toast');
    t.textContent = msg;
    t.className = 'toast ' + (tipo === 'erro' ? 'erro' : 'ok') + ' visivel';
    clearTimeout(RS._t);
    RS._t = setTimeout(() => t.classList.remove('visivel'), 3000);
  };

  function mostrar(view) {
    if (!VIEWS.includes(view)) view = 'painel';
    VIEWS.forEach((v) => { $('view-' + v).hidden = v !== view; });
    document.querySelectorAll('.nav button').forEach((b) =>
      b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'));
  }
  document.querySelectorAll('[data-view]').forEach((b) =>
    b.addEventListener('click', () => { location.hash = b.dataset.view; }));
  window.addEventListener('hashchange', () => mostrar(location.hash.slice(1)));

  function painel() {
    const d = RS.despesas, mes = U.hoje().slice(0, 7);
    const doMes = d.filter((x) => x.data.startsWith(mes));
    $('ind-qtd').textContent = d.length;
    $('ind-total').textContent = U.brl(U.totalDespesas(d));
    $('ind-mes').textContent = U.brl(U.totalDespesas(doMes));
    $('ind-media').textContent = U.brl(d.length ? U.totalDespesas(d) / d.length : 0);
    const c = U.categoriaMaisCara(d);
    $('ind-categoria').textContent = c ? c.categoria + ' (' + U.brl(c.total) + ')' : '—';
    const t = U.totalPorUnidade(RS.desperdicios), us = Object.keys(t);
    $('ind-desperdicio').innerHTML = us.length
      ? us.map((u) => `<span class="chip">${t[u].toLocaleString('pt-BR', { maximumFractionDigits: 3 })} ${U.esc(u)}</span>`).join('')
      : '<span class="muted">Sem registros</span>';
    const rec = d.slice().sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
    $('recentes').innerHTML = rec.length ? rec.map((x) => `
      <li class="item"><div class="item-info"><strong>${U.esc(x.descricao)}</strong>${x.demo ? ' <span class="selo">Exemplo</span>' : ''}
      <small>${U.esc(x.categoria)} • ${U.dataBR(x.data)}</small></div><span class="item-valor">${U.brl(x.valor)}</span></li>`).join('')
      : '<li class="vazio">Nenhuma despesa ainda. Cadastre a primeira em “Despesas”.</li>';
    const temDemo = d.some((x) => x.demo) || RS.desperdicios.some((x) => x.demo);
    $('btn-demo').hidden = temDemo; $('btn-limpar-demo').hidden = !temDemo;
  }

  RS.atualizar = function () { painel(); RS.renderDespesas(); RS.renderDesperdicio(); };

  $('btn-demo').addEventListener('click', () => {
    const h = U.hoje(), dia = (n) => { const x = new Date(h + 'T12:00:00'); x.setDate(x.getDate() - n); return x.toISOString().slice(0, 10); };
    [['Compra de hortifruti', 'Ingredientes', 480.9, 1], ['Gás de cozinha', 'Energia e água', 135, 3],
     ['Detergente e panos', 'Limpeza', 62.5, 5], ['Carnes e frios', 'Ingredientes', 1250, 7]]
      .forEach(([descricao, categoria, valor, n]) => RS.despesas.push({ id: U.uid(), descricao, categoria, valor, data: dia(n), obs: '', demo: true }));
    [['Alface', 2.5, 'kg', 'Vencimento', 2], ['Arroz cozido', 4, 'kg', 'Sobra de produção', 4], ['Suco de laranja', 3, 'L', 'Preparo em excesso', 6]]
      .forEach(([alimento, quantidade, unidade, motivo, n]) => RS.desperdicios.push({ id: U.uid(), alimento, quantidade, unidade, motivo, data: dia(n), demo: true }));
    RS.persistirDespesas(); RS.persistirDesperdicios(); RS.atualizar();
    RS.aviso('Dados de exemplo carregados.');
  });
  $('btn-limpar-demo').addEventListener('click', () => {
    RS.despesas = RS.despesas.filter((x) => !x.demo);
    RS.desperdicios = RS.desperdicios.filter((x) => !x.demo);
    RS.persistirDespesas(); RS.persistirDesperdicios(); RS.atualizar();
    RS.aviso('Dados de exemplo removidos.');
  });

  mostrar(location.hash.slice(1));
  RS.atualizar();
})();
