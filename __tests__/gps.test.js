/** Especifica a classificacao visual da precisao de localizacao em metros. */

import { classificarPrecisaoGps } from '../src/utils/gps';

describe('classificarPrecisaoGps', () => {
  it('classifica precisao abaixo de 10 metros como alta', () => {
    expect(classificarPrecisaoGps(9.9)).toEqual({ cor: 'verde', nivel: 'alta' });
  });

  it('classifica precisao de 10 a 30 metros como media', () => {
    expect(classificarPrecisaoGps(10)).toEqual({ cor: 'amarelo', nivel: 'media' });
    expect(classificarPrecisaoGps(30)).toEqual({ cor: 'amarelo', nivel: 'media' });
  });

  it('classifica precisao acima de 30 metros ou indisponivel como baixa', () => {
    expect(classificarPrecisaoGps(30.1)).toEqual({ cor: 'vermelho', nivel: 'baixa' });
    expect(classificarPrecisaoGps(null)).toEqual({ cor: 'vermelho', nivel: 'baixa' });
  });
});
