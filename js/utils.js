/* Funções utilitárias do ReSave (também testáveis no Node) */
(function (root) {
  const KEYS = { despesas: 'resave:despesas', desperdicio: 'resave:desperdicio' };

  function brl(v) {
    return Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  // Aceita "150", "150.50", "150,50" e "1.500,00"
  function parseValor(s) {
    if (typeof s === 'number') return s;
    let t = String(s).trim().replace(/R\$\s?/, '');
    if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
    const n = Number(t);
    return t !== '' && isFinite(n) ? n : NaN;
  }
  function esc(s) {
    const m = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(s).replace(/[&<>"']/g, (c) => m[c]);
  }
  function dataBR(iso) {
    const [y, m, d] = iso.split('-');
    return d + '/' + m + '/' + y;
  }
  function hoje() {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function load(k) {
    try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; }
  }
  function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  function totalDespesas(lista) {
    return Math.round(lista.reduce((s, d) => s + d.valor, 0) * 100) / 100;
  }
  function filtrarDespesas(lista, f) {
    const categoria = (f && f.categoria) || '';
    const busca = ((f && f.busca) || '').trim().toLowerCase();
    return lista.filter((d) =>
      (!categoria || d.categoria === categoria) &&
      (!busca || d.descricao.toLowerCase().includes(busca)));
  }
  // Soma separada por unidade: kg nunca é somado com unidades, litros etc.
  function totalPorUnidade(lista) {
    const r = {};
    lista.forEach((i) => { r[i.unidade] = Math.round(((r[i.unidade] || 0) + i.quantidade) * 1000) / 1000; });
    return r;
  }
  function categoriaMaisCara(lista) {
    const t = {};
    lista.forEach((d) => { t[d.categoria] = (t[d.categoria] || 0) + d.valor; });
    const e = Object.entries(t).sort((a, b) => b[1] - a[1])[0];
    return e ? { categoria: e[0], total: Math.round(e[1] * 100) / 100 } : null;
  }

  const api = { KEYS, brl, parseValor, esc, dataBR, hoje, uid, load, save,
    totalDespesas, filtrarDespesas, totalPorUnidade, categoriaMaisCara };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RS = Object.assign(root.RS || {}, api);
})(typeof window !== 'undefined' ? window : globalThis);
