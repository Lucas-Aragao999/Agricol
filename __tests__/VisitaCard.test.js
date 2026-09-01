/** Especifica os dados resumidos apresentados para cada visita salva. */

import React from 'react';
import TestRenderer from 'react-test-renderer';
import { VisitaCard } from '../src/components/VisitaCard';

jest.mock('react-native', () => ({
  Pressable: 'Pressable',
  StyleSheet: { create: (estilos) => estilos },
  Text: 'Text',
  View: 'View',
}));

/**
 * Extrai os textos do card para validar os dados visiveis ao usuario.
 * Existe para testar o resumo sem depender da estrutura visual do React Native.
 * Percorre os nos Text renderizados e junta seus filhos em uma lista de mensagens.
 */
function obterTextos(arvore) {
  return arvore.root.findAllByType('Text').map((no) => no.children.join(''));
}

describe('VisitaCard', () => {
  it('mostra fazenda, cultura e data da visita', () => {
    const arvore = TestRenderer.create(
      <VisitaCard
        visita={{ cultura: 'Soja', data: '2026-09-01', fazenda: 'Fazenda Horizonte' }}
        onPress={jest.fn()}
      />,
    );

    expect(obterTextos(arvore)).toEqual(expect.arrayContaining(['Fazenda Horizonte', 'Soja', '01/09/2026']));
  });
});
