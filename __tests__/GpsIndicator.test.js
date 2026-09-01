/** Especifica a apresentacao visual da qualidade de precisao do GPS. */

import React from 'react';
import TestRenderer from 'react-test-renderer';
import { GpsIndicator } from '../src/components/GpsIndicator';

jest.mock('react-native', () => ({
  StyleSheet: { create: (estilos) => estilos },
  Text: 'Text',
  View: 'View',
}));

/**
 * Extrai os textos renderizados para que os testes validem a mensagem apresentada ao usuario.
 * Existe para evitar dependencia da implementacao visual interna do componente.
 * Percorre todos os nos Text e junta seus filhos em uma lista de mensagens simples.
 */
function obterTextos(arvore) {
  return arvore.root.findAllByType('Text').map((no) => no.children.join(''));
}

describe('GpsIndicator', () => {
  it('apresenta precisao alta com a cor verde', () => {
    const arvore = TestRenderer.create(
      <GpsIndicator precisao={8.4} qualidade={{ cor: 'verde', nivel: 'alta' }} />,
    );

    expect(obterTextos(arvore)).toContain('Precisao alta: 8.4 m');
    expect(arvore.root.findByProps({ testID: 'indicador-gps' }).props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#DDF7E7' }),
    );
  });

  it('apresenta precisao media com a cor amarela', () => {
    const arvore = TestRenderer.create(
      <GpsIndicator precisao={18} qualidade={{ cor: 'amarelo', nivel: 'media' }} />,
    );

    expect(obterTextos(arvore)).toContain('Precisao media: 18.0 m');
    expect(arvore.root.findByProps({ testID: 'indicador-gps' }).props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#FFF3CD' }),
    );
  });

  it('apresenta GPS indisponivel com a cor vermelha', () => {
    const arvore = TestRenderer.create(<GpsIndicator precisao={null} qualidade={{ cor: 'vermelho', nivel: 'baixa' }} />);

    expect(obterTextos(arvore)).toContain('Precisao baixa: indisponivel');
    expect(arvore.root.findByProps({ testID: 'indicador-gps' }).props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#FCE2E2' }),
    );
  });
});
