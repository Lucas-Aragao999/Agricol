/** Especifica o calculo da intensidade vetorial do acelerometro em g-force. */

import { calcularAceleracaoVetorial } from '../src/utils/aceleracao';

describe('calcularAceleracaoVetorial', () => {
  it('calcula o modulo do vetor de aceleracao', () => {
    expect(calcularAceleracaoVetorial({ x: 1, y: 2, z: 2 })).toBe(3);
  });

  it('retorna zero para um vetor nulo', () => {
    expect(calcularAceleracaoVetorial({ x: 0, y: 0, z: 0 })).toBe(0);
  });
});
