// Executar com: node --test tests/utils.test.js
const test = require('node:test');
const assert = require('node:assert');
const U = require('../js/utils.js');

test('parseValor aceita formatos brasileiros e simples', () => {
  assert.strictEqual(U.parseValor('150'), 150);
  assert.strictEqual(U.parseValor('150,50'), 150.5);
  assert.strictEqual(U.parseValor('1.500,00'), 1500);
  assert.strictEqual(U.parseValor('R$ 20,00'), 20);
  assert.ok(Number.isNaN(U.parseValor('abc')));
  assert.ok(Number.isNaN(U.parseValor('')));
});

test('brl formata em reais', () => {
  assert.match(U.brl(150), /R\$\s150,00/);
});

test('totalDespesas soma sem erro de ponto flutuante', () => {
  assert.strictEqual(U.totalDespesas([{ valor: 0.1 }, { valor: 0.2 }]), 0.3);
});

test('filtrarDespesas por categoria e busca', () => {
  const l = [{ descricao: 'Gás', categoria: 'Energia e água' }, { descricao: 'Alface', categoria: 'Ingredientes' }];
  assert.strictEqual(U.filtrarDespesas(l, { categoria: 'Ingredientes' }).length, 1);
  assert.strictEqual(U.filtrarDespesas(l, { busca: 'gás' }).length, 1);
  assert.strictEqual(U.filtrarDespesas(l, {}).length, 2);
});

test('totalPorUnidade não mistura unidades', () => {
  const r = U.totalPorUnidade([{ unidade: 'kg', quantidade: 2.5 }, { unidade: 'kg', quantidade: 1 }, { unidade: 'L', quantidade: 3 }]);
  assert.deepStrictEqual(r, { kg: 3.5, L: 3 });
});

test('categoriaMaisCara', () => {
  const r = U.categoriaMaisCara([{ categoria: 'A', valor: 10 }, { categoria: 'B', valor: 30 }, { categoria: 'A', valor: 5 }]);
  assert.deepStrictEqual(r, { categoria: 'B', total: 30 });
  assert.strictEqual(U.categoriaMaisCara([]), null);
});

test('esc neutraliza HTML', () => {
  assert.strictEqual(U.esc('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;');
});
